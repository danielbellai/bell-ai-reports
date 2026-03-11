import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Zap } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function QuickWins({ quickWins }) {
  const [openId, setOpenId] = useState(null);

  return (
    <SectionWrapper id="quickwins">
      <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-3">
        Recommended Quick Wins
      </h2>
      <p className="text-center text-slate mb-10 max-w-2xl mx-auto">
        Most of these deliver measurable results within 48 hours. High impact, minimal drag.
      </p>

      <motion.div
        className="space-y-4"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {quickWins.map((qw) => (
          <motion.div key={qw.id} variants={item}>
            <button
              onClick={() => setOpenId(openId === qw.id ? null : qw.id)}
              className="w-full bg-white rounded-xl border border-brand-border p-5 shadow-sm text-left hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-teal" />
                  <span className="font-bold text-navy">{qw.name}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate transition-transform ${
                    openId === qw.id ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            <AnimatePresence>
              {openId === qw.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="bg-white border border-t-0 border-brand-border rounded-b-xl px-5 pb-6 pt-2 space-y-4">
                    {/* Today / After panels */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-red-50 border border-red-200 rounded-lg p-4"
                      >
                        <h4 className="text-sm font-bold text-red-600 mb-2">Today</h4>
                        <p className="text-sm text-dark-slate">{qw.currentState}</p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-emerald-50 border border-emerald-200 rounded-lg p-4"
                      >
                        <h4 className="text-sm font-bold text-emerald-600 mb-2">After</h4>
                        <p className="text-sm text-dark-slate">{qw.futureState}</p>
                      </motion.div>
                    </div>

                    {/* Team impact */}
                    <div className="bg-teal/5 border border-teal/20 rounded-lg p-4">
                      <h4 className="text-sm font-bold text-teal mb-2">What Changes for Your Team</h4>
                      <p className="text-sm text-dark-slate">{qw.teamImpact}</p>
                    </div>

                    {/* Steps */}
                    <div>
                      <h4 className="text-sm font-bold text-navy mb-2">Implementation Steps</h4>
                      <ol className="list-decimal list-inside space-y-1">
                        {qw.steps.map((step, i) => (
                          <li key={i} className="text-sm text-dark-slate">{step}</li>
                        ))}
                      </ol>
                    </div>

                    {/* ROI */}
                    {qw.roi && (
                      <div className="bg-light-gray rounded-lg p-4">
                        <h4 className="text-sm font-bold text-navy mb-2">ROI Indicator</h4>
                        {qw.roi.hoursSaved && (
                          <p className="text-sm text-dark-slate">
                            <strong>Hours saved:</strong> {qw.roi.hoursSaved}
                          </p>
                        )}
                        {qw.roi.costSavings && (
                          <p className="text-sm text-dark-slate">
                            <strong>Cost savings:</strong> ${qw.roi.costSavings.toLocaleString()}/year
                          </p>
                        )}
                        {qw.roi.dataNeeded?.length > 0 && (
                          <p className="text-xs text-slate mt-2">
                            To calculate your specific ROI, we'll need: {qw.roi.dataNeeded.join(", ")}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Solves */}
                    {qw.solves?.length > 0 && (
                      <div className="text-sm text-slate">
                        <strong>Resolves:</strong>{" "}
                        {qw.solves.map(id => (
                          <span key={id} className="text-xs font-bold text-teal bg-teal/10 px-2 py-0.5 rounded mr-1">
                            {id}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
