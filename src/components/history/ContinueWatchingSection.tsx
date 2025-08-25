import { useEffect, useState } from "react";
import { getViewHistory, getEpisodeById, getSeasonById, getShowById } from "@/lib/api";
import { Link } from "react-router";
import { Clock, Play } from "lucide-react";

const ContinueWatchingSection = () => {
    const [enrichedHistories, setEnrichedHistories] = useState<any[]>([]);

    useEffect(() => {
        const fetchContinueWatching = async () => {
            try {
                const rsp = await getViewHistory(0, 10);
                const histories = rsp.data || [];

                // Enrich with episode, season, and show data
                const enriched = await Promise.all(
                    histories.map(async (vh) => {
                        try {
                            const episode = await getEpisodeById(vh.episode);
                            const season = await getSeasonById(episode.season);
                            const show = await getShowById(season.show);

                            return {
                                ...vh,
                                episodeData: episode,
                                seasonData: season,
                                showData: show,
                                thumbnailUrl: `https://image.mux.com/${episode.url}/thumbnail.png?width=600&height=400&time=${vh.duration}`
                            };
                        } catch (error) {
                            console.error("Lỗi khi làm giàu lịch sử xem:", error);
                            return vh;
                        }
                    })
                );

                setEnrichedHistories(enriched);
            } catch (error) {
                console.error("Không lấy được lịch sử xem:", error);
            }
        };
        fetchContinueWatching();
    }, []);

    if (enrichedHistories.length === 0) {
        return null; // Don't show section if no continue watching items
    }

    return (
        <div className="bg-[#23263a] text-white p-4 sm:p-6 flex flex-col gap-4 w-full">
            <div className="px-4 mb-2">
                <h2 className="text-4xl font-bold">Tiếp tục xem</h2>
            </div>

            <div className="overflow-x-auto scrollbar-hide scroll-smooth">
                <div className="flex w-max gap-4 px-4 pb-5">
                    {enrichedHistories.map((item) => {
                        const watchedMinutes = Math.trunc(item.duration / 60);

                        return (
                            <div key={item.episode} className="w-[160px] sm:w-[270px] md:w-[350px] cursor-pointer">
                                <Link to={`/watch/${item.episode}`} className="group block">
                                    <div className="rounded-lg overflow-hidden border-2 border-transparent group-hover:border-purple-300 transition-all duration-200">
                                        {/* Thumbnail + Progress */}
                                        <div className="relative">
                                            <img
                                                src={item.thumbnailUrl || item.showData?.thumbnail || "/default-thumbnail.jpg"}
                                                alt={item.episodeData?.title || "Episode"}
                                                className="w-auto h-[400px] object-cover rounded-lg mb-2 group-hover:scale-105 transition-transform duration-300"
                                            />

                                            {/* Play button overlay */}
                                            <div className="absolute inset-0opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                                <Play className="w-16 h-16 text-white" fill="white" />
                                            </div>

                                            {/* Watch time */}
                                            <div className="absolute bottom-4 right-2 bg-black/70 text-white text-sm px-2 py-1 rounded">
                                                <Clock className="inline-block w-4 h-4 mr-1" />
                                                {watchedMinutes}p
                                            </div>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="mt-3 md:w-[350px] w-auto flex items-start gap-3">
                                        <div className="flex-1">
                                            <div className="text-md font-semibold line-clamp-2">
                                                {item.episodeData?.title || "Episode"} - {item.seasonData?.title || "Season"}
                                            </div>

                                            {/* Show title */}
                                            <div className="text-sm text-white/60 mt-1">
                                                {item.showData?.title || "Show"}
                                            </div>

                                            {/* Progress + Type */}
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                <span className="text-xs border border-white/10 rounded-full px-2 py-0.5">
                                                    {item.showData?.isSeries ? "Phim bộ" : "Phim lẻ"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ContinueWatchingSection;