import Auth from '@/context/Auth';
import { getEpisodeLike, getEpisodeViewCount, isLiked, likeEpisode, unlikeEpisode } from '@/lib/api';
import type { Episode } from '@/lib/types/Episode';
import { Button } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    ThumbsUp,
    SkipForward,
    Eye,
    Share2,
    Lightbulb,
    LightbulbOff,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

interface Props {
    episode: Episode,
    skipIntro: () => void,
    nextEpisode?: () => void,
    prevEpisode?: () => void,
    hasNext?: boolean,
    hasPrev?: boolean,
    lightsOff?: boolean,
    onToggleLights?: () => void
}

const EpisodeInformation = ({
    episode,
    skipIntro,
    nextEpisode,
    prevEpisode,
    hasNext = false,
    hasPrev = false,
    lightsOff = false,
    onToggleLights
}: Props) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { auth } = useContext(Auth);

    // States for UI controls
    const [showShareMenu, setShowShareMenu] = useState(false);

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


    // Handle share
    const handleShare = async (platform?: string) => {
        const url = window.location.href;
        const title = `Xem ${episode.title} - CineFlex`;

        if (platform) {
            let shareUrl = '';
            switch (platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
                    break;
                case 'copy':
                    try {
                        await navigator.clipboard.writeText(url);
                        toast("Đã sao chép link vào clipboard!");
                        setShowShareMenu(false);
                        return;
                    } catch {
                        toast("Không thể sao chép link");
                        return;
                    }
            }

            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
                setShowShareMenu(false);
            }
        } else {
            // Native share API
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: title,
                        url: url
                    });
                } catch {
                    // Fallback to showing share menu
                    setShowShareMenu(!showShareMenu);
                }
            } else {
                setShowShareMenu(!showShareMenu);
            }
        }
    };

    return <>
        <div className="h-15 flex items-center justify-between px-2 sm:px-5">
            <div className="flex items-center gap-2 sm:gap-8">
                {/* View Count */}
                <div className="gap-1 sm:gap-3 flex items-center">
                    <Eye color="#ffffff" size={18} className="sm:w-6 sm:h-6" />
                    <div className="text-white text-xs sm:text-base">
                        {(viewCountResult.isError || viewCountResult.isLoading) ?
                            <>0</> :
                            <>{viewCountResult.data!}</>
                        }
                    </div>
                </div>

                {/* Like Button */}
                <Button
                    onClick={async () => {
                        await handleLikeClick()
                    }}
                    disabled={
                        likeEpisodeMutation.isPending || unlikeEpisodeMutation.isPending
                    }
                    className="gap-1 sm:gap-3 flex items-center min-w-0 p-1 sm:p-2"
                    sx={{
                        minWidth: 'auto',
                        padding: { xs: '4px', sm: '8px' }
                    }}
                >
                    {
                        (isLikedResult.data === null ? <></> : <>
                            <ThumbsUp
                                color="#ffffff"
                                fill={isLikedResult.data ? '#ffffff' : '#ffffff00'}
                                size={18}
                                className="sm:w-6 sm:h-6"
                            />
                        </>)
                    }
                    <div className="text-white text-xs sm:text-base">
                        {(likeCountResult.isError || likeCountResult.isLoading) ?
                            <>0</> :
                            <>{likeCountResult.data!}</>
                        }
                    </div>
                </Button>

                {/* Skip Intro */}
                <Button
                    onClick={skipIntro}
                    className="gap-1 sm:gap-3 flex items-center min-w-0 p-1 sm:p-2"
                    sx={{
                        minWidth: 'auto',
                        padding: { xs: '4px', sm: '8px' }
                    }}
                >
                    <SkipForward color="#ffffff" size={18} className="sm:w-6 sm:h-6" />
                    <div className="text-white hidden sm:block text-sm">Bỏ qua Intro</div>
                    <div className="text-white block sm:hidden text-xs">Skip</div>
                </Button>
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-1 sm:gap-4">
                {/* Previous Episode */}
                {hasPrev && prevEpisode && (
                    <Button
                        onClick={prevEpisode}
                        className="gap-1 sm:gap-2 flex items-center min-w-0 p-1 sm:p-2"
                        title="Tập trước"
                        sx={{
                            minWidth: 'auto',
                            padding: { xs: '4px', sm: '8px' }
                        }}
                    >
                        <ChevronLeft color="#ffffff" size={18} className="sm:w-5 sm:h-5" />
                        <div className="text-white text-xs hidden sm:block">Tập trước</div>
                    </Button>
                )}

                {/* Next Episode */}
                {hasNext && nextEpisode && (
                    <Button
                        onClick={nextEpisode}
                        className="gap-1 sm:gap-2 flex items-center min-w-0 p-1 sm:p-2"
                        title="Tập tiếp theo"
                        sx={{
                            minWidth: 'auto',
                            padding: { xs: '4px', sm: '8px' }
                        }}
                    >
                        <div className="text-white text-xs hidden sm:block">Tập tiếp theo</div>
                        <ChevronRight color="#ffffff" size={18} className="sm:w-5 sm:h-5" />
                    </Button>
                )}

                {/* Share Button */}
                <div className="relative">
                    <Button
                        onClick={() => handleShare()}
                        className="gap-1 sm:gap-2 flex items-center min-w-0 p-1 sm:p-2"
                        title="Chia sẻ"
                        sx={{
                            minWidth: 'auto',
                            padding: { xs: '4px', sm: '8px' }
                        }}
                    >
                        <Share2 color="#ffffff" size={18} className="sm:w-5 sm:h-5" />
                        <div className="text-white text-xs hidden sm:block">Chia sẻ</div>
                    </Button>

                    {/* Share Menu */}
                    {showShareMenu && (
                        <div className="absolute bottom-full right-0 mb-2 bg-gray-800 rounded-lg shadow-lg p-2 min-w-[120px] sm:min-w-[150px]">
                            <button
                                onClick={() => handleShare('facebook')}
                                className="w-full text-left px-2 sm:px-3 py-2 text-white hover:bg-gray-700 rounded text-xs sm:text-sm"
                            >
                                Facebook
                            </button>
                            <button
                                onClick={() => handleShare('twitter')}
                                className="w-full text-left px-2 sm:px-3 py-2 text-white hover:bg-gray-700 rounded text-xs sm:text-sm"
                            >
                                Twitter
                            </button>
                            <button
                                onClick={() => handleShare('copy')}
                                className="w-full text-left px-2 sm:px-3 py-2 text-white hover:bg-gray-700 rounded text-xs sm:text-sm"
                            >
                                Sao chép link
                            </button>
                        </div>
                    )}
                </div>

                {/* Lights Toggle */}
                {onToggleLights && (
                    <Button
                        onClick={onToggleLights}
                        className="gap-1 sm:gap-2 flex items-center min-w-0 p-1 sm:p-2"
                        title={lightsOff ? "Bật đèn" : "Tắt đèn"}
                        sx={{
                            minWidth: 'auto',
                            padding: { xs: '4px', sm: '8px' }
                        }}
                    >
                        {lightsOff ?
                            <Lightbulb color="#ffffff" size={18} className="sm:w-5 sm:h-5" /> :
                            <LightbulbOff color="#ffffff" size={18} className="sm:w-5 sm:h-5" />
                        }
                        <div className="text-white text-xs hidden sm:block">
                            {lightsOff ? "Bật đèn" : "Tắt đèn"}
                        </div>
                    </Button>
                )}
            </div>
        </div>

        {/* Click outside to close share menu */}
        {showShareMenu && (
            <div
                className="fixed inset-0 z-10"
                onClick={() => setShowShareMenu(false)}
            />
        )}
    </>
}

export default EpisodeInformation