import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MovieGrid from "../../components/admin/MovieManagerComponent/MovieGrid";
import MovieDetail from "../../components/admin/MovieManagerComponent/MovieDetail";
import EditEpisodeModal from "../../components/admin/MovieManagerComponent/EditEpisodeModal";

const initialMovieData = [
  {
    id: "1",
    title: "Breaking Bad",
    poster:
      "https://scontent.fsgn5-10.fna.fbcdn.net/v/t1.15752-9/495076856_689828353898141_1690583717271447443_n.png?stp=dst-png_s480x480&_nc_cat=110&ccb=1-7&_nc_sid=0024fc&_nc_ohc=N6JZt30xydcQ7kNvwFnFtPp&_nc_oc=AdmK1THskI1yed9b3rCzhTvJ1NJvcNbFehsnZPX66KlLPWW9Q8pWgQikisva3QAWGvuttMJMtHxWj8P7Ffbtbha7&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fsgn5-10.fna&oh=03_Q7cD2gGbnIzolMQfcJYTsLKnu_kLWjWB98Sh4aW2b6mMsu7HLg&oe=687251A4",
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
          {
            id: "2",
            name: "Cat's in the Bag...",
            url: "https://cineflex.com/episode2",
            duration: "48 phút",
          },
        ],
      },
      {
        seasonNumber: 2,
        episodes: [
          {
            id: "1",
            name: "Seven Thirty-Seven",
            url: "https://cineflex.com/breaking-bad/s2e1",
            duration: "47 phút",
          },
          {
            id: "2",
            name: "Grilled",
            url: "https://cineflex.com/breaking-bad/s2e2",
            duration: "50 phút",
          },
        ],
      },
    ],
    tags: ["Hành động", "Drama", "Crime"],
    description:
      "Walter White, a chemistry teacher, discovers he has cancer and resorts to making meth to secure his family's future.",
  },
  {
    id: "2",
    title: "Stranger Things",
    poster:
      "https://upload.wikimedia.org/wikipedia/vi/7/78/Stranger_Things_season_4.jpg",
    seasons: [
      {
        seasonNumber: 1,
        episodes: [
          {
            id: "1",
            name: "The Vanishing of Will Byers",
            url: "https://cineflex.com/stranger-things/s1e1",
            duration: "47 phút",
          },
          {
            id: "2",
            name: "The Weirdo on Maple Street",
            url: "https://cineflex.com/stranger-things/s1e2",
            duration: "55 phút",
          },
        ],
      },
    ],
    tags: ["Kinh dị", "Khoa học viễn tưởng", "Giật gân"],
    description:
      "Ở thị trấn Hawkins năm 1983, một cậu bé biến mất bí ẩn. Bạn bè, gia đình và cảnh sát phải đối mặt với những thế lực siêu nhiên để tìm ra sự thật.",
  },
  {
    id: "3",
    title: "Money Heist",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZjkxZWJiNTUtYjQwYS00MTBlLTgwODQtM2FkNWMyMjMwOGZiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    seasons: [
      {
        seasonNumber: 1,
        episodes: [
          {
            id: "1",
            name: "Efectuar lo acordado",
            url: "https://cineflex.com/money-heist/s1e1",
            duration: "47 phút",
          },
          {
            id: "2",
            name: "Imprudencias letales",
            url: "https://cineflex.com/money-heist/s1e2",
            duration: "41 phút",
          },
        ],
      },
    ],
    tags: ["Hành động", "Giật gân", "Tội phạm"],
    description:
      "Một nhóm tội phạm lên kế hoạch và thực hiện vụ cướp lớn nhất lịch sử Tây Ban Nha dưới sự chỉ đạo của 'The Professor'.",
  },
  {
    id: "4",
    title: "The Queen's Gambit",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMmRlNjQxNWQtMjk1OS00N2QxLTk0YWQtMzRhYjY5YTFhNjMxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    seasons: [
      {
        seasonNumber: 1,
        episodes: [
          {
            id: "1",
            name: "Openings",
            url: "https://cineflex.com/queens-gambit/s1e1",
            duration: "59 phút",
          },
          {
            id: "2",
            name: "Exchanges",
            url: "https://cineflex.com/queens-gambit/s1e2",
            duration: "65 phút",
          },
        ],
      },
    ],
    tags: ["Drama", "Thể thao", "Tâm lý"],
    description:
      "Một cô gái mồ côi trở thành thiên tài cờ vua nhưng phải chiến đấu với chứng nghiện và các thử thách tâm lý.",
  },
  {
    id: "5",
    title: "Naruto",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/9/94/NarutoCoverTankobon1.jpg",
    seasons: [
      {
        seasonNumber: 1,
        episodes: [
          {
            id: "1",
            name: "Enter: Naruto Uzumaki!",
            url: "https://cineflex.com/naruto/s1e1",
            duration: "23 phút",
          },
        ],
      },
    ],
    tags: ["Anime", "Hành động", "Phiêu lưu"],
    description:
      "Naruto là một ninja trẻ tuổi luôn khao khát được công nhận và trở thành Hokage.",
  },
];

export default function MovieAdminPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  // State quản lý page (list/detail), id phim đang xem, popup, tập đang edit...
  const [page, setPage] = useState<"list" | "detail">("list");
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [editEpisode, setEditEpisode] = useState<{
    movieId: string;
    seasonIdx: number;
    episodeIdx: number;
  } | null>(null);
  const [movieData, setMovieData] = useState(initialMovieData);

  // Hàm chọn phim
  const handleSelectMovie = (movieId: string) => {
    navigate(`/admin/movies/${movieId}`);
  };

  // Hàm quay lại danh sách
  const handleBackToList = () => {
    setSelectedMovieId(null);
    setPage("list");
  };

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
  const selectedMovie = movieData.find((m) => m.id === id);

  // Lấy tập đang edit (nếu có)
  let episodeEditData = null;
  if (editEpisode) {
    const m = movieData.find((m) => m.id === editEpisode.movieId);
    if (m) {
      const s = m.seasons[editEpisode.seasonIdx];
      const e = s.episodes[editEpisode.episodeIdx];
      episodeEditData = { ...e };
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
        />
      )}
      {/* Popup chỉnh sửa tập phim */}
      {editEpisode && episodeEditData && (
        <EditEpisodeModal episode={episodeEditData} onClose={handleCloseEdit} />
      )}
    </div>
  );
}
