import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';
import TypeBadge from '../ui/TypeBadge';

const engineColors = [
  "border-l-teal",
  "border-l-orange",
  "border-l-navy",
  "border-l-purple-500",
  "border-l-amber-500",
  "border-l-rose-500",
  "border-l-emerald-500",
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ProcessMaps({ processes }) {
  return (
    <SectionWrapper id="process">
      <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-3">
        How Your Operation Works
      </h2>
      <p className="text-center text-slate mb-10 max-w-2xl mx-auto">
        We've mapped your core workflows. Here's where time disappears and where things break down.
      </p>

      <div className="space-y-10">
        {processes.map((process, pi) => (
          <div key={process.engine}>
            <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${engineColors[pi % engineColors.length].replace("border-l-", "bg-")}`} />
              {process.engine}
            </h3>

            <motion.div
              className="space-y-2"
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {process.steps.map((step, si) => (
                <motion.div
                  key={si}
                  variants={item}
                  className={`bg-white border-l-4 ${engineColors[pi % engineColors.length]} rounded-lg p-4 shadow-sm ${
                    step.friction ? "ring-1 ring-orange/30" : ""
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-bold text-slate bg-light-gray rounded px-2 py-0.5">
                      {si + 1}
                    </span>
                    <span className="font-semibold text-dark-slate">{step.name}</span>
                    <span className="text-sm text-slate">· {step.who}</span>
                    <span className="text-sm text-slate">· {step.tool}</span>
                    {step.friction && (
                      <TypeBadge type={step.friction.type} />
                    )}
                  </div>

                  {step.friction && (
                    <div className="mt-3 bg-orange/5 rounded-md p-3 flex gap-2 items-start">
                      <AlertTriangle className="w-4 h-4 text-orange mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm text-dark-slate">{step.friction.detail}</p>
                        {step.friction.impact && (
                          <p className="text-xs text-slate mt-1">{step.friction.impact}</p>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
