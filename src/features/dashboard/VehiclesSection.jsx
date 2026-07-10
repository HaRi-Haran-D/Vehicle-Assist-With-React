import React, { useState, useEffect } from 'react';
import { getVehicles, addVehicle } from '../../api/client';
import { Car, Plus, Loader2 } from 'lucide-react';
import { WidgetCard } from '../../components/WidgetCard';

export function VehiclesSection() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  // form state
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

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

  useEffect(() => {
    if (token) fetchVehicles();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const formData = new FormData();
      formData.append('make', make);
      formData.append('model', model);
      formData.append('year', year);
      formData.append('license_plate', licensePlate);
      if (photo) {
        formData.append('photo', photo);
      }

      const newVehicle = await addVehicle(token, formData);
      setVehicles([...vehicles, newVehicle]);
      setIsAdding(false);
      setMake('');
      setModel('');
      setYear('');
      setLicensePlate('');
      setPhoto(null);
    } catch (err) {
      setError(err.message || 'Failed to add vehicle. License plate might already exist.');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-brandYellow" size={32} /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-display font-bold text-textMain">My Vehicles</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 bg-brandYellow text-brandDark px-4 py-2 rounded-lg font-semibold hover:bg-brandYellowHover transition-colors"
        >
          {isAdding ? 'Cancel' : <><Plus size={20} /> Add Vehicle</>}
        </button>
      </div>

      {isAdding && (
        <WidgetCard className="p-6">
          <h3 className="text-xl font-bold text-textMain mb-4">Add a New Vehicle</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-500 bg-red-50 p-3 rounded">{error}</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-textMain mb-1">Brand</label>
                <input required type="text" value={make} onChange={e => setMake(e.target.value)} className="w-full px-3 py-2 border border-borderDark rounded-lg focus:outline-none focus:ring-brandYellow focus:border-brandYellow" placeholder="Eg: Toyota" />
              </div>
              <div>
                <label className="block text-sm font-medium text-textMain mb-1">Model</label>
                <input required type="text" value={model} onChange={e => setModel(e.target.value)} className="w-full px-3 py-2 border border-borderDark rounded-lg focus:outline-none focus:ring-brandYellow focus:border-brandYellow" placeholder="Eg: Cruiser" />
              </div>
              <div>
                <label className="block text-sm font-medium text-textMain mb-1">Year</label>
                <input required type="number" value={year} onChange={e => setYear(e.target.value)} className="w-full px-3 py-2 border border-borderDark rounded-lg focus:outline-none focus:ring-brandYellow focus:border-brandYellow" placeholder="Eg: 2021" />
              </div>
              <div>
                <label className="block text-sm font-medium text-textMain mb-1">License Plate</label>
                <input required type="text" value={licensePlate} onChange={e => setLicensePlate(e.target.value)} className="w-full px-3 py-2 border border-borderDark rounded-lg focus:outline-none focus:ring-brandYellow focus:border-brandYellow" placeholder="Eg: KD 10 F 5678" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-textMain mb-1">Vehicle Photo (Optional)</label>
                <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files[0])} className="w-full px-3 py-2 border border-borderDark rounded-lg focus:outline-none focus:ring-brandYellow focus:border-brandYellow text-sm text-textMain file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brandDark file:text-brandYellow hover:file:bg-black transition-colors" />
              </div>
            </div>
            <div className="flex justify-center">
              <button type="submit" className="bg-brandDark text-brandYellow px-6 py-2.5 rounded-lg font-semibold hover:bg-black transition-colors shadow-lg mt-4">
                Save Vehicle
              </button>
            </div>

          </form>
        </WidgetCard>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vehicles.length === 0 && !isAdding ? (
          <div className="col-span-full text-center py-12 text-textMuted bg-card/30 rounded-2xl border border-borderLight">
            <Car size={48} className="mx-auto mb-4 opacity-50" />
            <p>You haven't added any vehicles yet.</p>
          </div>
        ) : (
          vehicles.map(v => (
            <WidgetCard key={v.id} className="relative overflow-hidden p-0 h-48">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent opacity-50" />
              <div className="p-6 relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-textMain">{v.year} {v.make}</h3>
                    <p className="text-textMain font-medium">{v.model}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-brandDark/10 text-brandDark text-xs font-bold uppercase tracking-wider border border-brandDark/30">
                    {v.license_plate}
                  </span>
                </div>
              </div>
              {v.photo ? (
                <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
                  <img src={v.photo} alt={`${v.make} ${v.model}`} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="absolute -right-4 -bottom-4 w-40 h-40 opacity-20 pointer-events-none">
                  <Car className="w-full h-full text-brandDark" />
                </div>
              )}
            </WidgetCard>
          ))
        )}
      </div>
    </div>
  );
}
