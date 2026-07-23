import { motion } from 'framer-motion';
import { Home, Car, Wrench, MapPin, Clock, AlertTriangle, MessageSquare, Settings, User, Briefcase, IndianRupee, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const getMenuItems = (role) => {
  if (role === 'MECHANIC') {
    return [
      { icon: Home, label: 'Dashboard', id: 'dashboard' },
      { icon: Clock, label: 'Service History', id: 'history' },
      { icon: IndianRupee, label: 'Earnings', id: 'earnings' },
      { icon: MessageSquare, label: 'Messages', id: 'messages' },
    ];
  }
  return [
    { icon: Home, label: 'Dashboard', id: 'dashboard' },
    { icon: Car, label: 'My Vehicles', id: 'vehicles' },
    { icon: Wrench, label: 'Request History', id: 'history' },
    { icon: MessageSquare, label: 'Messages', id: 'messages' },
  ];
};

export function Sidebar({ active, setActive }) {
  const role = localStorage.getItem('userRole') || 'CUSTOMER';
  const menuItems = getMenuItems(role);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <aside className="w-64 h-screen border-r border-borderDark bg-card/30 backdrop-blur-md hidden lg:flex flex-col">
      <div className="p-6 pt-8 flex items-center gap-3">
        <span className="font-display font-bold text-xl tracking-tight text-textMain">Vehicle Assist</span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group
              ${active === item.id
                ? (item.danger ? 'text-danger' : 'text-accent')
                : 'text-textMuted hover:text-textMain hover:bg-black/5'}`}
          >
            {active === item.id && (
              <motion.div
                layoutId="active-indicator"
                className={`absolute inset-0 rounded-xl ${item.danger ? 'bg-danger/10' : 'bg-neon/10'}`}
                initial={false}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <item.icon size={20} className={`relative z-10 ${active === item.id ? '' : ''}`} />
            <span className="font-medium relative z-10">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 space-y-2 mb-4">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-textMuted hover:text-textMain hover:bg-black/5 transition-all">
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-textMuted hover:text-textMain hover:bg-black/5 transition-all">
          <User size={20} />
          <span className="font-medium">Profile</span>
        </button>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 transition-all font-medium mt-2">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
