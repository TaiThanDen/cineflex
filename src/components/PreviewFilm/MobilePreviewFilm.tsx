import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { unifiedData } from "../data/mockdata";
import MovieInfoCard from "../MovieInfoCard";
import CommentSection from "../CommentSection";
import RecommendedList from "../RecommendedList";
import SeasonEpisodeMiniList from "../SeasonEpisodeMiniList";
import Tabs from "../Tabs";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

const data = [
  {
    season: 1,
    episodes: [
      { title: "Tập 1" },
      { title: "Tập 2" },
      { title: "Tập 3" },
      { title: "Tập 4" },
      { title: "Tập 5" },
    ],
  },
];

const MobilePreviewFilm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = unifiedData.find((m) => m.id === id);

  const [currentSeason, setCurrentSeason] = useState(0);
  const [currentEpisode, setCurrentEpisode] = useState(0);

  if (!movie) {
    return (
      <div className="text-white text-center py-20">
        ⚠️ Movie not found with id: <b>{id}</b>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#23263a] text-white ">
      {/* Banner + Back button */}
      <div className="relative w-full h-64 mb-6">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        {/* <button
          className="absolute top-4 left-4 bg-black/60 rounded-full p-2"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="text-xl" />
        </button> */}
        <Link to="/watch">
          <button className="absolute left-1/2 -translate-x-1/2 bottom-[-28px] bg-white/20 p-4 rounded-full border-4 border-[#23263a]">
            <FaPlay className="text-3xl text-white" />
          </button>
        </Link>
      </div>

      <Tabs
        tabs={[
          {
            label: "Thông tin phim",
            key: "info",
            content: <MovieInfoCard />,
          },
          {
            label: "Tập phim",
            key: "episodes",
            content: (
              <SeasonEpisodeMiniList
                data={data}
                currentSeason={currentSeason}
                currentEpisode={currentEpisode}
                onSeasonChange={setCurrentSeason}
                onEpisodeSelect={setCurrentEpisode}
              />
            ),
          },
          {
            label: "Bình luận",
            key: "comments",
            content: <CommentSection />,
          },
          {
            label: "Đề xuất",
            key: "recommend",
            content: <RecommendedList />,
          },
        ]}
      />
    </div>
  );
};

export default MobilePreviewFilm;
