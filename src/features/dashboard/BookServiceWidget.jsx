import React, { useState, useEffect } from 'react';
import { WidgetCard } from '../../components/WidgetCard';
import { getVehicles, addServiceRequest } from '../../api/client';
import { Wrench, Loader2, MapPin } from 'lucide-react';
import { LocationPickerMap } from './LocationPickerMap';

export function BookServiceWidget({ setActiveTab, onServiceRequested }) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [mapPosition, setMapPosition] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [gettingLocation, setGettingLocation] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await getVehicles(token);
        setVehicles(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchVehicles();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!selectedVehicle) {
      setError('Please select a vehicle or add one first.');
      return;
    }
    if (!location) {
      setError('Please pick a location using the map or button.');
      return;
    }
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('vehicle', selectedVehicle);
      formData.append('description', description);
      formData.append('location', location);
      if (mapPosition) {
        formData.append('latitude', mapPosition.lat);
        formData.append('longitude', mapPosition.lng);
      }
      if (photo) {
        formData.append('photo', photo);
      }

      await addServiceRequest(token, formData);
      setMessage('Service request submitted successfully!');
      setDescription('');
      setLocation('');
      setMapPosition(null);
      setPhoto(null);
      if (onServiceRequested) {
        await onServiceRequested();
      }
    } catch (err) {
      setError('Failed to submit request.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    setGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const latlng = { lat: latitude, lng: longitude };
        setMapPosition(latlng);
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          if (res.ok) {
            const data = await res.json();
            setLocation(data.display_name || `${latitude}, ${longitude}`);
          } else {
            setLocation(`${latitude}, ${longitude}`);
          }
        } catch (err) {
          setLocation(`${latitude}, ${longitude}`);
        } finally {
          setGettingLocation(false);
        }
      },
      (err) => {
        setGettingLocation(false);
        setError('Failed to detect location: ' + err.message);
      }
    );
  };

  const handleMapPositionChanged = async (latlng) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`);
      if (res.ok) {
        const data = await res.json();
        setLocation(data.display_name || `${latlng.lat}, ${latlng.lng}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <WidgetCard className="h-full flex justify-center items-center p-6">
        <Loader2 className="animate-spin text-brandYellow" size={32} />
      </WidgetCard>
    );
  }

  return (
    <WidgetCard className="p-6 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-brandYellow/20 rounded-lg text-brandDark">
            <Wrench size={24} />
          </div>
          <h2 className="text-2xl font-display font-bold text-textMain">Request a Mechanic</h2>
        </div>
        <p className="text-textMuted mb-6 text-sm">Describe your vehicle's issue and we'll dispatch a mechanic to your location.</p>

        {vehicles.length === 0 ? (
          <div className="bg-brandDark/5 border border-borderLight rounded-lg p-6 text-center flex flex-col items-center justify-center">
            <p className="text-textMuted mb-4">You need to add a vehicle before booking a mechanic.</p>
            <button
              onClick={() => setActiveTab('vehicles')}
              className="bg-brandYellow text-brandDark px-4 py-2 rounded-lg font-semibold hover:bg-brandYellowHover transition-colors"
            >
              Add a Vehicle Now
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-500 bg-red-50 p-3 rounded text-sm">{error}</div>}
            {message && <div className="text-success bg-success/10 p-3 rounded text-sm">{message}</div>}

            <div>
              <select
                value={selectedVehicle}
                onChange={e => setSelectedVehicle(e.target.value)}
                className="w-full px-3 py-2 border border-borderDark rounded-lg focus:outline-none focus:ring-brandYellow focus:border-brandYellow bg-white text-textMain text-sm"
              >
                <option value="">Select Vehicle</option>
                {vehicles.map(v => (
                  <option key={v.id} value={v.id}>{v.make} {v.model} ({v.license_plate})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-textMain mb-1">Describe the Issue</label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-borderDark rounded-lg focus:outline-none focus:ring-brandYellow focus:border-brandYellow resize-none text-sm"
                placeholder="E.g. Engine makes a rattling noise, need an oil change..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-textMain mb-1">Your Location</label>
              <div className="flex justify-center gap-2 mb-2">
                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={gettingLocation}
                  className="w-100 flex items-center justify-center gap-2 bg-brandDark/5 hover:bg-brandDark/10 text-brandDark px-4 py-2 rounded-lg font-medium transition-colors border border-borderDark"
                >
                  {gettingLocation ? <Loader2 className="animate-spin text-brandYellow" size={18} /> : <MapPin size={18} />}
                  {gettingLocation ? 'Detecting Location...' : 'Pick Current Location'}
                </button>
              </div>
              <LocationPickerMap
                position={mapPosition}
                setPosition={setMapPosition}
                onPositionChanged={handleMapPositionChanged}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-textMain mb-1">Upload Picture (Optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={e => setPhoto(e.target.files[0])}
                className="w-100 px-3 py-2 border border-borderDark rounded-lg focus:outline-none focus:ring-brandYellow focus:border-brandYellow text-sm text-textMain file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brandDark file:text-brandYellow hover:file:bg-black transition-colors"
              />
            </div>

            <div className='flex justify-center'>
              <button
                type="submit"
                disabled={submitting}
                className="w-100 bg-brandDark text-brandYellow px-6 py-2.5 rounded-lg font-semibold hover:bg-black transition-colors shadow-lg disabled:opacity-50 flex justify-center items-center mt-2"
              >
                {submitting ? <Loader2 className="animate-spin" size={20} /> : 'Submit Request'}
              </button>
            </div>
          </form>
        )}
      </div>
    </WidgetCard>
  );
}
