import { getShowById } from "@/lib/api"
import type { Show } from "@/lib/types/Show"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router"

interface Props {
  showId: string
}

const FavoriteCard = ({ showId }: Props) => {
  const showResult = useQuery<Show>({
    queryKey: ["show", showId],
    queryFn: () => getShowById(showId),
    enabled: !!showId,
  })

  return (
    <div className="bg-[#2f3147] rounded-xl overflow-hidden relative">
      {/* Thumbnail */}
      <div className="h-56 overflow-hidden">
        <img
          src={showResult.data?.thumbnail ?? "/placeholder.png"}
          alt={showResult.data?.title ?? "Loading..."}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-xl font-semibold line-clamp-1">
          {showResult.data?.title ?? "Loading..."}
        </h3>
        <p className="text-sm text-gray-400 mb-3 line-clamp-3">
          {showResult.data?.description ?? "Đang tải..."}
        </p>
        <p className="text-xs text-gray-500">
          {showResult.data?.releaseDate
            ? new Date(showResult.data.releaseDate).getFullYear()
            : ""}
        </p>
      </div>

      {/* Action */}
      <div className="p-4">
        <Link to={`/preview/${showId}`}>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm">
            Xem chi tiết
          </button>
        </Link>
      </div>
    </div>
  )
}

export default FavoriteCard
