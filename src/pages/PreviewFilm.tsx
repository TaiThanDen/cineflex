import { useParams } from "react-router";
import HeroBanner from "../components/HeroBanner";
import SeasonEpisodeList from "../components/PreviewFilm/SeasonEpisodeList";
import CommentSection from "../components/CommentSection";
import RecommendedList from "@/components/RecommendedList";
import MovieInfoCard from "@/components/MovieInfoCard";
import SeasonEpisodeMiniList from "@/components/SeasonEpisodeMiniList";
import { useState } from "react";
import Tabs from "@/components/Tabs";
import { useIsMobile } from "../lib/hooks/use-mobile";
import MobilePreviewFilm from "../components/PreviewFilm/MobilePreviewFilm";
import { useQueries } from "@tanstack/react-query";
import { getEpisodesBySeasonId, getSeasonsByShowId, getShowById } from "@/lib/api";
import type { Episode } from "@/lib/types/Episode";



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

  const episodeResult = useQueries({
    queries: (result[1]?.data ?? []).map((s) => ({
      queryFn: () => getEpisodesBySeasonId(s.id!),
      queryKey: ['episodes_of_season', s.id!],
      enabled: !!s.id,
    })),
  });

  const [showResult, seasonResult] = result;
  const isEpisodeLoading = episodeResult.some((r) => r.isLoading);
  const isEpisodeError = episodeResult.some((r) => r.isError);


  const [currentSeason, setCurrentSeason] = useState<string | undefined>(() => {
    if (seasonResult.isError || seasonResult.isLoading) return undefined;
    if (!seasonResult.data) return undefined;
    if (seasonResult.data.length === 0) return undefined;
    return seasonResult.data![0].id;
  });
  const [currentEpisode, setCurrentEpisode] = useState<string | undefined>(() => {
    if (isEpisodeError || isEpisodeLoading) return undefined;
    if (episodeResult.length === 0) return undefined;
    if (!episodeResult[0].data) return undefined;
    if (episodeResult[0].data.length === 0) return undefined;
    return episodeResult[0].data![0].id;
  });

  if (showResult.isLoading || seasonResult.isLoading || isEpisodeLoading) return <p>Loading data</p>;

  if (showResult.isError || seasonResult.isError || isEpisodeError) return <p>Error</p>;

  if (isMobile) return <MobilePreviewFilm />;

  seasonResult.data?.sort((a, b) => a.releaseDate.localeCompare(b.releaseDate))

  // Build an object: { [seasonId]: data }
  const episodesBySeason = seasonResult.data!.reduce((acc, season, index) => {
    acc[season.id] = episodeResult[index].data!;
    return acc;
  }, {} as Record<string, Episode[]>);

  return (
    <div className="min-h-screen bg-[#23263a] text-white">
      <HeroBanner item={showResult.data!}>
        <SeasonEpisodeList
          seasons={seasonResult.data!}
          episodesBySeason={episodesBySeason}
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
            content: <MovieInfoCard show={showResult.data!} seasonCount={seasonResult.data!.length}/>,
          },
          {
            label: "Tập phim",
            key: "episodes",
            content: (
              <SeasonEpisodeMiniList
                seasons={seasonResult.data!}
                episodes={episodesBySeason}
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
