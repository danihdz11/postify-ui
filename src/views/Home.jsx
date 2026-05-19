import { Link } from 'react-router'
import { HiOutlineSparkles } from 'react-icons/hi2'
import AppLayout from '../components/AppLayout'
import { DEMO_USER_ID } from '../constants'

function Home() {
  return (
    <AppLayout>
      <header className="sticky top-0 z-40 glass border-b border-white/5 px-4 py-4">
        <h1 className="font-display text-xl font-bold gradient-text">Postify</h1>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20">
          <HiOutlineSparkles className="h-8 w-8 text-purple-400" />
        </div>
        <h2 className="font-display text-2xl font-bold text-white">
          Tu feed está por llegar
        </h2>
        <p className="mt-2 max-w-xs text-sm text-zinc-500">
          Mientras tanto, visita un perfil para ver publicaciones, likes y comentarios.
        </p>
        <Link
          to={`/profile/${DEMO_USER_ID}`}
          className="mt-8 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition hover:opacity-95"
        >
          Ir al perfil
        </Link>
      </div>
    </AppLayout>
  )
}

export default Home
