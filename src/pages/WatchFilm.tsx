import { useState } from "react";
import VideoPlayer from "../components/Watch_Film/VideoPlayer";
import MovieInfoCard from "@/components/MovieInfoCard";
import CommentSection from "@/components/CommentSection";
import RecommendedList from "@/components/RecommendedList";
import SeasonEpisodeMiniList from "@/components/SeasonEpisodeMiniList";
import Tabs from "@/components/Tabs";

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
      <VideoPlayer movieName="Big Buck Bunny S1E9" />

      {/* Tabs */}
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
}

export default WatchFilm;