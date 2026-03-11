const typeStyles = {
  "Time Sink": "bg-orange/10 text-orange border-orange/20",
  "Quality Risk": "bg-red-100 text-red-600 border-red-200",
  "Both": "bg-amber-100 text-amber-700 border-amber-200",
};

export default function TypeBadge({ type }) {
  return (
    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border ${typeStyles[type] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
      {type}
    </span>
  );
}
