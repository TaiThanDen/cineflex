import { useState } from "react";
import VideoPlayer from "../components/Watch_Film/VideoPlayer";
import MovieInfoCard from "@/components/MovieInfoCard";
import CommentSection from "@/components/CommentSection";
import RecommendedList from "@/components/RecommendedList";
import SeasonEpisodeMiniList from "@/components/SeasonEpisodeMiniList";

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

function WatchFilm() {
  const [currentSeason, setCurrentSeason] = useState(0);
  const [currentEpisode, setCurrentEpisode] = useState(0);

  return (
    <div className="bg-[#23263a] min-h-screen text-white">
      <VideoPlayer />
      {/* Thông tin phim */}
      <div className="flex flex-col lg:flex-row gap-6 px-6 mt-6">
        {/* Info bên trái */}
        <div className="lg:w-2/4 w-full">
          <MovieInfoCard />
        </div>

        {/* Tập bên phải */}
        <div className="lg:w-2/4 w-full">
          <SeasonEpisodeMiniList
            data={data}
            currentSeason={currentSeason}
            currentEpisode={currentEpisode}
            onSeasonChange={(index) => setCurrentSeason(index)}
            onEpisodeSelect={(index) => setCurrentEpisode(index)}
          />
        </div>
      </div>

      {/* Comment + Đề xuất */}
      <div className="flex flex-col lg:flex-row gap-6 px-6 mt-6">
        <div className="lg:w-2/3">
          <CommentSection />
        </div>
        <div className=" w-auto lg:w-1/3">
          <RecommendedList />
        </div>
      </div>
    </div>
  );
}

export default WatchFilm;
