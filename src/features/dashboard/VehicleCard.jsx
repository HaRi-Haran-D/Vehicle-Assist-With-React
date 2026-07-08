import { WidgetCard } from '../../components/WidgetCard';

export function VehicleCard() {
  return (
    <WidgetCard className="relative overflow-hidden p-0" delay={0.4}>
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent opacity-50" />
      <div className="p-6 relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-display font-bold text-textMain">Tesla Model S</h2>
            <p className="text-accent font-mono mt-1 tracking-widest text-sm">TSLA-8294</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-success/10 text-success text-xs font-bold uppercase tracking-wider border border-success/30">
            Online
          </span>
        </div>
        
        <div className="mt-12 flex gap-8">
          <div>
            <p className="text-xs text-textMuted uppercase tracking-wider mb-1">Range</p>
            <p className="text-xl font-bold font-display text-textMain">342 mi</p>
          </div>
          <div>
            <p className="text-xs text-textMuted uppercase tracking-wider mb-1">Mileage</p>
            <p className="text-xl font-bold font-display text-textMain">12,450</p>
          </div>
        </div>
      </div>
      
      <div className="absolute -right-4 -bottom-4 w-56 h-56 opacity-60 mix-blend-multiply pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=600&auto=format&fit=crop" 
          className="w-full h-full object-cover rounded-full"
          alt="Vehicle Stylized"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent rounded-full" />
      </div>
    </WidgetCard>
  );
}
