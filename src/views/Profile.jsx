import { useNavigate, useParams } from 'react-router'
import { HiOutlineSquares2X2 } from 'react-icons/hi2'
import AppLayout from '../components/AppLayout'
import Avatar from '../components/Avatar'
import ErrorMessage from '../components/ErrorMessage'
import LoadingScreen from '../components/LoadingScreen'
import PostGridCard from '../components/PostGridCard'
import Stat from '../components/Stat'
import useFetch from '../hooks/useFetch'
import { getInitials } from '../utils/format'

function Profile() {
  const { userId } = useParams()
  const navigate = useNavigate()
  const urlUser = `http://localhost:8000/users/${userId}`
  const urlPosts = `http://localhost:8000/users/${userId}/posts`
  const { data: user, loading: loadingUser, error: errorUser } = useFetch(urlUser)
  const { data: posts, loading: loadingPosts, error: errorPosts } = useFetch(urlPosts)

  const loading = loadingUser || loadingPosts
  const error = errorUser || errorPosts
  const postList = Array.isArray(posts) ? posts : []

  const handleGetPost = (id) => {
    navigate(`/post/${id}`)
  }

  if (loading) {
    return (
      <AppLayout>
        <LoadingScreen message="Cargando perfil..." />
      </AppLayout>
    )
  }

  if (error) {
    return (
      <AppLayout showNav={false}>
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      </AppLayout>
    )
  }

  const displayName = user?.name
    ? `${user.name} ${user.lastname ?? ''}`.trim()
    : 'Usuario'
  const username = user?.username ? `@${user.username}` : ''
  const initials = getInitials(user?.name, user?.lastname)

  return (
    <AppLayout>
      <header className="sticky top-0 z-40 glass border-b border-white/5 px-4 py-3">
        <h1 className="font-display text-center text-lg font-bold gradient-text">
          {user?.username ?? 'Postify'}
        </h1>
      </header>

      <section className="px-4 pt-6 pb-4">
        <div className="flex items-start gap-5">
          <Avatar initials={initials} size="lg" ring />
          <div className="flex flex-1 justify-around pt-1">
            <Stat value={postList.length} label="publicaciones" />
            <Stat value="—" label="seguidores" />
            <Stat value="—" label="siguiendo" />
          </div>
        </div>

        <div className="mt-4">
          <p className="font-semibold text-white">{displayName}</p>
          {username && <p className="text-sm text-zinc-500">{username}</p>}
        </div>
      </section>

      <div className="mx-4 mb-3 flex items-center gap-2 border-t border-white/5 pt-3">
        <HiOutlineSquares2X2 className="h-4 w-4 text-purple-400" />
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Publicaciones
        </span>
      </div>

      {postList.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
          <p className="text-zinc-400">Aún no hay publicaciones</p>
          <p className="mt-1 text-sm text-zinc-600">
            Cuando publiques algo, aparecerá aquí
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-1 px-1 pb-4">
          {postList.map((post) => (
            <PostGridCard
              key={post.id}
              post={post}
              onClick={() => handleGetPost(post.id)}
            />
          ))}
        </div>
      )}
    </AppLayout>
  )
}

export default Profile
