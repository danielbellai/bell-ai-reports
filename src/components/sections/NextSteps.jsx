import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';

export default function NextSteps({ data, clientName }) {
  return (
    <section id="nextsteps" className="relative py-20 px-4 bg-navy text-white overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold mb-4"
        >
          Ready to Move Forward?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-300 text-lg mb-4"
        >
          {data.summary}
        </motion.p>

        {data.details && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mb-8"
          >
            {data.details}
          </motion.p>
        )}

        <motion.a
          href={data.ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: "spring" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 bg-teal hover:bg-teal/90 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg shadow-teal/20 transition-colors"
        >
          {data.ctaText} <ArrowRight className="w-5 h-5" />
        </motion.a>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-gray-500 text-sm mt-6"
        >
          Have questions? Reply to the email that sent you this report.
        </motion.p>
      </div>
    </section>
  );
}
