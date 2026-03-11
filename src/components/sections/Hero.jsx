import { motion } from 'framer-motion';

export default function Hero({ data }) {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-navy text-white">
      {/* Grid texture overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block bg-teal/20 text-teal border border-teal/30 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
        >
          Operations Efficiency Audit
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          {data.clientName}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-gray-300 mb-8"
        >
          {data.clientContext}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="text-sm text-gray-400"
        >
          Prepared by <span className="text-teal font-semibold">Bell AI Solutions</span> · {data.auditDate}
        </motion.div>
      </div>
    </section>
  );
}
