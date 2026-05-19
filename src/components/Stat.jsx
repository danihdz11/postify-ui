export default function Stat({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-lg font-bold text-white">{value}</span>
      <span className="text-xs text-zinc-500">{label}</span>
    </div>
  )
}
