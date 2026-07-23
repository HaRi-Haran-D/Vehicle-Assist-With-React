import { motion, AnimatePresence } from 'framer-motion';
import { Home, Car, Wrench, MapPin, Clock, AlertTriangle, MessageSquare, Settings, User, Briefcase, IndianRupee, LogOut, X } from 'lucide-react';
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

export function Sidebar({ active, setActive, mobileOpen, setMobileOpen }) {
  const role = localStorage.getItem('userRole') || 'CUSTOMER';
  const menuItems = getMenuItems(role);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const handleItemClick = (id) => {
    setActive(id);
    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  const renderContent = () => (
    <>
      <div className="p-6 pt-8 flex items-center justify-between gap-3">
        <span className="font-display font-bold text-xl tracking-tight text-textMain">
          Vehicle<span className="text-brandYellow">Assist</span>
        </span>
        {setMobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-2 rounded-xl text-textMuted hover:text-textMain hover:bg-black/5 transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group
              ${active === item.id
                ? (item.danger ? 'text-danger font-semibold' : 'text-accent font-semibold bg-accent/10')
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
            <item.icon size={20} className="relative z-10" />
            <span className="font-medium relative z-10">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 space-y-2 mb-4 border-t border-borderDark/40">
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
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 h-screen border-r border-borderDark bg-card/30 backdrop-blur-md hidden lg:flex flex-col shrink-0">
        {renderContent()}
      </aside>

      {/* Mobile Sidebar Drawer & Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Mobile Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl z-50 flex flex-col lg:hidden border-r border-borderDark"
            >
              {renderContent()}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
