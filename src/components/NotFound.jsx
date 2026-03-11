import { ArrowLeft } from 'lucide-react';
import { brand } from '../theme';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy text-white px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-2">Report not found</p>
        <p className="text-gray-500 mb-8">
          This link is probably wrong or hasn't been published yet.
        </p>
        <p className="text-teal text-sm italic">{brand.tagline}</p>
      </div>
    </div>
  );
}
