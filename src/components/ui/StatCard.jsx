import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

export default function StatCard({ icon: Icon, label, value, delay = 0 }) {
  return (
    <motion.div
      className="bg-white rounded-xl border border-brand-border p-6 text-center shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      {Icon && (
        <div className="flex justify-center mb-3">
          <Icon className="w-6 h-6 text-teal" />
        </div>
      )}
      <div className="text-4xl font-bold text-navy mb-1">
        <AnimatedCounter end={value} />
      </div>
      <div className="text-sm text-slate">{label}</div>
    </motion.div>
  );
}
