// import { useState } from "react";
import VideoPlayer from "../components/Watch_Film/VideoPlayer";
import MovieInfoCard from "@/components/MovieInfoCard";
import CommentSection from "@/components/CommentSection";
import RecommendedList from "@/components/RecommendedList";
import SeasonEpisodeMiniList from "@/components/SeasonEpisodeMiniList";
import Tabs from "@/components/Tabs";
import { useNavigate, useParams } from "react-router";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getEpisodeById, getEpisodesBySeasonId, getSeasonById, getSeasonsByShowId, getShowById } from "@/lib/api";
import { useState } from "react";
import type { Episode } from "@/lib/types/Episode";


function WatchFilm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentEpisodeResult = useQuery({
    queryFn: () => getEpisodeById(id!),
    queryKey: ["episode", id],
    enabled: !!id
  });

  const currentSeasonId = currentEpisodeResult.data?.season;

  const currentSeasonResult = useQuery({
    queryKey: currentSeasonId ? ["season", currentSeasonId] : ["season", "skip"],
    enabled: !!currentSeasonId,
    queryFn: () => getSeasonById(currentSeasonId!),
  });

  const showId = currentSeasonResult.data?.show;

  const showResult = useQuery({
    queryKey: showId ? ["show", showId] : ["show", "skip"],
    enabled: !!showId,
    queryFn: () => getShowById(showId!)
  })

  const allSeason = useQuery({
    queryKey: showId ? ["seasons_of_show", showId] : ["show", "skip"],
    queryFn: () => getSeasonsByShowId(showId!),
    enabled: !!showId
  })

  const allEpisodeResult = useQueries({
    queries: (allSeason.data ?? []).map((s) => ({
      queryFn: () => getEpisodesBySeasonId(s.id!),
      queryKey: ['episodes_of_season', s.id!],
      enabled: !!s.id,
    })),
  });

  const allEpisodeLoading = allEpisodeResult.some((r) => r.isLoading);
  const allEpisodeError = allEpisodeResult.some((r) => r.isError);
  
  const [selectedSeason, setSelectedSeason] = useState<string | undefined>(() => {
    if (allSeason.isError || allSeason.isLoading) return undefined;
    if (!allSeason.data) return undefined;
    if (allSeason.data.length === 0) return undefined;
    return allSeason.data![0].id;
  });



  // const [currentSeason, setCurrentSeason] = useState(0);
  // const [currentEpisode, setCurrentEpisode] = useState(0);

  if (currentEpisodeResult.isLoading || currentSeasonResult.isLoading || showResult.isLoading || allEpisodeLoading || allSeason.isLoading) return <>Loading</>

  if (currentEpisodeResult.isError || currentSeasonResult.isError || showResult.isError || allEpisodeError || allSeason.isError) return <>Error</>

  
  allSeason.data?.sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
  
  

  const episodesBySeason = allSeason.data!.reduce((acc, season, index) => {
    acc[season.id] = allEpisodeResult[index].data!;
    return acc;
  }, {} as Record<string, Episode[]>);

  return (
    <div className="bg-[#23263a] min-h-screen text-white">
      <VideoPlayer url={currentEpisodeResult.data!.url} />

      {/* Tabs */}
      <Tabs
        tabs={[
          {
            label: "Thông tin phim",
            key: "info",
            content: <MovieInfoCard show={showResult.data!} seasonCount={allSeason.data!.length}/>,
          },
          {
            label: "Tập phim",
            key: "episodes",
            content: (
              <SeasonEpisodeMiniList
                episodes={episodesBySeason}
                seasons={allSeason.data!}
                currentSeason={selectedSeason}
                currentEpisode={id}
                onSeasonChange={setSelectedSeason}
                onEpisodeSelect={(id) => {navigate(`/watch/${id}`)}}
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