import { EarningsWidget } from './EarningsWidget';
import { IncomingJobsWidget } from './IncomingJobsWidget';
import { ActiveServiceTimeline } from './ActiveServiceTimeline';

export function MechanicDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pb-8">
      {/* Earnings Overview */}
      <div className="col-span-1 lg:col-span-3">
        <EarningsWidget />
      </div>

      {/* Incoming Requests */}
      <div className="col-span-1 lg:col-span-2">
        <IncomingJobsWidget />
      </div>

      {/* Current Active Job Status */}
      <div className="col-span-1">
        <ActiveServiceTimeline />
      </div>
    </div>
  );
}
