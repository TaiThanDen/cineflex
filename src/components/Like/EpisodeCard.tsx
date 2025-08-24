import type { Episode } from "@/lib/types/Episode";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getSeasonById, getShowById } from "@/lib/api";

interface Props {
    episode: Episode;
}

const EpisodeCard = ({ episode }: Props) => {
    const seasonResult = useQuery({
        queryKey: ["season", episode.season],
        queryFn: () => getSeasonById(episode.season),
        enabled: !!episode.season,
    });

    const showId = seasonResult.data?.show;
    const showResult = useQuery({
        queryKey: ["show", showId],
        queryFn: () => getShowById(showId as string),
        enabled: !!showId,
    });

    const showTitle = showResult.data?.title ?? "Loading...";
    const seasonTitle = seasonResult.data?.title ?? "Loading...";

    return (
        <div className="bg-[#2f3147] rounded-xl overflow-hidden relative">
            <div className="h-56 overflow-hidden">
                <img
                    src={`https://image.mux.com/${episode.url}/thumbnail.png?width=600&height=400&time=10`}
                    alt={episode.title ?? "thumbnail"}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 line-clamp-1">
                    {episode.title} - {seasonTitle}
                </h3>
                <p className="text-sm text-gray-300 mb-2 line-clamp-1">
                    Tên phim: {showTitle}
                </p>
                {episode.description && (
                    <p className="text-sm text-gray-400  line-clamp-2">
                        Miêu tả tập: {episode.description}
                    </p>
                )}
            </div>

            <div className="px-4 py-1">
                <div className="flex justify-start text-xs text-gray-300 mb-1 gap-1">
                    <span>Thời lượng:</span>
                    <span>{Math.trunc((episode.duration ?? 0) / 60)} phút</span>
                </div>
            </div>

            <div className="p-4">
                <Link to={`/watch/${episode.id}`}>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm transition-colors">
                        Xem
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default EpisodeCard;