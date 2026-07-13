import React, { useState, useEffect } from 'react';
import { WidgetCard } from '../../components/WidgetCard';
import { IndianRupee, TrendingUp, CheckCircle, Star, Loader2 } from 'lucide-react';
import { getMechanicStats } from '../../api/client';

export function EarningsWidget() {
  const [statsData, setStatsData] = useState({
    todays_earnings: 0,
    jobs_completed: 0,
    customer_rating: 0,
    weekly_growth: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const data = await getMechanicStats(token);
          setStatsData(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { label: "Today's Earnings", value: `₹${statsData.todays_earnings}`, icon: IndianRupee, color: 'text-success' },
    { label: 'Jobs Completed', value: `${statsData.jobs_completed}`, icon: CheckCircle, color: 'text-brandYellow' },
    { label: 'Customer Rating', value: `${statsData.customer_rating}`, icon: Star, color: 'text-neon' },
    { label: 'Weekly Growth', value: `${statsData.weekly_growth > 0 ? '+' : ''}${statsData.weekly_growth}%`, icon: TrendingUp, color: 'text-accent' },
  ];

  return (
    <WidgetCard title="Performance Overview" delay={0.1}>
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="animate-spin text-brandYellow" size={24} />
        </div>
      ) : (
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
      )}
    </WidgetCard>
  );
}
