import { brand } from '../../theme';

export default function Footer({ clientName, auditDate }) {
  return (
    <footer className="bg-dark-slate text-gray-400 py-10 px-4 text-center text-sm">
      <p className="mb-1">
        Prepared by <span className="text-white font-semibold">Bell AI Solutions</span> for{" "}
        <span className="text-white">{clientName}</span>
      </p>
      <p className="mb-3">{auditDate}</p>
      <p className="text-xs text-gray-500 mb-4">
        This document is confidential and intended solely for the named recipient.
      </p>
      <p className="text-teal text-xs font-medium italic">{brand.tagline}</p>
    </footer>
  );
}
