import { useNavigate, useParams } from 'react-router'
import {
  HiOutlineArrowLeft,
  HiOutlineChatBubbleLeft,
  HiOutlineHeart,
} from 'react-icons/hi2'
import AppLayout from '../components/AppLayout'
import Avatar from '../components/Avatar'
import ErrorMessage from '../components/ErrorMessage'
import LoadingScreen from '../components/LoadingScreen'
import useFetch from '../hooks/useFetch'
import { formatDate, formatRelative, getInitials, shortId } from '../utils/format'
import { gradientForId } from '../utils/gradients'

function PostDetail() {
  const { postId } = useParams()
  const navigate = useNavigate()
  const url = `http://localhost:8000/posts/${postId}`
  const { data, loading, error } = useFetch(url)

  if (loading) {
    return (
      <AppLayout showNav={false}>
        <LoadingScreen message="Cargando publicación..." />
      </AppLayout>
    )
  }

  if (error) {
    return (
      <AppLayout showNav={false}>
        <ErrorMessage message={error} onRetry={() => navigate(-1)} />
      </AppLayout>
    )
  }

  if (!data?.id) {
    return null
  }

  const likes = data.likes ?? []
  const comments = data.comments ?? []
  const gradient = gradientForId(data.id)

  return (
    <AppLayout showNav={false}>
      <header className="sticky top-0 z-40 glass border-b border-white/5">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-zinc-300 transition hover:bg-white/10 hover:text-white"
            aria-label="Volver"
          >
            <HiOutlineArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="font-display text-base font-bold text-white">Publicación</h1>
            <p className="text-xs text-zinc-500">#{shortId(data.id)}</p>
          </div>
        </div>
      </header>

      <article className="flex flex-col gap-4 px-4 py-5">
        <div className={`overflow-hidden rounded-2xl ${gradient} p-[1px] shadow-xl shadow-purple-500/10`}>
          <div className="rounded-2xl bg-[#14141a] p-5">
            <p className="text-base leading-relaxed text-zinc-100 whitespace-pre-wrap">
              {data.description}
            </p>
            <p className="mt-4 text-xs text-zinc-500">
              {formatDate(data.created_at)}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex flex-1 items-center gap-2 rounded-2xl bg-white/5 px-4 py-3">
            <HiOutlineHeart className="h-5 w-5 text-fuchsia-400" />
            <div>
              <p className="text-lg font-bold text-white">{likes.length}</p>
              <p className="text-xs text-zinc-500">Me gusta</p>
            </div>
          </div>
          <div className="flex flex-1 items-center gap-2 rounded-2xl bg-white/5 px-4 py-3">
            <HiOutlineChatBubbleLeft className="h-5 w-5 text-purple-400" />
            <div>
              <p className="text-lg font-bold text-white">{comments.length}</p>
              <p className="text-xs text-zinc-500">Comentarios</p>
            </div>
          </div>
        </div>

        {likes.length > 0 && (
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Me gusta
            </h2>
            <ul className="flex flex-col gap-2">
              {likes.map((like) => (
                <li
                  key={`${like.user_id}-${like.created_at}`}
                  className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3"
                >
                  <Avatar initials="♥" size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-zinc-200">
                      {shortId(like.user_id)}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {formatRelative(like.created_at)}
                    </p>
                  </div>
                  <HiOutlineHeart className="h-4 w-4 shrink-0 text-fuchsia-400" />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Comentarios
          </h2>
          {comments.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {comments.map((comment) => (
                <li
                  key={comment.id}
                  className="rounded-xl bg-white/5 p-4"
                >
                  <div className="flex gap-3">
                    <Avatar
                      initials={getInitials('U', 's')}
                      size="sm"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-purple-300/90">
                        usuario_{shortId(comment.user_id)}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-200">
                        {comment.content}
                      </p>
                      <p className="mt-2 text-xs text-zinc-600">
                        {formatRelative(comment.created_at)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-xl border border-dashed border-white/10 py-10 text-center">
              <HiOutlineChatBubbleLeft className="mx-auto h-8 w-8 text-zinc-600" />
              <p className="mt-2 text-sm text-zinc-500">Sin comentarios aún</p>
              <p className="text-xs text-zinc-600">Sé el primero en comentar</p>
            </div>
          )}
        </section>
      </article>
    </AppLayout>
  )
}

export default PostDetail
