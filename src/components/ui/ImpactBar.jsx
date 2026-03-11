export default function ImpactBar({ value, max = 10, pills = 5, color = "bg-teal" }) {
  // Scale value into pill units (e.g., value 5 out of max 10 with 5 pills = 2.5 pills filled)
  const filled = (value / max) * pills;

  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: pills }, (_, i) => {
        const isFull = i < Math.floor(filled);
        const isHalf = !isFull && i < filled;

        return (
          <div
            key={i}
            className="relative h-2 w-5 rounded-full bg-gray-200 overflow-hidden"
          >
            {(isFull || isHalf) && (
              <div
                className={`absolute inset-0 rounded-full ${color}`}
                style={isHalf ? { width: "50%" } : undefined}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
