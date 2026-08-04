import React, { useState } from 'react';
import { EarningsWidget } from './EarningsWidget';
import { IncomingJobsWidget } from './IncomingJobsWidget';
import { ActiveServiceTimeline } from './ActiveServiceTimeline';
import { LocationPickerMap } from './LocationPickerMap';
import { Power, MapPin, CheckCircle, Loader2 } from 'lucide-react';
import { MechanicActiveJobWidget } from './MechanicActiveJobWidget';
import { ServiceHistorySection } from './ServiceHistorySection';

export function MechanicDashboard({ activeTab, setActiveTab }) {
  const [isOnline, setIsOnline] = useState(false);
  const [mechanicLocation, setMechanicLocation] = useState(null);
  const [isLocationConfirmed, setIsLocationConfirmed] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleJobAccepted = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleGetLocation = () => {
    setGettingLocation(true);
    setLocationError('');
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setGettingLocation(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMechanicLocation({ lat: latitude, lng: longitude });
        setGettingLocation(false);
      },
      (err) => {
        setGettingLocation(false);
        setLocationError('Failed to detect location: ' + err.message);
      }
    );
  };

  if (activeTab === 'history') {
    return <ServiceHistorySection />;
  }

  if (activeTab === 'earnings') {
    return (
      <div className="max-w-4xl">
        <EarningsWidget />
      </div>
    );
  }

  if (activeTab === 'messages') {
    return (
      <div className="bg-white p-8 rounded-2xl border border-borderLight shadow-sm text-center">
        <h2 className="text-2xl font-bold font-display text-textMain mb-2">Messages</h2>
        <p className="text-textMuted">No messages yet.</p>
      </div>
    );
  }

  if (!isOnline) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded-2xl border border-borderLight shadow-sm p-8 text-center">
        <div className="w-24 h-24 bg-black/5 rounded-full flex items-center justify-center mb-6">
          <Power size={48} className="text-textMuted" />
        </div>
        <h2 className="text-2xl font-bold font-display text-textMain mb-2">You are currently offline</h2>
        <p className="text-textMuted max-w-md mb-8">
          Go online to start receiving service requests from customers nearby.
        </p>
        <button
          onClick={() => setIsOnline(true)}
          className="bg-brandYellow hover:bg-brandYellowHover text-brandDark font-bold py-4 px-12 rounded-xl transition-colors shadow-lg hover:shadow-xl text-lg flex items-center gap-2"
        >
          <Power size={24} />
          Go Online
        </button>
      </div>
    );
  }

  if (isOnline && !isLocationConfirmed) {
    return (
      <div className="bg-white rounded-2xl border border-borderLight shadow-sm p-6 sm:p-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6 border-b border-borderLight pb-6">
          <div className="w-12 h-12 bg-brandYellow/20 rounded-full flex items-center justify-center">
            <MapPin size={24} className="text-brandDark" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-textMain">Set Your Location</h2>
            <p className="text-textMuted text-sm">Where are you currently located? We will send you requests within 5-10km.</p>
          </div>
        </div>

        {locationError && <div className="text-red-500 bg-red-50 p-3 rounded mb-4 text-sm">{locationError}</div>}

        <div className="flex justify-center mb-4">
          <button
            onClick={handleGetLocation}
            disabled={gettingLocation}
            className="w-full flex items-center justify-center gap-2 bg-brandDark/5 hover:bg-brandDark/10 text-brandDark px-4 py-3 rounded-lg font-medium transition-colors border border-borderDark"
          >
            {gettingLocation ? <Loader2 className="animate-spin text-brandYellow" size={18} /> : <MapPin size={18} />}
            {gettingLocation ? 'Detecting Location...' : 'Pick Current Location'}
          </button>
        </div>

        <div className="mb-6 border border-borderLight rounded-xl overflow-hidden shadow-inner">
          <LocationPickerMap
            position={mechanicLocation}
            setPosition={setMechanicLocation}
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => setIsOnline(false)}
            className="px-6 py-3 rounded-xl font-bold text-textMuted hover:bg-black/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => setIsLocationConfirmed(true)}
            disabled={!mechanicLocation}
            className="bg-brandDark hover:bg-black text-brandYellow font-bold py-3 px-8 rounded-xl transition-colors shadow-md disabled:opacity-50 flex items-center gap-2"
          >
            <CheckCircle size={20} />
            Confirm Location
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pb-8">
      {/* Earnings Overview */}
      <div className="col-span-1 lg:col-span-3">
        <EarningsWidget />
      </div>

      {/* Incoming Requests and Active Job */}
      <div className="col-span-1 lg:col-span-3 space-y-6">
        <MechanicActiveJobWidget refreshTrigger={refreshKey} onJobUpdated={handleJobAccepted} />
        <IncomingJobsWidget mechanicLocation={mechanicLocation} onJobAccepted={handleJobAccepted} />
      </div>
    </div>
  );
}
