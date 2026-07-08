import { Search, Bell, CloudRain, ShieldAlert } from 'lucide-react';
import { Button } from './Button';

export function Navbar() {
  return (
    <header className="h-20 border-b border-borderDark bg-primary/40 backdrop-blur-lg px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="flex-1 max-w-md relative hidden md:block">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted" />
        <input 
          type="text" 
          placeholder="Search locations, mechanics..." 
          className="w-full bg-white border border-borderDark rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all text-textMain placeholder-textMuted shadow-sm"
        />
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full border border-borderDark bg-white shadow-sm">
          <CloudRain size={16} className="text-accent" />
          <span className="text-sm font-medium">18°C, Light Rain</span>
        </div>
        
        <button className="relative p-2 rounded-full hover:bg-black/5 transition-colors">
          <Bell size={20} className="text-textMuted hover:text-textMain" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full"></span>
        </button>

        <Button variant="danger" className="flex items-center gap-2 !rounded-full !py-1.5 !px-4">
          <ShieldAlert size={16} />
          <span className="hidden sm:inline">SOS</span>
        </Button>

        <div className="w-9 h-9 rounded-full overflow-hidden border border-borderDark ml-2 cursor-pointer hover:border-accent transition-colors shadow-sm">
          <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
}
