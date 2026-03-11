export default function ImpactBar({ value, max = 5, color = "bg-teal" }) {
  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: max }, (_, i) => (
        <div
          key={i}
          className={`h-2 w-5 rounded-full ${i < value ? color : "bg-gray-200"}`}
        />
      ))}
    </div>
  );
}
