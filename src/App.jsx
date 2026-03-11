import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuditReport from './components/AuditReport';
import NotFound from './components/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:clientSlug" element={<AuditReport />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
