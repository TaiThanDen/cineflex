import { useQuery } from "@tanstack/react-query";
import { getAllShows } from "@/lib/api";

export default function SimpleMovieList() {
  // Cách sử dụng useQuery cơ bản
  const {
    data: movies, // Dữ liệu trả về từ API
    isLoading, // Trạng thái đang tải
    error, // Lỗi nếu có
    isError, // Boolean cho biết có lỗi hay không
    refetch, // Hàm để fetch lại dữ liệu
    isFetching, // Trạng thái đang fetch (kể cả refetch)
  } = useQuery({
    queryKey: ["movies"], // Key duy nhất cho query này
    queryFn: getAllShows, // Hàm fetch data
    staleTime: 5 * 60 * 1000, // Dữ liệu "fresh" trong 5 phút
    gcTime: 10 * 60 * 1000, // Cache trong 10 phút
    retry: 3, // Thử lại 3 lần nếu lỗi
    retryDelay: 1000, // Delay giữa các lần retry
    refetchOnWindowFocus: false, // Không fetch lại khi focus window
    refetchOnMount: true, // Fetch lại khi component mount
  });

  // Xử lý trạng thái loading
  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Xử lý trạng thái lỗi
  if (isError) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong className="font-bold">Lỗi!</strong>
          <span className="block sm:inline"> {error?.message}</span>
          <button
            onClick={() => refetch()}
            className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  // Hiển thị dữ liệu
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Danh sách phim</h2>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {isFetching ? "Đang tải..." : "Làm mới"}
        </button>
      </div>

      {movies && movies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <div key={movie.id} className="border rounded-lg p-4 shadow-sm">
              <img
                src={movie.thumbnail}
                alt={movie.title}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <h3 className="font-bold text-lg mb-2">{movie.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{movie.description}</p>
              <div className="text-xs text-gray-500">
                <p>
                  Phát hành: {new Date(movie.releaseDate).toLocaleDateString()}
                </p>
                <p>Tuổi: {movie.ageRating}</p>
                <p>Loại: {movie.isSeries ? "Phim bộ" : "Phim lẻ"}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">Không có phim nào</div>
      )}
    </div>
  );
}

// Ví dụ sử dụng useQuery với params
export function MovieDetail({ movieId }: { movieId: string }) {
  const {
    data: movie,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movie", movieId], // Key có thể là array với params
    queryFn: async () => {
      const { getShowById } = await import("@/lib/api");
      return getShowById(movieId);
    },
    enabled: !!movieId, // Chỉ chạy khi có movieId
  });

  if (isLoading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error.message}</div>;
  if (!movie) return <div>Không tìm thấy phim</div>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
    </div>
  );
}

// Ví dụ sử dụng useQuery với mutation (thêm/sửa/xóa)
export function MovieActions() {
  const { refetch } = useQuery({
    queryKey: ["movies"],
    queryFn: getAllShows,
  });

  const handleAddMovie = async () => {
    try {
      // Thực hiện thêm phim qua API
      // const newMovie = await addMovie(movieData);

      // Sau khi thêm thành công, refetch lại danh sách
      refetch();
    } catch (error) {
      console.error("Lỗi thêm phim:", error);
    }
  };

  return (
    <div>
      <button onClick={handleAddMovie}>Thêm phim</button>
      {/* Hiển thị danh sách phim */}
    </div>
  );
}
