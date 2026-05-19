export default function Avatar({ initials, size = 'lg', ring = false }) {
  const sizes = {
    sm: 'h-9 w-9 text-xs',
    md: 'h-14 w-14 text-sm',
    lg: 'h-20 w-20 text-xl',
    xl: 'h-24 w-24 text-2xl',
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-fuchsia-500 to-orange-400 font-semibold text-white shadow-lg shadow-purple-500/25 ${sizes[size]} ${
        ring ? 'ring-4 ring-purple-500/30 ring-offset-2 ring-offset-[#0c0c0f]' : ''
      }`}
    >
      {initials}
    </div>
  )
}
