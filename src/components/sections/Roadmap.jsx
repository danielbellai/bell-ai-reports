import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionWrapper from '../ui/SectionWrapper';

const phaseColors = [
  { bg: "bg-teal/10", border: "border-teal", dot: "bg-teal", badge: "bg-teal text-white" },
  { bg: "bg-navy/5", border: "border-navy", dot: "bg-navy", badge: "bg-navy text-white" },
  { bg: "bg-orange/10", border: "border-orange", dot: "bg-orange", badge: "bg-orange text-white" },
];

export default function Roadmap({ phases }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <SectionWrapper id="roadmap" className="bg-light-gray">
      <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-3">
        Implementation Roadmap
      </h2>
      <p className="text-center text-slate mb-10 max-w-2xl mx-auto">
        Your first win hits in 48 hours. Everything after that builds on momentum.
      </p>

      <div ref={containerRef} className="relative max-w-3xl mx-auto pl-12">
        {/* Drawing line — centered on dots at pl-12 minus left-7 + half of w-4 = 28px */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-brand-border" style={{ left: "27px" }} />
        <motion.div
          className="absolute top-0 w-0.5 bg-teal origin-top"
          style={{ left: "27px", height: lineHeight }}
        />

        <div className="space-y-8">
          {phases.map((phase, i) => {
            const colors = phaseColors[i % phaseColors.length];

            return (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative"
              >
                {/* Dot */}
                <motion.div
                  className={`absolute -left-7 top-5 w-4 h-4 rounded-full ${colors.dot} border-4 border-white shadow`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: i * 0.15 + 0.2 }}
                />

                <div className={`${colors.bg} border ${colors.border}/20 rounded-xl p-6`}>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${colors.badge}`}>
                      {phase.timeframe}
                    </span>
                    <h3 className="text-lg font-bold text-navy">
                      Phase {phase.phase}: {phase.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {phase.items.map((phaseItem, j) => (
                      <li key={j} className="text-sm text-dark-slate flex gap-2">
                        <span className="text-teal mt-1">•</span>
                        {phaseItem}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
