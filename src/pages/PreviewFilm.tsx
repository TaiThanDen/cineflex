import { useParams } from "react-router";
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
import { useQueries } from "@tanstack/react-query";
import { getSeasonsByShowId, getShowById } from "@/lib/api";

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

  const result = useQueries({
    queries: [
      {
        queryKey: ['show', id],
        queryFn: () => getShowById(id!),
        enabled: !!id
      },
      {
        queryKey: ['seasons_of_show', id],
        queryFn: () => getSeasonsByShowId(id!),
        enabled: !!id
      }
    ]
  })

  const [showResult, seasonResult] = result;


  const movie = unifiedData.find((m) => m.id === 'desperate-mrs-seonju');
  const [currentSeason, setCurrentSeason] = useState(0);
  const [currentEpisode, setCurrentEpisode] = useState(0);

  if (showResult.isLoading || seasonResult.isLoading) return <p>Loading data</p>;

  if (showResult.isError || seasonResult.isError) return <p>Error</p>;

  if (!movie) return <p className="text-white p-8">⚠️ Movie not found</p>;

  if (isMobile) return <MobilePreviewFilm />;

  seasonResult.data?.sort((a, b) => a.releaseDate.localeCompare(b.releaseDate))

  return (
    <div className="min-h-screen bg-[#23263a] text-white">
      <HeroBanner items={[showResult.data!]}>
        <SeasonEpisodeList
          seasons={
            seasonResult.data!
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
