// import { useState } from "react";
import VideoPlayer from "../components/Watch_Film/VideoPlayer";
import MovieInfoCard from "@/components/MovieInfoCard";
import CommentSection from "@/components/commets/CommentSection";
import RecommendedList from "@/components/RecommendedList";
import SeasonEpisodeMiniList from "@/components/SeasonEpisodeMiniList";
import Tabs from "@/components/Tabs";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { getEpisodeById, getEpisodesBySeasonId, getGenresByShow, getSeasonById, getSeasonsByShowId, getShowById, getViewHistoryEpisode, increaseEpisodeViewCount, saveViewHistory } from "@/lib/api";
import { useEffect, useRef, useState } from "react";
import type { Episode } from "@/lib/types/Episode";
import { useUnmount } from 'usehooks-ts'


function WatchFilm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [duration, setDuration] = useState(0);
    const currentTimeRef = useRef(0);
    // const didMountRef = useRef(false);
    const queryClient = useQueryClient();

    const updateViewHistoryMutation = useMutation({
        mutationFn: (data: number) => saveViewHistory(data, id!)
    })

    const currentEpisodeResult = useQuery({
        queryFn: () => getEpisodeById(id!),
        queryKey: ["episode", id],
        enabled: !!id
    });

    const increaseViewCountMutation = useMutation({
        mutationFn: increaseEpisodeViewCount,
        onSuccess: (data) => {
            console.log(data)
        },
    })

    useEffect(() => {
        currentTimeRef.current = duration;
    }, [duration])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (id) increaseViewCountMutation.mutate(id);
        }, 5 * 60 * 1000); // 5 minutes in milliseconds

        return () => clearTimeout(timer); // cleanup if the user leaves before 5 min
    }, []);

    useUnmount(() => {
        queryClient.invalidateQueries({
            queryKey: ["view-history"]
        })
        updateViewHistoryMutation.mutateAsync(currentTimeRef.current);
    })

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

    const genresResult = useQuery({
        queryKey: ['genres_of_show', showId],
        queryFn: () => getGenresByShow(showId!),
        enabled: !!showId
    })

    const allEpisodeLoading = allEpisodeResult.some((r) => r.isLoading);
    const allEpisodeError = allEpisodeResult.some((r) => r.isError);

    const [selectedSeason, setSelectedSeason] = useState<string | undefined>(() => {
        if (allSeason.isError || allSeason.isLoading) return undefined;
        if (!allSeason.data) return undefined;
        if (allSeason.data.length === 0) return undefined;
        return allSeason.data![0].id;
    });

    const viewHistoryResult = useQuery({
        queryKey: ["view-history", id!],
        queryFn: () => getViewHistoryEpisode(id!),
        enabled: !!id
    })



    // const [currentSeason, setCurrentSeason] = useState(0);
    // const [currentEpisode, setCurrentEpisode] = useState(0);

    if (currentEpisodeResult.isLoading || currentSeasonResult.isLoading || showResult.isLoading || allEpisodeLoading || allSeason.isLoading) return <>Đang tải...</>

    if (currentEpisodeResult.isError || currentSeasonResult.isError || showResult.isError || allEpisodeError || allSeason.isError) return <>Lỗi</>


    allSeason.data?.sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));



    const episodesBySeason = allSeason.data!.reduce((acc, season, index) => {
        acc[season.id] = allEpisodeResult[index].data!;
        return acc;
    }, {} as Record<string, Episode[]>);

    return (
        <div className="bg-[#23263a] min-h-screen text-white">
            <VideoPlayer startTime={viewHistoryResult.data?.duration} onCurrentTimeChange={setDuration} episode={currentEpisodeResult.data!} >
            </VideoPlayer>

            {/* Tabs */}
            <Tabs
                tabs={[
                    {
                        label: "Thông tin phim",
                        key: "info",
                        content: <MovieInfoCard
                            genres={genresResult.data}
                            show={showResult.data!}
                            seasonCount={allSeason.data!.length}
                        />,
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
                                onEpisodeSelect={(id) => { navigate(`/watch/${id}`) }}
                            />
                        ),
                    },
                    {
                        label: "Bình luận",
                        key: "comments",
                        content: <CommentSection id={currentEpisodeResult.data!.commentSection} />,
                    },
                    {
                        label: "Đề xuất",
                        key: "recommend",
                        content: <RecommendedList currentShowId={showId} />,
                    },
                ]}
            />
        </div>
    );
}

export default WatchFilm;