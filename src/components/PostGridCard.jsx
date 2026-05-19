import { HiOutlineChatBubbleLeft, HiOutlineHeart } from 'react-icons/hi2'
import { gradientForId } from '../utils/gradients'
import { truncate } from '../utils/format'

export default function PostGridCard({ post, onClick }) {
  const gradient = gradientForId(post.id)

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative aspect-square w-full overflow-hidden rounded-lg ${gradient} transition-transform duration-200 active:scale-[0.97] hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-400 focus-visible:outline-offset-2`}
    >
      <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/10" />
      <div className="absolute inset-0 flex flex-col justify-between p-2.5">
        <p className="line-clamp-3 text-left text-xs font-medium leading-snug text-white/95 drop-shadow-sm">
          {truncate(post.description, 60) || 'Sin descripción'}
        </p>
        <div className="flex items-center gap-2 text-[10px] font-medium text-white/90">
          <span className="flex items-center gap-0.5 rounded-full bg-black/30 px-1.5 py-0.5 backdrop-blur-sm">
            <HiOutlineHeart className="h-3 w-3" />
            {post.likes_count ?? 0}
          </span>
          <span className="flex items-center gap-0.5 rounded-full bg-black/30 px-1.5 py-0.5 backdrop-blur-sm">
            <HiOutlineChatBubbleLeft className="h-3 w-3" />
            {post.comments_count ?? 0}
          </span>
        </div>
      </div>
    </button>
  )
}
