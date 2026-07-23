import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Menu } from 'lucide-react';

export function DashboardLayout({ children, activeTab, setActiveTab }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-primary flex-col lg:flex-row">
      {/* Mobile Top Header */}
      <header className="lg:hidden bg-white/90 backdrop-blur-md border-b border-borderDark px-4 py-3 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-xl text-textMain hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-brandYellow"
            aria-label="Open navigation menu"
          >
            <Menu size={24} />
          </button>
          <span className="font-display font-bold text-xl tracking-tight text-textMain">
            Vehicle<span className="text-brandYellow">Assist</span>
          </span>
        </div>
      </header>

      {/* Sidebar Component */}
      <Sidebar
        active={activeTab}
        setActive={setActiveTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative min-w-0">
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
