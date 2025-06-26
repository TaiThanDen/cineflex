import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import MovieGrid from "../../components/admin/MovieManagerComponent/MovieGrid";
import MovieDetail from "../../components/admin/MovieManagerComponent/MovieDetail";
import EditEpisodeModal from "../../components/admin/MovieManagerComponent/EditEpisodeModal";
import { useAllMoviesData, useMovieDetails } from "@/lib/hooks/useMovieData";

export default function MovieAdminPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Sử dụng custom hook để lấy tất cả dữ liệu phim
  const {
    data: moviesData,
    isLoading: isLoadingMovies,
    error: moviesError,
    isError: isMoviesError,
  } = useAllMoviesData();
  // Sử dụng hook riêng để lấy chi tiết phim khi đang xem detail
  const {
    isLoading: isLoadingDetail,
    error: detailError,
    isError: isDetailError,
  } = useMovieDetails(id);

  // State quản lý popup edit episode
  const [editEpisode, setEditEpisode] = useState<{
    movieId: string;
    seasonIdx: number;
    episodeIdx: number;
  } | null>(null);

  // Xử lý trạng thái loading
  if (isLoadingMovies || (id && isLoadingDetail)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">
            {id ? "Đang tải chi tiết phim..." : "Đang tải danh sách phim..."}
          </p>
        </div>
      </div>
    );
  }

  // Xử lý trạng thái lỗi
  if (isMoviesError || (id && isDetailError)) {
    const currentError = moviesError || detailError;
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Lỗi tải dữ liệu
          </h2>
          <p className="text-gray-600 mb-4">
            {currentError?.message ||
              "Không thể tải dữ liệu phim. Vui lòng thử lại."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }
  // Mock data để fallback khi API không có dữ liệu
  const initialMovieData = [
    {
      id: "1",
      title: "Breaking Bad",
      poster: "https://via.placeholder.com/300x400",
      thumbnail: "https://via.placeholder.com/300x400",
      seasons: [
        {
          seasonNumber: 1,
          episodes: [
            {
              id: "1",
              name: "Pilot",
              url: "https://cineflex.com/pilot",
              duration: "58 phút",
            },
          ],
        },
      ],
      tags: ["Drama", "Crime"],
      genres: [
        { id: "1", name: "Drama" },
        { id: "2", name: "Crime" },
        { id: "3", name: "Thriller" },
      ],
      description:
        "Walter White, a chemistry teacher, discovers he has cancer and resorts to making meth.",
    },
    {
      id: "2",
      title: "Stranger Things",
      poster: "https://via.placeholder.com/300x400",
      thumbnail: "https://via.placeholder.com/300x400",
      seasons: [
        {
          seasonNumber: 1,
          episodes: [
            {
              id: "1",
              name: "The Vanishing of Will Byers",
              url: "https://cineflex.com/st1",
              duration: "47 phút",
            },
          ],
        },
      ],
      tags: ["Sci-Fi", "Horror"],
      genres: [
        { id: "4", name: "Sci-Fi" },
        { id: "5", name: "Horror" },
        { id: "6", name: "Mystery" },
        { id: "7", name: "Adventure" },
      ],
      description:
        "When a young boy vanishes, a small town uncovers a mystery involving secret experiments.",
    },
  ];

  // Sử dụng dữ liệu từ API hoặc fallback về mock data
  const movieData = moviesData || initialMovieData;

  // Hàm chọn phim
  const handleSelectMovie = (movieId: string) => {
    navigate(`/admin/movies/${movieId}`);
  };

  // Hàm quay lại danh sách

  // Hàm mở popup edit
  const handleEditEpisode = (
    movieId: string,
    seasonIdx: number,
    episodeIdx: number
  ) => {
    setEditEpisode({ movieId, seasonIdx, episodeIdx });
  };

  // Hàm đóng popup
  const handleCloseEdit = () => {
    setEditEpisode(null);
  };
  // Lấy movie đang xem (nếu ở trang detail)
  const selectedMovie = movieData.find((m: any) => m.id === id);
  // Lấy tập đang edit (nếu có)
  let episodeEditData = null;
  if (editEpisode) {
    const m = movieData.find((m: any) => m.id === editEpisode.movieId);
    if (m && m.seasons && m.seasons.length > editEpisode.seasonIdx) {
      const s = m.seasons[editEpisode.seasonIdx];
      if (s && s.episodes && s.episodes.length > editEpisode.episodeIdx) {
        const e = s.episodes[editEpisode.episodeIdx];
        // Transform dữ liệu để match với interface của EditEpisodeModal
        episodeEditData = {
          name:
            (e as any).name ||
            (e as any).title ||
            `Episode ${editEpisode.episodeIdx + 1}`,
          url: e.url || "",
          duration:
            typeof e.duration === "number"
              ? `${e.duration} phút`
              : e.duration || "0 phút",
        };
      }
    }
  }

  return (
    <div>
      {!id && (
        <MovieGrid movies={movieData} onSelectMovie={handleSelectMovie} />
      )}
      {id && selectedMovie && (
        <MovieDetail
          movie={selectedMovie}
          onBack={() => navigate("/admin/movies")}
          onEditEpisode={handleEditEpisode}
          onDeleteMovie={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      )}
      {/* Popup chỉnh sửa tập phim */}
      {editEpisode && episodeEditData && (
        <EditEpisodeModal episode={episodeEditData} onClose={handleCloseEdit} />
      )}
    </div>
  );
}
