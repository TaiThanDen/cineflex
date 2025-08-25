import { useEffect, useState } from "react";
import { getTopFavorites, getFavoriteCount } from "@/lib/api";
import type { Show } from "@/lib/types/Show";
import { Link } from "react-router";
import { Heart } from "lucide-react";

const RankingFavoriteMovies = () => {
    const [topMovies, setTopMovies] = useState<Show[]>([]);

    useEffect(() => {
        const fetchTopMovies = async () => {
            try {
                const rsp = await getTopFavorites(0, 10);
                const items = rsp.data || [];

                const counts = await Promise.all(
                    items.map(async (m) => {
                        try {
                            const id = (m as any).id;
                            if (!id) return undefined;
                            return await getFavoriteCount(id);
                        } catch {
                            return undefined;
                        }
                    })
                );

                const merged = items.map((m, i) => {
                    const fav = typeof counts[i] === "number" ? counts[i] : (m as any).favoriteCount;
                    return { ...m, favoriteCount: typeof fav === "number" ? fav : 0 };
                });

                setTopMovies(merged);
            } catch (error) {
                console.error("Không lấy được phim :", error);
            }
        };
        fetchTopMovies();
    }, []);

    return (
        <div className="bg-[#23263a] text-white p-4 sm:p-6 flex flex-col gap-4 w-full">
            <div className="px-4 mb-3">
                <h2 className="text-3xl font-bold ">Những bộ phim được yêu thích nhất thời đại</h2>
            </div>

            <div className="overflow-x-auto scrollbar-hide scroll-smooth">
                <div className="flex w-max gap-4 px-4 pb-5">
                    {topMovies.map((movie, idx) => {
                        const typeLabel = movie.isSeries ? "Phim bộ" : "Phim lẻ";
                        const statusLabel = movie.onGoing ? "Đang chiếu" : "Hoàn thành";
                        const favCount = (movie as any).favoriteCount ?? 0;
                        return (
                            <div key={movie.id} className="w-[160px] sm:w-[270px] md:w-[350px] cursor-pointer">
                                <Link to={`/preview/${movie.id}`} className="group block">
                                    <div className="rounded-lg overflow-hidden border-2 border-transparent group-hover:border-purple-300 transition-all duration-200">
                                        {/* Thumbnail + Favorite Count*/}
                                        <div className="relative">
                                            <img
                                                src={movie.thumbnail}
                                                alt={movie.title}
                                                className="w-full h-[450px] object-cover rounded-lg mb-2 group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute bottom-2 left-36 bg-[#2ca35d] text-white text-md px-2 py-1 rounded-lg ">
                                                <span><Heart className="inline-block w-6 h-6 mr-1" />{favCount}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Info*/}
                                    <div className="mt-3 md:w-[350px] w-auto flex items-start gap-3">
                                        {/* Rank */}
                                        <div className="w-auto text-6xl font-extrabold leading-none text-purple-300 select-none ">
                                            {idx + 1}
                                        </div>

                                        <div className="flex-1">
                                            <div className="text-md font-semibold line-clamp-2">{movie.title}</div>

                                            {/* Age rating + Year */}
                                            <div className="text-sm text-white/60 mt-1">
                                                {movie.ageRating}
                                                <span className="px-1">·</span>
                                                {movie.releaseDate && (
                                                    <span>{new Date(movie.releaseDate).getFullYear()}</span>
                                                )}
                                            </div>

                                            {/* Type + Status */}
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                <span className="text-xs py-0.5 border border-white/10 rounded-full px-2 ">
                                                    {typeLabel}
                                                </span>
                                                <span className="text-xs border border-white/10 rounded-full px-2 py-0.5">
                                                    {statusLabel}
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

export default RankingFavoriteMovies;