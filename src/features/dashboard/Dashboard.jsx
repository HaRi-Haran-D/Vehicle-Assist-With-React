import { DashboardLayout } from '../../layouts/DashboardLayout';
import { MapWidget } from './MapWidget';
import { HealthGauge } from './HealthGauge';
import { ActiveServiceTimeline } from './ActiveServiceTimeline';
import { EmergencyPanel } from './EmergencyPanel';
import { VehicleCard } from './VehicleCard';

export function Dashboard() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 pb-8">
        {/* Main Map Widget (spans 2 columns) */}
        <MapWidget />

        {/* Vehicle Card */}
        <div className="col-span-1 lg:col-span-2">
          <VehicleCard />
        </div>

        {/* Health Gauge */}
        <div className="col-span-1">
          <HealthGauge />
        </div>

        {/* Active Service Timeline */}
        <div className="col-span-1 lg:col-span-2">
          <ActiveServiceTimeline />
        </div>

        {/* Emergency Panel */}
        <div className="col-span-1">
          <EmergencyPanel />
        </div>
      </div>
    </DashboardLayout>
  );
}
