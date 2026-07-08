import { motion } from 'framer-motion';

export function WidgetCard({ title, children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -2 }}
      className={`glass-panel p-6 flex flex-col h-full ${className}`}
    >
      {title && <h3 className="text-lg font-display font-semibold mb-4 text-textMain">{title}</h3>}
      <div className="flex-1 relative">
        {children}
      </div>
    </motion.div>
  );
}
