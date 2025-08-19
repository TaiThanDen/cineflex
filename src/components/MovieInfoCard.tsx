import type { Genre } from "@/lib/types/Genre";
import type { Show } from "@/lib/types/Show";
import { PiInfoBold } from "react-icons/pi";
import { Heart } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { favoriteShow, getFavoriteCount, isFavorite, unfavoriteShow } from "@/lib/api";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useContext } from "react";
import Auth from "@/context/Auth";

interface props {
    show: Show,
    seasonCount: number,
    genres: Genre[] | undefined
}

const MovieInfoCard = ({ show, seasonCount, genres }: props) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { auth } = useContext(Auth)

    const isFavoriteResult = useQuery({
        queryKey: ["is-show-favorite", show.id],
        queryFn: () => isFavorite(show.id)
    })

    const favoriteCountResult = useQuery({
        queryKey: ["show-favorite-count", show.id],
        queryFn: () => getFavoriteCount(show.id)
    })

    const favoriteMutation = useMutation({
        mutationFn: favoriteShow
    })

    const unfavoriteMutation = useMutation({
        mutationFn: unfavoriteShow,
    })

    const handleHeartClick = async () => {
        try {
            if (auth.trim() === "") return navigate("/login")

            if (isFavoriteResult.isError || isFavoriteResult.isLoading) return;

            if (isFavoriteResult.data) {
                await unfavoriteMutation.mutateAsync(show.id)
            }
            else {
                await favoriteMutation.mutateAsync(show.id)
            }
        }
        catch {

            toast("Vui lòng thử lại sau!")
        }
        finally {
            queryClient.invalidateQueries({ queryKey: ["is-show-favorite", show.id] });
            queryClient.invalidateQueries({ queryKey: ["show-favorite-count", show.id] });
        }
    }

    return (
        <div className="bg-[#23263a] text-white p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-8 items-start w-full">

            {/* Main Info + Description */}
            <div className="flex-1 flex flex-col gap-2 min-w-[180px] sm:min-w-[250px]">
                {/* Main Info */}
                <div>
                    <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                        <h1 className="text-2xl sm:text-4xl font-bold">
                            {show.title}
                        </h1>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-2 mt-2 text-xs sm:text-sm">
                        <span className="bg-white text-black px-2 py-0.5 rounded font-semibold">
                            {show.ageRating}
                        </span>
                        <span className="bg-[#2f3147] px-2 py-0.5 rounded">{(new Date(show.releaseDate)).getFullYear()}</span>
                        {(seasonCount > 0) ? <span className="bg-[#2f3147] px-2 py-0.5 rounded">{seasonCount} Phần</span> : <span className="bg-[#2f3147] px-2 py-0.5 rounded">Chưa chiếu</span>}

                        {
                            (isFavoriteResult.data !== null) ? <>
                                <Button
                                    disabled={
                                        favoriteMutation.isPending || unfavoriteMutation.isPending
                                    }
                                    size="small"
                                    className="gap-3 flex items-center"
                                    onClick={async () => {
                                        await handleHeartClick()
                                    }}
                                >
                                    <Heart className="aspect-square" color="#ab8fd2" fill={isFavoriteResult.data ? '#ab8fd2' : '#ffffff00'} />
                                    <div className="text-[#ab8fd2] font-semibold">
                                        {
                                            favoriteCountResult.data ? favoriteCountResult.data : 0
                                        }
                                    </div>
                                </Button>
                            </> : <></>
                        }

                    </div>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-2 mt-2 text-xs">
                        {(genres ? genres : []).map((g) => (
                            <span className="bg-[#2f3147] px-2 py-0.5 rounded">{g.name}</span>
                        ))}
                    </div>
                </div>
                <div className="text-yellow-400 mt-2 cursor-pointer hover:underline flex items-center gap-1 font-medium">
                    Thông tin phim <PiInfoBold className="inline text-base" />
                </div>
                {/* Description  */}
                <div className="text-xs sm:text-sm text-gray-300 leading-relaxed min-w-[180px] sm:min-w-[250px] max-w-full sm:max-w-[420px] mt-4 sm:mt-6">
                    <div className="line-clamp-4">
                        {show.description}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieInfoCard;
