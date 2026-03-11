import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const sections = [
  { id: "overview", label: "Overview" },
  { id: "process", label: "Process" },
  { id: "friction", label: "Friction" },
  { id: "matrix", label: "Opportunities" },
  { id: "quickwins", label: "Quick Wins" },
  { id: "roi", label: "ROI" },
  { id: "bigswings", label: "Big Swings" },
  { id: "roadmap", label: "Roadmap" },
  { id: "nextsteps", label: "Next Steps" },
];

export default function StickyNav() {
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-border">
      <div className="max-w-6xl mx-auto px-4">
        {/* Desktop */}
        <div className="hidden md:flex gap-1 py-2 overflow-x-auto">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`px-3 py-1.5 text-sm rounded-md whitespace-nowrap transition-colors ${
                active === id
                  ? "bg-navy text-white font-semibold"
                  : "text-slate hover:bg-light-gray"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center justify-between py-2">
          <span className="text-sm font-semibold text-navy">
            {sections.find(s => s.id === active)?.label || "Report"}
          </span>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-1">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden pb-3 flex flex-col gap-1">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`px-3 py-2 text-sm text-left rounded-md ${
                  active === id ? "bg-navy text-white font-semibold" : "text-slate"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
