import { DashboardLayout } from '../../layouts/DashboardLayout';
import { CustomerDashboard } from './CustomerDashboard';
import { MechanicDashboard } from './MechanicDashboard';

import { useState } from 'react';

export function Dashboard() {
  const role = localStorage.getItem('userRole') || 'CUSTOMER';
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {role === 'MECHANIC' ? <MechanicDashboard activeTab={activeTab} /> : <CustomerDashboard activeTab={activeTab} />}
    </DashboardLayout>
  );
}
