import React, { useState, useEffect } from 'react';
import { ActiveServiceTimeline } from './ActiveServiceTimeline';
import { getServiceRequests } from '../../api/client';
import { Loader2 } from 'lucide-react';
import { VehiclesSection } from './VehiclesSection';
import { ServiceHistorySection } from './ServiceHistorySection';
import { BookServiceWidget } from './BookServiceWidget';

export function CustomerDashboard({ activeTab, setActiveTab }) {
  const [activeRequests, setActiveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const fetchActiveRequests = async () => {
    try {
      const requests = await getServiceRequests(token);
      const active = requests.filter(r => r.status === 'PENDING' || r.status === 'IN_PROGRESS');
      setActiveRequests(active);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && activeTab === 'dashboard') {
      fetchActiveRequests();
    }
  }, [token, activeTab]);

  if (activeTab === 'vehicles') {
    return <VehiclesSection />;
  }
  if (activeTab === 'history') {
    return <ServiceHistorySection />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 pb-8">

      {activeRequests.length > 0 && (
        <div className="col-span-1 lg:col-span-2">
          <ActiveServiceTimeline />
        </div>
      )}

      {/* Book Service Form */}
      <div className={`col-span-1 ${activeRequests.length > 0 ? 'lg:col-span-2' : 'lg:col-span-4 max-w-4xl'}`}>
        <BookServiceWidget setActiveTab={setActiveTab} onServiceRequested={fetchActiveRequests} />
      </div>

    </div>
  );
}
