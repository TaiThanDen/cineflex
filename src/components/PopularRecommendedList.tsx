import { useQuery } from "@tanstack/react-query";
import { queryShow } from "@/lib/api";
import { Link } from "react-router-dom";
import type { ShowQuery } from "@/lib/types/ShowQuery";

interface Props {
    limit?: number;
}

// Component hiển thị phim phổ biến/mới nhất khi không có phim cụ thể để đề xuất
const PopularRecommendedList = ({ limit = 5 }: Props) => {
    // Query để lấy phim mới nhất hoặc phổ biến
    const queryObject: ShowQuery = {
        // Có thể thêm các filter khác nếu cần
    };

    const { data: popularData, isLoading } = useQuery({
        queryKey: ["popular-shows"],
        queryFn: () => queryShow(queryObject, 0, limit),
        staleTime: 10 * 60 * 1000, // Cache 10 phút
    });

    const popularShows = popularData?.data || [];

    if (isLoading || popularShows.length === 0) {
        return null;
    }

    return (
        <div className="w-full pb-4 pl-2 bg-[#23263a]">
            <h2 className="text-xl font-bold mb-4">Phổ biến</h2>
            <div className="space-y-4">
                {popularShows.map((show) => (
                    <Link
                        key={show.id}
                        to={`/preview/${show.id}`}
                        className="flex gap-3 hover:bg-gray-800/50 rounded-md p-2 transition-colors"
                    >
                        <img
                            src={show.thumbnail || "/placeholder-movie.jpg"}
                            alt={show.title}
                            className="w-20 h-28 object-cover rounded-md"
                            onError={(e) => {
                                e.currentTarget.src = "/placeholder-movie.jpg";
                            }}
                        />
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white line-clamp-2 mb-1">
                                {show.title}
                            </h3>
                            <p className="text-sm text-gray-400 mb-1">
                                {show.isSeries ? "Phim bộ" : "Phim lẻ"}
                            </p>
                            {show.releaseDate && (
                                <p className="text-xs text-gray-500">
                                    {new Date(show.releaseDate).getFullYear()}
                                </p>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default PopularRecommendedList;
