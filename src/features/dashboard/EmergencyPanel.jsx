import { WidgetCard } from '../../components/WidgetCard';
import { Phone, ShieldAlert, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

export function EmergencyPanel() {
  return (
    <WidgetCard delay={0.2} className="!border-danger/30 relative overflow-hidden group">
      <div className="absolute inset-0 bg-danger/5 group-hover:bg-danger/10 transition-colors" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-6 py-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: ['0 0 20px rgba(239, 68, 68, 0.4)', '0 0 60px rgba(239, 68, 68, 0.8)', '0 0 20px rgba(239, 68, 68, 0.4)']
          }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-32 h-32 rounded-full bg-gradient-to-br from-red-500 to-danger flex flex-col items-center justify-center text-white border-4 border-danger/50 shadow-2xl"
        >
          <ShieldAlert size={36} className="mb-1" />
          <span className="font-bold font-display tracking-wider text-lg">SOS</span>
        </motion.button>
        
        <div className="grid grid-cols-2 gap-3 w-full mt-4">
          <button className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-black/5 hover:bg-black/10 text-sm font-medium transition-colors border border-borderLight text-textMain">
            <Phone size={16} className="text-textMuted" /> Police
          </button>
          <button className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-black/5 hover:bg-black/10 text-sm font-medium transition-colors border border-borderLight text-textMain">
            <Navigation size={16} className="text-textMuted" /> Share Loc
          </button>
        </div>
      </div>
    </WidgetCard>
  );
}
