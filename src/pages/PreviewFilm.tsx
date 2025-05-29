import { useParams } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";
import SeasonEpisodeList from "../components/PreviewFilm/SeasonEpisodeList";
import { unifiedData } from "../components/data/mockdata";
import CommentSection from "../components/CommentSection";
import RecommendedList from "@/components/RecommendedList";
import MovieInfoCard from "@/components/MovieInfoCard";
import SeasonEpisodeMiniList from "@/components/SeasonEpisodeMiniList";
import { useState } from "react";
import Tabs from "@/components/Tabs";
import { useIsMobile } from "../lib/hooks/use-mobile";
import MobilePreviewFilm from "../components/PreviewFilm/MobilePreviewFilm";

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

const PreviewFilm = () => {
  const isMobile = useIsMobile();
  const { id } = useParams();
  const movie = unifiedData.find((m) => m.id === id);
  const [currentSeason, setCurrentSeason] = useState(0);
  const [currentEpisode, setCurrentEpisode] = useState(0);

  if (!movie) return <p className="text-white p-8">⚠️ Movie not found</p>;

  if (isMobile) return <MobilePreviewFilm />;

  return (
    <div className="min-h-screen bg-[#23263a] text-white">
      <HeroBanner items={[movie]}>
        <SeasonEpisodeList
          seasonsData={
            movie.seasonsData || [{ season: 1, episodes: movie.episodes || [] }]
          }
        />
      </HeroBanner>
      <div className="flex flex-col lg:flex-row gap-6 px-6 mt-6">
        {/* Info bên trái */}
        <div className="lg:w-2/4 w-full"></div>

        {/* Tập bên phải */}
        <div className="lg:w-2/4 w-full"></div>
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

export default PreviewFilm;
