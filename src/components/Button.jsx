import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-gradient-to-r from-accent to-blue-400 text-white shadow-lg shadow-accent/20 hover:shadow-accent/40 border border-transparent',
  secondary: 'glass-button text-white',
  danger: 'bg-danger/10 text-danger border border-danger/20 hover:bg-danger/20 glow-box',
  success: 'bg-success/10 text-success border border-success/20 hover:bg-success/20',
};

export function Button({ variant = 'primary', children, className = '', ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`px-4 py-2 rounded-xl font-medium transition-all ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
