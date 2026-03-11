import { motion } from 'framer-motion';

export default function SectionWrapper({ children, id, className = "" }) {
  return (
    <motion.section
      id={id}
      className={`py-16 px-4 md:px-8 lg:px-16 ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </motion.section>
  );
}
