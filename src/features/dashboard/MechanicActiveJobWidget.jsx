import React, { useState, useEffect } from 'react';
import { WidgetCard } from '../../components/WidgetCard';
import { MapPin, User, CheckCircle, Loader2, Navigation, Wrench } from 'lucide-react';
import { getServiceRequests, updateServiceRequestStatus } from '../../api/client';

export function MechanicActiveJobWidget() {
  const [activeJob, setActiveJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchActiveJob = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const data = await getServiceRequests(token);
      // Find the job assigned to this mechanic that is in progress
      const job = data.find(j => ['IN_PROGRESS', 'ON_THE_WAY', 'REPAIR_STARTED'].includes(j.status));
      setActiveJob(job || null);
    } catch (err) {
      console.error("Failed to fetch active job", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveJob();
    const interval = setInterval(fetchActiveJob, 3000); // poll every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const handleStatusUpdate = async (newStatus) => {
    try {
      const token = localStorage.getItem('token');
      if (!token || !activeJob) return;
      
      await updateServiceRequestStatus(token, activeJob.id, newStatus);
      
      if (newStatus === 'COMPLETED') {
        setActiveJob(null);
      } else {
        setActiveJob(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error("Failed to update status", err);
      fetchActiveJob();
    }
  };


  if (loading) {
    return (
      <WidgetCard title="Active Job">
        <div className="flex justify-center p-8">
          <Loader2 className="animate-spin text-brandYellow" size={24} />
        </div>
      </WidgetCard>
    );
  }

  if (!activeJob) {
    return null; // Don't show anything if there is no active job
  }

  return (
    <WidgetCard title="Current Active Job" delay={0.2}>
      <div className="p-5 bg-brandYellow/10 border border-brandYellow/30 rounded-2xl mb-4 flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <h3 className="font-display font-bold text-xl text-textMain">{activeJob.description}</h3>
          <span className="text-xs font-bold text-brandDark bg-brandYellow px-2 py-1 rounded uppercase tracking-wider">
            {activeJob.status.replace(/_/g, ' ')}
          </span>
        </div>
        
        <div className="flex items-center gap-2 mt-2">
          <MapPin className="text-brandYellow min-w-[20px]" size={20} />
          <span className="font-medium text-lg text-textMain">{activeJob.location}</span>
        </div>
      </div>

      <div className="flex gap-3">
        {activeJob.status === 'IN_PROGRESS' && (
          <button 
            className="flex-1 bg-brandYellow hover:bg-yellow-500 text-brandDark font-bold py-3 rounded-xl transition-colors flex justify-center items-center gap-2"
            onClick={() => handleStatusUpdate('ON_THE_WAY')}
          >
            <Navigation size={20} />
            On the Way
          </button>
        )}
        
        {activeJob.status === 'ON_THE_WAY' && (
          <button 
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-colors flex justify-center items-center gap-2"
            onClick={() => handleStatusUpdate('REPAIR_STARTED')}
          >
            <Wrench size={20} />
            Start Repair
          </button>
        )}

        {activeJob.status === 'REPAIR_STARTED' && (
          <button 
            className="flex-1 bg-success hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-colors flex justify-center items-center gap-2"
            onClick={() => handleStatusUpdate('COMPLETED')}
          >
            <CheckCircle size={20} />
            Mark as Completed
          </button>
        )}
      </div>
    </WidgetCard>
  );
}
