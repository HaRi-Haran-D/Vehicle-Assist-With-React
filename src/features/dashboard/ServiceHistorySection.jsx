import React, { useState, useEffect } from 'react';
import { getServiceRequests } from '../../api/client';
import { ClipboardList, Loader2, Calendar } from 'lucide-react';
import { WidgetCard } from '../../components/WidgetCard';
import { RatingWidget } from './RatingWidget';

export function ServiceHistorySection() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getServiceRequests(token);
        setRequests(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchRequests();
  }, [token]);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-brandYellow" size={32} /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-display font-bold text-textMain">Service History</h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {requests.length === 0 ? (
          <div className="col-span-full text-center py-16 text-textMuted bg-card/30 rounded-2xl border border-borderLight shadow-sm">
            <ClipboardList size={56} className="mx-auto mb-4 opacity-40 text-brandDark" />
            <p className="text-lg font-medium text-brandDark">No service request</p>
          </div>
        ) : (
          requests.map(req => (
            <WidgetCard key={req.id} className="relative overflow-hidden p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1 w-full">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-display font-bold text-textMain">
                    {req.vehicle_details ? `${req.vehicle_details.year} ${req.vehicle_details.make} ${req.vehicle_details.model}` : 'Unknown Vehicle'}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border 
                    ${req.status === 'COMPLETED' ? 'bg-green-100 text-green-700 border-green-300' : 
                      req.status === 'IN_PROGRESS' ? 'bg-brandYellow/20 text-brandDark border-brandYellow/50' : 
                      'bg-gray-100 text-gray-700 border-gray-300'}`}>
                    {req.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-textMuted text-sm line-clamp-2 mb-2">{req.description || "No description provided."}</p>
                {req.status === 'COMPLETED' && (
                  <RatingWidget 
                    request={req} 
                    isCustomer={localStorage.getItem('userRole') !== 'MECHANIC'} 
                    onRated={() => {
                      // Optionally refetch or just let the state update handled by fetchRequests on interval if any, or reload
                      const fetchRequests = async () => {
                        const data = await getServiceRequests(token);
                        setRequests(data);
                      };
                      fetchRequests();
                    }}
                  />
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-textMuted whitespace-nowrap bg-secondary px-4 py-2 rounded-lg border border-borderLight self-start md:self-center">
                <Calendar size={16} />
                <span>{new Date(req.created_at).toLocaleDateString()}</span>
              </div>
            </WidgetCard>
          ))
        )}
      </div>
    </div>
  );
}
