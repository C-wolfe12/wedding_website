interface CountdownCardProps {
  label: string;
  value: number;
}

/**
 * Countdown card component for displaying individual countdown values
 */
export default function CountdownCard({ label, value }: CountdownCardProps) {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 shadow-lg">
      <div className="text-3xl md:text-4xl font-bold text-white">{value}</div>
      <div className="text-sm md:text-base text-white/80">{label}</div>
    </div>
  );
}
