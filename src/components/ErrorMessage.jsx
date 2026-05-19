import { HiOutlineExclamationTriangle } from 'react-icons/hi2'

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
        <HiOutlineExclamationTriangle className="h-7 w-7" />
      </div>
      <div>
        <p className="font-medium text-zinc-200">Algo salió mal</p>
        <p className="mt-1 text-sm text-zinc-500">{message}</p>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-xl bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/15"
        >
          Reintentar
        </button>
      )}
    </div>
  )
}
