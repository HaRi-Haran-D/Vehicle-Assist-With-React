import { WidgetCard } from '../../components/WidgetCard';
import { Battery, Droplet, GaugeCircle } from 'lucide-react';

const metrics = [
  { icon: Battery, label: 'Battery', value: '86%', color: 'text-success' },
  { icon: Droplet, label: 'Oil Level', value: 'Good', color: 'text-accent' },
  { icon: GaugeCircle, label: 'Tyre Pressure', value: '34 PSI', color: 'text-neon' }
];

export function HealthGauge() {
  return (
    <WidgetCard title="Vehicle Health" delay={0.1}>
      <div className="space-y-4">
        {metrics.map((m, i) => (
          <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-black/5 border border-borderLight hover:bg-black/10 transition-colors">
            <div className="flex items-center gap-4">
              <div className={`p-2.5 rounded-lg bg-white shadow-sm ${m.color}`}>
                <m.icon size={20} />
              </div>
              <span className="font-medium text-textMuted">{m.label}</span>
            </div>
            <span className="font-bold text-textMain text-lg font-display">{m.value}</span>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}
