import { DashboardLayout } from '../../layouts/DashboardLayout';
import { CustomerDashboard } from './CustomerDashboard';
import { MechanicDashboard } from './MechanicDashboard';

export function Dashboard() {
  const role = localStorage.getItem('userRole') || 'CUSTOMER';

  return (
    <DashboardLayout>
      {role === 'MECHANIC' ? <MechanicDashboard /> : <CustomerDashboard />}
    </DashboardLayout>
  );
}
