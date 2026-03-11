import { AlertTriangle, Clock, ShieldAlert, Zap } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';
import StatCard from '../ui/StatCard';

export default function OverviewStats({ data }) {
  const totalFriction = data.frictionPoints.length;
  const timeSinks = data.frictionPoints.filter(f => f.type === "Time Sink" || f.type === "Both").length;
  const qualityRisks = data.frictionPoints.filter(f => f.type === "Quality Risk" || f.type === "Both").length;
  const quickWins = data.opportunities.quickWins.length;

  const stats = [
    { icon: AlertTriangle, label: "Friction Points Found", value: totalFriction },
    { icon: Clock, label: "Time Sinks", value: timeSinks },
    { icon: ShieldAlert, label: "Quality Risks", value: qualityRisks },
    { icon: Zap, label: "Quick Wins Identified", value: quickWins },
  ];

  return (
    <SectionWrapper id="overview" className="bg-light-gray">
      <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-3">
        The Numbers That Matter
      </h2>
      <p className="text-center text-slate mb-10 max-w-2xl mx-auto">
        {data.clientContext}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} {...stat} delay={i * 0.1} />
        ))}
      </div>
    </SectionWrapper>
  );
}
