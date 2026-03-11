import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, XCircle } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';
import ImpactBar from '../ui/ImpactBar';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function BigSwings({ bigSwings, deprioritize }) {
  const [tab, setTab] = useState("big");

  return (
    <SectionWrapper id="bigswings">
      <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-3">
        Big Swings & What to Skip
      </h2>
      <p className="text-center text-slate mb-8 max-w-2xl mx-auto">
        Big moves worth making once the quick wins are in place. And the stuff that'll drain your budget for no payoff.
      </p>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-8">
        <button
          onClick={() => setTab("big")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
            tab === "big" ? "bg-navy text-white" : "bg-white text-slate border border-brand-border"
          }`}
        >
          <Rocket className="w-4 h-4" /> Big Swings ({bigSwings.length})
        </button>
        <button
          onClick={() => setTab("skip")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
            tab === "skip" ? "bg-navy text-white" : "bg-white text-slate border border-brand-border"
          }`}
        >
          <XCircle className="w-4 h-4" /> Don't Do ({deprioritize.length})
        </button>
      </div>

      <AnimatePresence mode="wait">
        {tab === "big" ? (
          <motion.div
            key="big"
            variants={container}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="grid md:grid-cols-2 gap-4"
          >
            {bigSwings.map((bs) => (
              <motion.div
                key={bs.id}
                variants={item}
                className="bg-white rounded-xl border border-brand-border p-5 shadow-sm"
              >
                <h3 className="font-bold text-navy mb-2">{bs.name}</h3>
                <p className="text-sm text-slate mb-3">{bs.description}</p>
                <div className="flex gap-6">
                  <div>
                    <span className="text-xs text-slate block mb-1">Impact</span>
                    <ImpactBar value={bs.impact} color="bg-teal" />
                  </div>
                  <div>
                    <span className="text-xs text-slate block mb-1">Effort</span>
                    <ImpactBar value={bs.effort} color="bg-orange" />
                  </div>
                </div>
                {bs.tools && (
                  <p className="text-xs text-slate mt-3"><strong>Tools:</strong> {bs.tools}</p>
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="skip"
            variants={container}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="space-y-3 max-w-3xl mx-auto"
          >
            {deprioritize.map((d) => (
              <motion.div
                key={d.id}
                variants={item}
                className="bg-white rounded-xl border border-brand-border p-5 shadow-sm flex items-start gap-4"
              >
                <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-dark-slate">{d.name}</h3>
                  <p className="text-sm text-slate mt-1">{d.reason}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
