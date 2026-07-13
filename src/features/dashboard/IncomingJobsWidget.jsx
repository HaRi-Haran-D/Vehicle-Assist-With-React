import React, { useState, useEffect } from 'react';
import { WidgetCard } from '../../components/WidgetCard';
import { MapPin, Clock, Wrench, Loader2 } from 'lucide-react';
import { getServiceRequests, acceptServiceRequest } from '../../api/client';

export function IncomingJobsWidget({ mechanicLocation }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Not authenticated');
        const data = await getServiceRequests(token);

        // Filter to only show PENDING requests
        const pendingJobs = data.filter(job => job.status === 'PENDING');
        setJobs(pendingJobs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [mechanicLocation]);

  const handleAccept = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      await acceptServiceRequest(token, jobId);
      setJobs(jobs.filter(job => job.id !== jobId));
    } catch (err) {
      alert("Failed to accept job: " + err.message);
    }
  };

  // Helper to format date relative to now
  const getTimeAgo = (dateString) => {
    if (!dateString) return 'Just now';
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 60000); // minutes
    if (diff < 60) return `${diff} mins ago`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours} hours ago`;
    return `${Math.floor(hours / 24)} days ago`;
  };

  return (
    <WidgetCard title="Incoming Requests" delay={0.2}>
      {mechanicLocation && (
        <div className="mb-4 bg-brandYellow/10 border border-brandYellow/30 text-brandDark px-4 py-3 rounded-lg flex items-center gap-2 text-sm font-medium">
          <MapPin size={16} className="text-brandYellow" />
          <span>Scanning for requests</span>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="animate-spin text-brandYellow" size={24} />
        </div>
      ) : error ? (
        <div className="text-red-500 bg-red-50 p-4 rounded-lg text-sm">
          Failed to load requests: {error}
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-textMuted bg-black/5 p-6 rounded-xl text-center text-sm font-medium mt-4">
          No incoming requests at the moment.
        </div>
      ) : (
        <div className="mt-4 space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white border border-borderLight rounded-2xl p-5 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-display font-bold text-lg text-textMain mt-1">{job.description}</h3>
                </div>
                <span className="text-xs font-medium text-textMuted bg-black/5 px-2 py-1 rounded flex items-center gap-1 min-w-fit">
                  <Clock size={12} /> {getTimeAgo(job.created_at)}
                </span>
              </div>

              <div className="flex flex-col gap-2 text-sm text-textMuted mb-4">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-brandYellow min-w-[16px]" />
                  <span className="truncate" title={job.location}>{job.location || 'Location not specified'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wrench size={16} className="text-brandYellow min-w-[16px]" />
                  <span className="truncate">
                    {job.vehicle_details ? `${job.vehicle_details.make} ${job.vehicle_details.model}` : `Vehicle ID: ${job.vehicle}`}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 mt-2">
                <button 
                  onClick={() => handleAccept(job.id)}
                  className="flex-1 bg-brandYellow hover:bg-brandYellowHover text-brandDark font-bold py-2 rounded-xl transition-colors"
                >
                  Accept Job
                </button>
                <button className="flex-1 bg-black/5 hover:bg-black/10 text-textMuted font-bold py-2 rounded-xl transition-colors">
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </WidgetCard>
  );
}
