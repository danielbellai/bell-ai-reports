import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NotFound from './NotFound';
import StickyNav from './ui/StickyNav';
import Hero from './sections/Hero';
import OverviewStats from './sections/OverviewStats';
import ProcessMaps from './sections/ProcessMaps';
import FrictionPoints from './sections/FrictionPoints';
import OpportunityMatrix from './sections/OpportunityMatrix';
import QuickWins from './sections/QuickWins';
import ROICalculator from './sections/ROICalculator';
import BigSwings from './sections/BigSwings';
import Roadmap from './sections/Roadmap';
import NextSteps from './sections/NextSteps';
import Footer from './sections/Footer';

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-teal border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400 text-sm">Loading report...</p>
      </div>
    </div>
  );
}

export default function AuditReport() {
  const { clientSlug } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    import(`../clients/${clientSlug}.js`)
      .then(mod => setData(mod.clientData))
      .catch(() => setError(true));
  }, [clientSlug]);

  if (error) return <NotFound />;
  if (!data) return <LoadingScreen />;

  return (
    <>
      <Hero data={data} />
      <StickyNav />
      <OverviewStats data={data} />
      <ProcessMaps processes={data.processes} />
      <FrictionPoints frictionPoints={data.frictionPoints} />
      <OpportunityMatrix opportunities={data.opportunities} />
      <QuickWins quickWins={data.quickWinDetails} />
      <ROICalculator config={data.roiCalculator} />
      <BigSwings bigSwings={data.opportunities.bigSwings} deprioritize={data.opportunities.deprioritize} />
      <Roadmap phases={data.roadmap} />
      <NextSteps data={data.nextSteps} clientName={data.clientName} />
      <Footer clientName={data.clientName} auditDate={data.auditDate} />
    </>
  );
}
