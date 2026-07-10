import { WidgetCard } from '../../components/WidgetCard';
import { motion } from 'framer-motion';
import { CheckCircle2, CircleDashed, X } from 'lucide-react';

export function ActiveServiceTimeline({ request, onCancel }) {
  let steps = [];
  if (!request || request.status === 'PENDING') {
    steps = [
      { label: 'Waiting for Mechanic', status: 'active' },
      { label: 'Mechanic Accepted', status: 'pending' },
      { label: 'Mechanic Travelling', status: 'pending' },
      { label: 'Repair Started', status: 'pending' },
    ];
  } else if (request.status === 'IN_PROGRESS') {
    steps = [
      { label: 'Waiting for Mechanic', status: 'completed' },
      { label: 'Mechanic Accepted', status: 'completed' },
      { label: 'Mechanic Travelling', status: 'active' },
      { label: 'Repair Started', status: 'pending' },
    ];
  } else {
    steps = [
      { label: 'Waiting for Mechanic', status: 'completed' },
      { label: 'Mechanic Accepted', status: 'completed' },
      { label: 'Mechanic Travelling', status: 'completed' },
      { label: 'Repair Completed', status: 'completed' },
    ];
  }

  return (
    <WidgetCard title={request?.vehicle ? `Active Service: ${request.vehicle.make} ${request.vehicle.model}` : "Active Service"} delay={0.3}>
      <div className="relative mt-4">
        <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-borderLight" />
        
        <div className="space-y-8">
          {steps.map((step, i) => (
            <div key={i} className="relative flex items-center gap-5">
              <div className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm border border-borderLight">
                {step.status === 'completed' && <CheckCircle2 className="text-success" size={24} />}
                {step.status === 'active' && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  >
                    <CircleDashed className="text-accent glow-text" size={24} />
                  </motion.div>
                )}
                {step.status === 'pending' && <div className="w-3 h-3 rounded-full bg-black/10" />}
              </div>
              <div className={step.status === 'pending' ? 'text-textMuted' : 'text-textMain'}>
                <p className="font-medium text-lg">{step.label}</p>
                {step.status === 'active' && <p className="text-sm text-accent mt-1">ETA: 8 mins</p>}
              </div>
            </div>
          ))}
        </div>
        {request && request.status !== 'COMPLETED' && (
          <div className="mt-8 flex justify-end relative z-10 border-t border-borderLight pt-4">
            <button
              onClick={onCancel}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200"
            >
              <X size={16} />
              Cancel Request
            </button>
          </div>
        )}
      </div>
    </WidgetCard>
  );
}
