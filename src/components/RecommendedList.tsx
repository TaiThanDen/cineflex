import { useQuery } from "@tanstack/react-query";
import { getGenresByShow, queryShow } from "@/lib/api";
import { Link } from "react-router-dom";
import type { ShowQuery } from "@/lib/types/ShowQuery";
import PopularRecommendedList from "./PopularRecommendedList";

interface Props {
  currentShowId?: string; // ID của phim hiện tại để lọc ra khỏi danh sách đề xuất
  limit?: number; // Số lượng phim đề xuất tối đa
}

const RecommendedList = ({ currentShowId, limit = 5 }: Props) => {
  // Nếu không có showId, hiển thị phim phổ biến
  if (!currentShowId) {
    return <PopularRecommendedList limit={limit} />;
  }
  // Lấy thể loại của phim hiện tại
  const { data: currentShowGenres, isLoading: genresLoading } = useQuery({
    queryKey: ["show-genres", currentShowId],
    queryFn: () => currentShowId ? getGenresByShow(currentShowId) : Promise.resolve([]),
    enabled: !!currentShowId,
  });

  // Tạo query object để tìm phim cùng thể loại
  const queryObject: ShowQuery = {
    genres: currentShowGenres?.map(genre => genre.name) || [],
  };

  // Lấy danh sách phim cùng thể loại
  const { data: recommendedData, isLoading: showsLoading } = useQuery({
    queryKey: ["recommended-shows", currentShowGenres?.map(g => g.name).join(",")],
    queryFn: () => queryShow(queryObject, 0, limit + 2), // Lấy thêm 2 phim để lọc trùng
    enabled: !!currentShowGenres && currentShowGenres.length > 0,
    staleTime: 5 * 60 * 1000, // Cache 5 phút
  });

  // Lọc ra phim hiện tại và giới hạn số lượng
  const recommendedShows = recommendedData?.data
    ?.filter(show => show.id !== currentShowId)
    ?.slice(0, limit) || [];

  const isLoading = genresLoading || showsLoading;

  // Nếu không có đề xuất, fallback sang phim phổ biến
  if (!isLoading && recommendedShows.length === 0) {
    return <PopularRecommendedList limit={limit} />;
  }

  return (
    <div className="w-full pb-4 pl-2 bg-[#23263a]">
      <h2 className="text-xl font-bold mb-4">Đề xuất cho bạn</h2>
      <div className="space-y-4">
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="flex gap-3 animate-pulse">
              <div className="w-20 h-28 bg-gray-700 rounded-md"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-600 rounded w-2/3"></div>
              </div>
            </div>
          ))
        ) : (
          recommendedShows.map((show) => (
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
                  {currentShowGenres?.slice(0, 2).map(g => g.name).join(" • ")}
                </p>
                {show.releaseDate && (
                  <p className="text-xs text-gray-500">
                    {new Date(show.releaseDate).getFullYear()}
                  </p>
                )}
              </div>
            </Link>
          ))
        )}

        {!isLoading && recommendedShows.length === 0 && (
          <div className="text-gray-400 text-sm py-4 text-center">
            Không có phim đề xuất
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendedList;
