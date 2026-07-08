import { WidgetCard } from '../../components/WidgetCard';
import { Navigation, Navigation2, MapPin, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

export function MapWidget() {
  return (
    <WidgetCard className="col-span-1 lg:col-span-2 row-span-2 overflow-hidden p-0 relative h-[400px] lg:h-auto">
      {/* Light Map Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-multiply grayscale" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
      
      {/* Simulated Route */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        {/* Route Path */}
        <motion.path
          d="M 50 300 Q 200 200 400 250 T 600 100"
          fill="none"
          stroke="#2563EB"
          strokeWidth="4"
          strokeDasharray="8 8"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>

      {/* Animated Elements */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* User Location */}
        <div className="absolute left-[600px] top-[100px] -translate-x-1/2 -translate-y-1/2">
          <motion.div 
            className="w-12 h-12 bg-neon/20 rounded-full absolute -top-4 -left-4"
            animate={{ scale: [1, 2], opacity: [0.8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          <div className="w-4 h-4 bg-neon rounded-full border-2 border-white shadow-lg relative z-10" />
          <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-borderLight text-xs font-bold text-textMain whitespace-nowrap">
            Your Vehicle
          </div>
        </div>

        {/* Mechanic Location Moving along Path - Simple approximation using framer motion layout or absolute positioning */}
        <motion.div 
          className="absolute left-[50px] top-[300px] -translate-x-1/2 -translate-y-1/2"
          animate={{ 
            x: [0, 150, 350, 550], 
            y: [0, -100, -50, -200] 
          }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity }}
        >
          <motion.div 
            className="w-16 h-16 bg-accent/20 rounded-full absolute -top-4 -left-4"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
          <div className="w-8 h-8 bg-accent rounded-full border-2 border-white shadow-lg relative z-10 flex items-center justify-center">
            <Truck size={14} className="text-white" />
          </div>
          <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-borderLight text-xs font-bold text-textMain whitespace-nowrap">
            Mechanic En Route
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-auto">
        <div className="glass-panel !rounded-2xl p-4 flex items-center gap-4 border-borderLight bg-white/90 shadow-md w-full sm:w-auto">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
            <Navigation2 size={24} />
          </div>
          <div>
            <p className="text-sm text-textMuted font-medium tracking-wide uppercase">Mechanic ETA</p>
            <p className="text-2xl font-bold font-display text-textMain">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key="eta"
              >
                8 mins
              </motion.span>
            </p>
          </div>
        </div>

        <div className="glass-panel !rounded-2xl p-4 flex items-center gap-4 border-borderLight bg-white/90 shadow-md w-full sm:w-auto">
           <div className="w-10 h-10 rounded-full bg-neon/10 flex items-center justify-center text-neon">
            <MapPin size={20} />
          </div>
          <div>
            <p className="text-xs text-textMuted font-medium uppercase">Distance</p>
            <p className="text-lg font-bold font-display text-textMain">2.4 mi</p>
          </div>
        </div>
      </div>
    </WidgetCard>
  );
}
