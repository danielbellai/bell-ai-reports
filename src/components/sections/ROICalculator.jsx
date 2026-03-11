import { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { Calculator } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';

function AnimatedOutput({ value, format = "number", unit = "" }) {
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { stiffness: 100, damping: 30 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    motionVal.set(value);
  }, [value, motionVal]);

  useEffect(() => {
    const unsubscribe = springVal.on("change", (v) => {
      setDisplay(Math.round(v));
    });
    return unsubscribe;
  }, [springVal]);

  const formatted = format === "currency"
    ? `$${display.toLocaleString()}`
    : `${display.toLocaleString()}`;

  return (
    <span>
      {format === "currency" ? "" : ""}{formatted}{unit && ` ${unit}`}
    </span>
  );
}

export default function ROICalculator({ config }) {
  if (!config) return null;

  const [values, setValues] = useState(() => {
    const initial = {};
    config.inputs.forEach(input => {
      initial[input.id] = input.default;
    });
    return initial;
  });

  const results = config.calculate(values);

  const handleChange = (id, val) => {
    setValues(prev => ({ ...prev, [id]: Number(val) }));
  };

  return (
    <SectionWrapper id="roi" className="bg-light-gray">
      <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-3">
        ROI Calculator
      </h2>
      <p className="text-center text-slate mb-10 max-w-2xl mx-auto">
        Change the sliders to match your reality. These aren't guesses.
      </p>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Inputs */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-navy flex items-center gap-2">
            <Calculator className="w-5 h-5 text-teal" />
            Your Numbers
          </h3>
          {config.inputs.map((input) => (
            <div key={input.id}>
              <div className="flex justify-between text-sm mb-2">
                <label className="text-dark-slate font-medium">{input.label}</label>
                <span className="font-bold text-navy">
                  {input.unit === "$" ? "$" : ""}{values[input.id]}{input.unit !== "$" ? ` ${input.unit}` : ""}
                </span>
              </div>
              <input
                type="range"
                min={input.min}
                max={input.max}
                step={input.step || 1}
                value={values[input.id]}
                onChange={(e) => handleChange(input.id, e.target.value)}
                className="w-full h-2 bg-brand-border rounded-full appearance-none cursor-pointer accent-teal"
              />
              <div className="flex justify-between text-xs text-slate mt-1">
                <span>{input.unit === "$" ? "$" : ""}{input.min}{input.unit !== "$" ? ` ${input.unit}` : ""}</span>
                <span>{input.unit === "$" ? "$" : ""}{input.max}{input.unit !== "$" ? ` ${input.unit}` : ""}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Outputs */}
        <div>
          <h3 className="text-lg font-bold text-navy mb-4">Projected Savings</h3>
          <div className="space-y-4">
            {config.outputs.map((output) => (
              <motion.div
                key={output.key}
                className="bg-white rounded-xl border border-brand-border p-5 shadow-sm"
                layout
              >
                <div className="text-sm text-slate mb-1">{output.label}</div>
                <div className="text-3xl font-bold text-navy">
                  <AnimatedOutput
                    value={results[output.key] || 0}
                    format={output.format}
                    unit={output.format !== "currency" ? output.unit : ""}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
