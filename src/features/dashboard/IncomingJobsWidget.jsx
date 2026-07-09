import { WidgetCard } from '../../components/WidgetCard';
import { MapPin, Clock, Wrench } from 'lucide-react';

export function IncomingJobsWidget() {
  const jobs = [
    {
      id: 'REQ-802',
      customer: 'Rahul M.',
      issue: 'Flat Tire - Front Left',
      distance: '2.4 km',
      time: '5 mins ago',
      vehicle: 'Honda City',
    },
    {
      id: 'REQ-803',
      customer: 'Priya S.',
      issue: 'Battery Dead',
      distance: '4.1 km',
      time: '12 mins ago',
      vehicle: 'Hyundai i20',
    },
    {
      id: 'REQ-804',
      customer: 'Amit K.',
      issue: 'Engine Overheating',
      distance: '5.5 km',
      time: '20 mins ago',
      vehicle: 'Maruti Swift',
    }
  ];

  return (
    <WidgetCard title="Incoming Requests" delay={0.2}>
      <div className="mt-4 space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white border border-borderLight rounded-2xl p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-xs font-bold text-accent uppercase tracking-wider">{job.id}</span>
                <h3 className="font-display font-bold text-lg text-textMain mt-1">{job.issue}</h3>
              </div>
              <span className="text-xs font-medium text-textMuted bg-black/5 px-2 py-1 rounded flex items-center gap-1">
                <Clock size={12} /> {job.time}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-textMuted mb-4">
              <div className="flex items-center gap-1">
                <MapPin size={16} className="text-brandYellow" /> {job.distance}
              </div>
              <div className="flex items-center gap-1">
                <Wrench size={16} className="text-brandYellow" /> {job.vehicle}
              </div>
            </div>
            
            <div className="flex gap-3 mt-2">
              <button className="flex-1 bg-brandYellow hover:bg-brandYellowHover text-brandDark font-bold py-2 rounded-xl transition-colors">
                Accept Job
              </button>
              <button className="flex-1 bg-black/5 hover:bg-black/10 text-textMuted font-bold py-2 rounded-xl transition-colors">
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}
