import { MapWidget } from './MapWidget';
import { ActiveServiceTimeline } from './ActiveServiceTimeline';
import { VehicleCard } from './VehicleCard';

export function CustomerDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 pb-8">
      {/* Main Map Widget (spans 2 columns) */}
      <MapWidget />

      {/* Vehicle Card */}
      <div className="col-span-1 lg:col-span-2">
        <VehicleCard />
      </div>

      {/* Active Service Timeline */}
      <div className="col-span-1 lg:col-span-2">
        <ActiveServiceTimeline />
      </div>

    </div>
  );
}
