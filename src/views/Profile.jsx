import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { HiOutlinePhoto, HiOutlineSquares2X2 } from 'react-icons/hi2'
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

  const [files, setFiles] = useState([])
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const urlUser = `http://localhost:8000/users/${userId}`
  const urlPosts = `http://localhost:8000/users/${userId}/posts`
  const { data: user, loading: loadingUser, error: errorUser } = useFetch(urlUser)
  const {
    data: posts,
    loading: loadingPosts,
    error: errorPosts,
    refetch: refetchPosts,
  } = useFetch(urlPosts)

  const loading = loadingUser || loadingPosts
  const error = errorUser || errorPosts
  const postList = Array.isArray(posts) ? posts : []

  const handleGetPost = (id) => {
    navigate(`/post/${id}`)
  }

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files ?? []))
    setSubmitError(null)
  }

  const submitPost = async (e) => {
    e.preventDefault()
    setSubmitError(null)
    setSubmitting(true)

    const formData = new FormData()
    formData.append('description', description.trim() || 'Nuevo post')
    formData.append('user_id', userId)
    files.forEach((file) => {
      formData.append('files', file)
    })

    try {
      const res = await fetch('http://localhost:8000/posts/', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const detail = await res.text()
        throw new Error(detail || `Error ${res.status}`)
      }

      setDescription('')
      setFiles([])
      e.target.reset()
      refetchPosts()
    } catch (err) {
      setSubmitError(err.message || 'No se pudo publicar')
    } finally {
      setSubmitting(false)
    }
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

      <form
        name="uploadForm"
        onSubmit={submitPost}
        className="mx-4 mb-4 rounded-2xl border border-white/10 bg-white/5 p-4"
      >
        <p className="mb-3 text-sm font-semibold text-zinc-300">Nueva publicación</p>

        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          placeholder="¿Qué quieres compartir?"
          rows={3}
          className="mb-3 w-full resize-none rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/30"
        />

        <label className="mb-3 flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-white/15 bg-black/20 px-3 py-3 text-sm text-zinc-400 transition hover:border-purple-500/40 hover:text-zinc-200">
          <HiOutlinePhoto className="h-5 w-5 shrink-0 text-purple-400" />
          <span>
            {files.length > 0
              ? `${files.length} imagen${files.length > 1 ? 'es' : ''} seleccionada${files.length > 1 ? 's' : ''}`
              : 'Seleccionar imágenes (opcional)'}
          </span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="sr-only"
          />
        </label>

        {submitError && (
          <p className="mb-3 text-sm text-red-400">{submitError}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? 'Publicando...' : 'Publicar'}
        </button>
      </form>

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
            Usa el formulario de arriba para crear tu primera publicación
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
