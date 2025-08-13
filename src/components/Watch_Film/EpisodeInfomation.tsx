import Auth from '@/context/Auth';
import { getEpisodeLike, getEpisodeViewCount, isLiked, likeEpisode, unlikeEpisode } from '@/lib/api';
import type { Episode } from '@/lib/types/Episode';
import { Button } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
    ThumbsUp,
    SkipForward,
    Eye
} from 'lucide-react';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

interface Props {
    episode: Episode,
    skipIntro: () => void
}

const EpisodeInformation = ({ episode, skipIntro }: Props) => {
    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const { auth } = useContext(Auth);

    const viewCountResult = useQuery({
        queryKey: ["episode-views", episode.id],
        queryFn: () => getEpisodeViewCount(episode.id)
    });

    const likeCountResult = useQuery({
        queryKey: ["episode-like-count", episode.id],
        queryFn: () => getEpisodeLike(episode.id)
    })

    const isLikedResult = useQuery({
        queryKey: ["is-episode-like", episode.id],
        queryFn: () => isLiked(episode.id)
    })

    const likeEpisodeMutation = useMutation({
        mutationFn: likeEpisode
    })

    const unlikeEpisodeMutation = useMutation({
        mutationFn: unlikeEpisode
    })

    const handleLikeClick = async () => {
        try {
            if (auth.trim() === "") return navigate("/login");
            
            if (isLikedResult.isError || isLikedResult.isLoading) return;

            if (isLikedResult.data) {
                await unlikeEpisodeMutation.mutateAsync(episode.id)
            }
            else {
                await likeEpisodeMutation.mutateAsync(episode.id)
            }
            
        }
        catch {

            toast("Vui lòng thử lại sau!")
        }
        finally {
            queryClient.invalidateQueries({ queryKey: ["episode-like-count", episode.id] });
            queryClient.invalidateQueries({ queryKey: ["is-episode-like", episode.id] });
        }
    }

    return <>
        <div className="h-15 flex items-center px-5">
            <div className="flex items-center gap-8">
                <div className="gap-3 flex items-center">
                    <Eye color="#ffffff"/>
                    <div className="text-white">
                        {(viewCountResult.isError || viewCountResult.isLoading) ? 
                            <>
                                0
                            </>:
                            <>
                                {viewCountResult.data!}
                            </>
                        }
                    </div>
                </div>
                <Button
                    onClick={async () => {
                        await handleLikeClick()
                    }} 
                    disabled={
                        likeEpisodeMutation.isPending || unlikeEpisodeMutation.isPending
                    }
                    className="gap-3 flex items-center"
                >
                    {
                        (isLikedResult.data === null ? <></>:<>
                            <ThumbsUp 
                                color="#ffffff" fill={isLikedResult.data?'#ffffff':'#ffffff00'}
                            />
                        </>)
                    }
                    <div className="text-white">
                        {(likeCountResult.isError || likeCountResult.isLoading) ? 
                            <>
                                0
                            </>:
                            <>
                                {likeCountResult.data!}
                            </>
                        }
                    </div>
                </Button>
                <Button 
                    onClick={skipIntro}
                    className="gap-3 flex items-center"
                >
                    <SkipForward color="#ffffff"/>
                    <div className="text-white">bỏ qua intro</div>
                </Button>
            </div>
        </div>
    </>
}

export default EpisodeInformation