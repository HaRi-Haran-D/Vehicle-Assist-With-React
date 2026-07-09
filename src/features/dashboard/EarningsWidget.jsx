import { WidgetCard } from '../../components/WidgetCard';
import { IndianRupee, TrendingUp, CheckCircle, Star } from 'lucide-react';

export function EarningsWidget() {
  const stats = [
    { label: "Today's Earnings", value: '₹2,450', icon: IndianRupee, color: 'text-success' },
    { label: 'Jobs Completed', value: '5', icon: CheckCircle, color: 'text-brandYellow' },
    { label: 'Customer Rating', value: '4.9', icon: Star, color: 'text-neon' },
    { label: 'Weekly Growth', value: '+12%', icon: TrendingUp, color: 'text-accent' },
  ];

  return (
    <WidgetCard title="Performance Overview" delay={0.1}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-black/5 rounded-2xl p-4 border border-borderLight flex flex-col items-center justify-center text-center">
            <div className={`w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <p className="text-sm font-medium text-textMuted mb-1">{stat.label}</p>
            <p className="text-2xl font-bold font-display text-textMain">{stat.value}</p>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}
