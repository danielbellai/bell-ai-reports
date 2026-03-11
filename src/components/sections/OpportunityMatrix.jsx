import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';
import ImpactBar from '../ui/ImpactBar';

const dotVariant = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i) => ({
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: i * 0.12,
    },
  }),
};

const engineColors = {
  default: "#2A9D8F",
};

function getColor(engine, allEngines) {
  const palette = ["#2A9D8F", "#E76F51", "#1B2A4A", "#8B5CF6", "#F59E0B", "#EF4444", "#10B981"];
  const idx = allEngines.indexOf(engine);
  return palette[idx % palette.length];
}

export default function OpportunityMatrix({ opportunities, frictionPoints = [] }) {
  const [selected, setSelected] = useState(null);
  const allOpps = [...opportunities.quickWins, ...opportunities.bigSwings];
  const engines = [...new Set(allOpps.map(o => o.engine))];
  const frictionMap = Object.fromEntries(frictionPoints.map(fp => [fp.id, fp.label]));

  const isQuickWin = (opp) => opportunities.quickWins.some(qw => qw.id === opp.id);

  return (
    <SectionWrapper id="matrix">
      <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-3">
        Opportunity Matrix
      </h2>
      <p className="text-center text-slate mb-10 max-w-2xl mx-auto">
        See which opportunities move the needle with minimal effort. Click any dot for details.
      </p>

      {/* Desktop: scatter plot */}
      <div className="hidden md:block">
        <div className="relative bg-white rounded-xl border border-brand-border p-8">
          {/* Y-axis label */}
          <div className="absolute left-1 top-1/2 -translate-y-1/2 -rotate-90 text-[11px] text-slate/70 font-semibold tracking-widest uppercase">
            Impact →
          </div>

          {/* Grid + Dots wrapper */}
          <div className="relative ml-10 mb-6" style={{ height: 420 }}>
            {/* 2x2 Quadrant Grid */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 rounded-lg overflow-hidden border border-gray-200">
              {/* Top-left: Quick Wins (high impact, low effort) */}
              <div className="relative bg-emerald-50/80 border-r border-b border-gray-200 p-3">
                <span className="text-[11px] font-semibold text-emerald-700/80 tracking-wide uppercase">Quick Wins</span>
                <span className="block text-[10px] text-emerald-600/60 mt-0.5">High impact, low effort</span>
              </div>
              {/* Top-right: Big Swings (high impact, high effort) */}
              <div className="relative bg-amber-50/60 border-b border-gray-200 p-3">
                <span className="text-[11px] font-semibold text-amber-700/80 tracking-wide uppercase">Big Swings</span>
                <span className="block text-[10px] text-amber-600/60 mt-0.5">High impact, high effort</span>
              </div>
              {/* Bottom-left: Easy Extras (low impact, low effort) */}
              <div className="relative bg-sky-50/50 border-r border-gray-200 p-3 flex flex-col justify-end">
                <span className="text-[11px] font-semibold text-sky-700/70 tracking-wide uppercase">Easy Extras</span>
                <span className="block text-[10px] text-sky-600/50 mt-0.5">Low impact, low effort</span>
              </div>
              {/* Bottom-right: Reconsider (low impact, high effort) */}
              <div className="relative bg-rose-50/40 border-gray-200 p-3 flex flex-col justify-end">
                <span className="text-[11px] font-semibold text-rose-700/60 tracking-wide uppercase">Reconsider</span>
                <span className="block text-[10px] text-rose-600/40 mt-0.5">Low impact, high effort</span>
              </div>
            </div>

            {/* Dots overlaid on same container */}
            <motion.div
              className="absolute inset-0"
              style={{ pointerEvents: "none" }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {allOpps.map((opp, i) => {
                // Map 1-5 into the lower/left half, 6-10 into the upper/right half
                // with a gap around the 50% quadrant boundary so dots don't straddle it
                const mapAxis = (val) => {
                  if (val <= 5) return 8 + ((val - 1) / 4) * 36;
                  return 56 + ((val - 6) / 4) * 36;
                };
                const x = mapAxis(opp.effort);
                const y = 100 - mapAxis(opp.impact);
                const color = getColor(opp.engine, engines);

                return (
                  <motion.button
                    key={opp.id}
                    custom={i}
                    variants={dotVariant}
                    onClick={() => setSelected(selected?.id === opp.id ? null : opp)}
                    className="absolute flex items-center justify-center rounded-full cursor-pointer hover:scale-110 transition-transform"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      width: 38,
                      height: 38,
                      backgroundColor: color,
                      transform: "translate(-50%, -50%)",
                      border: selected?.id === opp.id ? "3px solid #1B2A4A" : "2px solid white",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      pointerEvents: "auto",
                    }}
                    title={opp.name}
                  >
                    {isQuickWin(opp) ? (
                      <Star className="w-4 h-4 text-white fill-white" />
                    ) : (
                      <span className="text-xs font-bold text-white">{opp.id}</span>
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          {/* X-axis label */}
          <div className="text-center text-[11px] text-slate/70 font-semibold tracking-widest uppercase -mt-3 mb-3 ml-10">
            Effort →
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 justify-center">
            {engines.map((engine) => (
              <div key={engine} className="flex items-center gap-1.5 text-sm text-slate">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: getColor(engine, engines) }} />
                {engine}
              </div>
            ))}
            <div className="flex items-center gap-1.5 text-sm text-slate">
              <Star className="w-3 h-3 text-teal fill-teal" /> Quick Win
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: sorted card list */}
      <div className="md:hidden space-y-3">
        {allOpps
          .sort((a, b) => (b.impact - b.effort) - (a.impact - a.effort))
          .map((opp) => (
            <button
              key={opp.id}
              onClick={() => setSelected(selected?.id === opp.id ? null : opp)}
              className={`w-full text-left bg-white rounded-lg border p-4 shadow-sm transition-colors ${
                selected?.id === opp.id ? "border-navy" : "border-brand-border"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {isQuickWin(opp) && <Star className="w-4 h-4 text-teal fill-teal" />}
                <span className="font-semibold text-dark-slate">{opp.name}</span>
              </div>
              <div className="flex gap-6 text-sm text-slate">
                <span>Impact: <ImpactBar value={opp.impact} color="bg-teal" /></span>
                <span>Effort: <ImpactBar value={opp.effort} color="bg-orange" /></span>
              </div>
            </button>
          ))}
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-6 bg-white rounded-xl border border-brand-border p-6 shadow-sm relative">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-slate hover:text-dark-slate"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-bold text-navy mb-1">{selected.name}</h3>
              <p className="text-sm text-slate mb-4">{selected.description}</p>
              <div className="flex flex-wrap gap-6 mb-4">
                <div>
                  <span className="text-xs text-slate block mb-1">Impact</span>
                  <ImpactBar value={selected.impact} color="bg-teal" />
                </div>
                <div>
                  <span className="text-xs text-slate block mb-1">Effort</span>
                  <ImpactBar value={selected.effort} color="bg-orange" />
                </div>
                <div>
                  <span className="text-xs text-slate block mb-1">Engine</span>
                  <span className="text-sm font-semibold text-dark-slate">{selected.engine}</span>
                </div>
              </div>
              {selected.solves?.length > 0 && (
                <div className="mb-3">
                  <span className="text-xs text-slate">Resolves friction points: </span>
                  {selected.solves.map(id => (
                    <span key={id} className="text-xs font-bold text-teal bg-teal/10 px-2 py-0.5 rounded mr-1">
                      {id} {frictionMap[id] || ""}
                    </span>
                  ))}
                </div>
              )}
              {selected.tools && (
                <p className="text-sm text-slate">
                  <strong>Suggested tools:</strong> {selected.tools}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
