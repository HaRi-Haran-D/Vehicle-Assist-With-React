import React, { useState, useEffect } from 'react';
import { WidgetCard } from '../../components/WidgetCard';
import { MapPin, User, CheckCircle, Loader2 } from 'lucide-react';
import { getServiceRequests } from '../../api/client';

export function MechanicActiveJobWidget() {
  const [activeJob, setActiveJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchActiveJob = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const data = await getServiceRequests(token);
      // Find the job assigned to this mechanic that is in progress
      const job = data.find(j => j.status === 'IN_PROGRESS');
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
            In Progress
          </span>
        </div>
        
        <div className="flex items-center gap-2 mt-2">
          <MapPin className="text-brandYellow min-w-[20px]" size={20} />
          <span className="font-medium text-lg text-textMain">{activeJob.location}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button 
          className="flex-1 bg-success hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-colors flex justify-center items-center gap-2"
          onClick={() => {
            alert('Completing job is not fully implemented yet!');
          }}
        >
          <CheckCircle size={20} />
          Mark as Completed
        </button>
      </div>
    </WidgetCard>
  );
}
