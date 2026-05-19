import { useLocation, useNavigate, useParams } from 'react-router'
import { DEMO_USER_ID } from '../constants'
import {
  HiOutlineHome,
  HiOutlineMagnifyingGlass,
  HiOutlinePaperAirplane,
  HiOutlinePlay,
  HiOutlineUser,
} from 'react-icons/hi2'

const NAV_ITEMS = [
  { icon: HiOutlineHome, path: '/home', label: 'Inicio' },
  { icon: HiOutlinePlay, path: '/home', label: 'Reels' },
  { icon: HiOutlinePaperAirplane, path: '/home', label: 'Mensajes' },
  { icon: HiOutlineMagnifyingGlass, path: '/home', label: 'Buscar' },
  { icon: HiOutlineUser, label: 'Perfil', profile: true },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const { userId } = useParams()

  const handleNav = (item) => {
    if (item.profile) {
      navigate(`/profile/${userId ?? DEMO_USER_ID}`)
      return
    }
    navigate(item.path ?? '/home')
  }

  const isActive = (item) => {
    if (item.profile) return location.pathname.startsWith('/profile')
    return location.pathname === item.path
  }

  return (
    <nav className="glass fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
      <ul className="flex items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const active = isActive(item)
          return (
            <li key={item.label}>
              <button
                type="button"
                onClick={() => handleNav(item)}
                aria-label={item.label}
                className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 ${
                  active
                    ? 'bg-purple-500/20 text-purple-300 scale-105'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                }`}
              >
                <Icon className="h-6 w-6" strokeWidth={active ? 2.2 : 1.8} />
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
