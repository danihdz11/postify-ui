export default function LoadingScreen({ message = 'Cargando...' }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-2 border-purple-500/20" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-purple-400 border-r-fuchsia-400" />
      </div>
      <p className="text-sm text-zinc-500">{message}</p>
    </div>
  )
}
