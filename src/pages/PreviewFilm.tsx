import { Link, useNavigate, useParams } from "react-router";
import HeroBanner from "../components/HeroBanner";
import SeasonEpisodeList from "../components/PreviewFilm/SeasonEpisodeList";
import CommentSection from "../components/CommentSection";
import RecommendedList from "@/components/RecommendedList";
import MovieInfoCard from "@/components/MovieInfoCard";
import SeasonEpisodeMiniList from "@/components/SeasonEpisodeMiniList";
import { useState } from "react";
import Tabs from "@/components/Tabs";
import { useIsMobile } from "../lib/hooks/use-mobile";
import { useQueries } from "@tanstack/react-query";
import { getEpisodesBySeasonId, getGenresByShow, getSeasonsByShowId, getShowById } from "@/lib/api";
import type { Episode } from "@/lib/types/Episode";
import { FaPlay } from "react-icons/fa";



const PreviewFilm = () => {
  const isMobile = useIsMobile();
  const { id } = useParams();
  const navigate = useNavigate();

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
      },
      {
        queryKey: ['genres_of_show', id],
        queryFn: () => getGenresByShow(id!),
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

  const [showResult, seasonResult, genreResult] = result;
  const isEpisodeLoading = episodeResult.some((r) => r.isLoading);
  const isEpisodeError = episodeResult.some((r) => r.isError);


  const [currentSeason, setCurrentSeason] = useState<string | undefined>(() => {
    if (seasonResult.isError || seasonResult.isLoading) return undefined;
    if (!seasonResult.data) return undefined;
    if (seasonResult.data.length === 0) return undefined;
    return seasonResult.data![0].id;
  });

  if (showResult.isLoading || seasonResult.isLoading || isEpisodeLoading) return <p>Loading data</p>;

  if (showResult.isError || seasonResult.isError || isEpisodeError) return <p>Error</p>;

  seasonResult.data?.sort((a, b) => a.releaseDate.localeCompare(b.releaseDate))

  // Build an object: { [seasonId]: data }
  const episodesBySeason = seasonResult.data!.reduce((acc, season, index) => {
    acc[season.id] = episodeResult[index].data!;
    return acc;
  }, {} as Record<string, Episode[]>);

  if (isMobile) {
    return  (
      <div className="min-h-screen bg-[#23263a] text-white ">
        {/* Banner + Back button */}
        <div className="relative w-full h-64 mb-6">
          <img
            src={showResult.data!.thumbnail}
            alt={showResult.data!.title}
            className="w-full h-full object-cover"
          />
          {/* <button
            className="absolute top-4 left-4 bg-black/60 rounded-full p-2"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="text-xl" />
          </button> */}
          {episodeResult.length > 0 &&
          <Link to={`/watch/${episodeResult[0].data![0].id}`}>
            <button className="absolute left-1/2 -translate-x-1/2 bottom-[-28px] bg-white/20 p-4 rounded-full border-4 border-[#23263a]">
              <FaPlay className="text-3xl text-white" />
            </button>
          </Link>
          
          
          }
        </div>

        <Tabs
          tabs={[
            {
              label: "Thông tin phim",
              key: "info",
              content: <MovieInfoCard 
                genres={genreResult.data}
                show={showResult.data!} 
                seasonCount={seasonResult.data!.length}
              />,
            },
            {
              label: "Tập phim",
              key: "episodes",
              content: (
              <SeasonEpisodeMiniList
                seasons={seasonResult.data!}
                episodes={episodesBySeason}
                currentSeason={currentSeason}
                currentEpisode={undefined}
                onSeasonChange={setCurrentSeason}
                onEpisodeSelect={(id) => {
                  navigate(`/watch/${id}`)
                }}
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
    )
  };

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
            content: <MovieInfoCard 
              genres={genreResult.data}
              show={showResult.data!} 
              seasonCount={seasonResult.data!.length}
            />,
          },
          {
            label: "Tập phim",
            key: "episodes",
            content: (
              <SeasonEpisodeMiniList
                seasons={seasonResult.data!}
                episodes={episodesBySeason}
                currentSeason={currentSeason}
                currentEpisode={undefined}
                onSeasonChange={setCurrentSeason}
                onEpisodeSelect={(id) => {
                  navigate(`/watch/${id}`)
                }}
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
