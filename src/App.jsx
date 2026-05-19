import { Link } from 'react-router'
import { DEMO_USER_ID } from './constants'

function App() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center px-6">
      <div className="text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-purple-400/80">
          Bienvenido a
        </p>
        <h1 className="font-display text-5xl font-bold gradient-text">Postify</h1>
        <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">
          Comparte momentos, conecta con amigos y descubre lo que está pasando.
        </p>
      </div>

      <div className="mt-12 flex w-full max-w-xs flex-col gap-3">
        <Link
          to={`/profile/${DEMO_USER_ID}`}
          className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:opacity-95 active:scale-[0.98]"
        >
          Ver perfil demo
        </Link>
        <Link
          to="/home"
          className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-medium text-zinc-300 transition hover:bg-white/10"
        >
          Explorar inicio
        </Link>
      </div>

      <p className="mt-16 text-xs text-zinc-600">
        Universidad · Proyecto Postify
      </p>
    </div>
  )
}

export default App
