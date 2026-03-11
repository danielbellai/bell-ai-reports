import { motion } from 'framer-motion';
import { FileText, ArrowRight, Shield } from 'lucide-react';
import { brand } from '../theme';

export default function Home() {
  return (
    <div className="min-h-screen bg-navy text-white flex flex-col">
      {/* Grid texture */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-teal/15 text-teal border border-teal/25 text-sm font-semibold px-4 py-1.5 rounded-full mb-8"
          >
            <FileText className="w-4 h-4" />
            Client Reports Portal
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Bell AI Reports
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-300 mb-10 max-w-lg mx-auto"
          >
            Interactive operations audits and efficiency reports prepared by{" "}
            <span className="text-teal font-semibold">Bell AI Solutions</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6 max-w-md mx-auto mb-10"
          >
            <div className="flex items-start gap-3 text-left">
              <Shield className="w-5 h-5 text-teal mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-gray-300">
                  Got a report link from us? Go straight to your unique URL to view your audit.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.a
            href="https://bellaisolutions.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-flex items-center gap-2 text-teal hover:text-teal/80 text-sm font-semibold transition-colors"
          >
            Visit bellaisolutions.com <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 text-center py-6 text-xs text-gray-500"
      >
        <p className="italic text-teal/60">{brand.tagline}</p>
      </motion.footer>
    </div>
  );
}
