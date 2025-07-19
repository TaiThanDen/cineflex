import MovieDetail from "@/components/admin/MovieManagerComponent/MovieDetail"
import { getEpisodesBySeasonId, getGenresByShow, getSeasonsByShowId, getShowById } from "@/lib/api";
import type { Episode } from "@/lib/types/Episode";
import { useQueries } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router"


const ShowDetailAdminPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    if (!id) {
        navigate("/admin/movies");
    }

    const result = useQueries({
        queries: [
            {
                queryKey: ['show', id],
                queryFn: () => getShowById(id!),
                enabled: !!id
            },
            {
                queryKey: ['seasons_of_show', id],
                queryFn: () => getSeasonsByShowId(id!, 0, 100),
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
            queryFn: () => getEpisodesBySeasonId(s.id!, 0, 100),
            queryKey: ['episodes_of_season', s.id!],
            enabled: !!s.id,
        })),
    });

    const [showResult, seasonResult, genreResult] = result;
    const isEpisodeLoading = episodeResult.some((r) => r.isLoading);
    const isEpisodeError = episodeResult.some((r) => r.isError);

    if (showResult.isLoading || seasonResult.isLoading || isEpisodeLoading) return <p>Loading data</p>;

    if (showResult.isError || seasonResult.isError || isEpisodeError) return <p>Error</p>;

    seasonResult.data?.sort((a, b) => a.releaseDate.localeCompare(b.releaseDate))

    // Build an object: { [seasonId]: data }
    const episodesBySeason = seasonResult.data!.reduce((acc, season, index) => {
        acc[season.id] = episodeResult[index].data!;
        return acc;
    }, {} as Record<string, Episode[]>);


    return (
        <MovieDetail
            movie={showResult.data!}
            seasons={seasonResult.data!}
            episodes={episodesBySeason}
            genres={genreResult.data!}
        />
    )
}

export default ShowDetailAdminPage