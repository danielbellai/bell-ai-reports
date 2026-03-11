import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../ui/SectionWrapper';
import TypeBadge from '../ui/TypeBadge';
import AnimatedCounter from '../ui/AnimatedCounter';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const types = ["All", "Time Sink", "Quality Risk", "Both"];

export default function FrictionPoints({ frictionPoints }) {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All"
    ? frictionPoints
    : frictionPoints.filter(f => f.type === filter);

  const countByType = (type) =>
    frictionPoints.filter(f => f.type === type || (type === "Both" && f.type === "Both")).length;

  return (
    <SectionWrapper id="friction" className="bg-light-gray">
      <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-3">
        Where Time and Quality Are at Risk
      </h2>
      <p className="text-center text-slate mb-8 max-w-2xl mx-auto">
        Here's what's slowing your team down and putting quality at risk.
      </p>

      {/* Summary pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {types.map((type) => {
          const count = type === "All" ? frictionPoints.length : countByType(type);
          return (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                filter === type
                  ? "bg-navy text-white border-navy"
                  : "bg-white text-slate border-brand-border hover:border-navy"
              }`}
            >
              {type} (<AnimatedCounter end={count} />)
            </button>
          );
        })}
      </div>

      {/* Cards */}
      <motion.div
        className="grid gap-3"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        key={filter}
      >
        {filtered.map((fp) => (
          <motion.div
            key={fp.id}
            variants={item}
            className="bg-white rounded-lg border border-brand-border p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="text-xs font-bold text-teal bg-teal/10 px-2 py-0.5 rounded">
                {fp.id}
              </span>
              <span className="font-semibold text-dark-slate">{fp.label}</span>
              <TypeBadge type={fp.type} />
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate">
              <span><strong>Who:</strong> {fp.who}</span>
              <span><strong>Frequency:</strong> {fp.frequency}</span>
            </div>
            <p className="text-sm text-slate mt-2">{fp.effect}</p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
