import React, { useRef, useState, useEffect } from "react";
import MuxPlayer, { type MuxPlayerRefAttributes } from "@mux/mux-player-react";

import { PiCaretLeftBold } from "react-icons/pi";
import { FaCheck } from "react-icons/fa6";
import PauseVideoAd from "../AdsComponents/PauseVideoAd";
import type { Episode } from "@/lib/types/Episode";
import EpisodeInformation from "./EpisodeInfomation";

type VideoPlayerProps = {
    onCurrentTimeChange?: (_: number) => void;
    startTime?: number;
    episode: Episode;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ episode, onCurrentTimeChange, startTime }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<MuxPlayerRefAttributes>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [prevVolume, setPrevVolume] = useState(1);
    const [showSettings] = useState(false);
    const [showSpeedMenu, setShowSpeedMenu] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [cinemaMode, setCinemaMode] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [showAdPopup, setShowAdPopup] = useState(false);
    const [lightsOff, setLightsOff] = useState(false);
    const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);

    const skipIntro = () => {
        const player = playerRef.current;

        if (!player) return;

        if (player.currentTime > episode.openingEnd) return;

        player.currentTime = episode.openingEnd;
    }

    const toggleLights = () => {
        setLightsOff(prev => !prev);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const player = playerRef.current;
            if (player) {
                if (onCurrentTimeChange)
                    onCurrentTimeChange(player.currentTime);
            }
        }, 1000);

        const handleFullscreenChange = () => {
            const isCurrentlyFullscreen = !!document.fullscreenElement;
            setIsFullscreen(isCurrentlyFullscreen);
            console.log('Fullscreen changed:', isCurrentlyFullscreen);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
        document.addEventListener("mozfullscreenchange", handleFullscreenChange);
        document.addEventListener("MSFullscreenChange", handleFullscreenChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
            document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
            document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
            clearInterval(interval);
        }
    }, []);

    useEffect(() => {
        if (!isFullscreen) {
            setShowControls(true);
            return;
        }
        const handleMouseMove = () => {
            setShowControls(true);
            if (hideControlsTimeout.current)
                clearTimeout(hideControlsTimeout.current);
            hideControlsTimeout.current = setTimeout(
                () => setShowControls(false),
                4000
            );
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener("mousemove", handleMouseMove);
            container.addEventListener("touchstart", handleMouseMove);
        }
        setShowControls(true);
        if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);
        hideControlsTimeout.current = setTimeout(
            () => setShowControls(false),
            4000
        );

        return () => {
            if (container) {
                container.removeEventListener("mousemove", handleMouseMove);
                container.removeEventListener("touchstart", handleMouseMove);
            }
            if (hideControlsTimeout.current)
                clearTimeout(hideControlsTimeout.current);
        };
    }, [isFullscreen]);

    const handleMuxPause = () => {
        const last = localStorage.getItem("lastAdRedirect");
        const now = Date.now();
        if (!last || now - parseInt(last, 10) > 10 * 60 * 1000) {
            setShowAdPopup(true);
        }
    };

    const togglePlay = () => {
        const video = playerRef.current;
        if (!video) return;
        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    const skip = (sec: number) => {
        if (playerRef.current) playerRef.current.currentTime += sec;
    };

    const toggleMute = () => {
        if (volume > 0) {
            setPrevVolume(volume);
            setVolume(0);
            if (playerRef.current) playerRef.current.volume = 0;
        } else {
            setVolume(prevVolume);
            if (playerRef.current) playerRef.current.volume = prevVolume;
        }
    };

    const toggleFullscreen = async () => {
        const container = containerRef.current;
        if (!container) return;

        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen();
            } else {
                await container.requestFullscreen();
            }
        } catch (error) {
            console.error('Fullscreen toggle error:', error);
        }
    };

    const changePlaybackRate = (rate: number) => {
        setPlaybackRate(rate);
        if (playerRef.current) playerRef.current.playbackRate = rate;
    };

    const speedOptions = [0.25, 0.5, 1, 1.25, 1.5, 2];

    const toggleCinemaMode = () => setCinemaMode((v) => !v);

    // Sửa lại keyboard event handling
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Prevent if user is typing in input fields
            if (
                document.activeElement &&
                (document.activeElement.tagName === "INPUT" ||
                    document.activeElement.tagName === "TEXTAREA")
            ) {
                return;
            }

            // Đảm bảo event handler hoạt động cả khi fullscreen
            const target = e.target as HTMLElement;
            if (target && target.tagName === "MEDIA-CONTROLLER") {
                return; // Tránh xung đột với MuxPlayer controls
            }

            switch (e.key) {
                case " ":
                    e.preventDefault();
                    e.stopPropagation();
                    togglePlay();
                    break;
                case "m":
                case "M":
                    e.preventDefault();
                    e.stopPropagation();
                    toggleMute();
                    break;
                case "f":
                case "F":
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFullscreen();
                    break;
                case "c":
                case "C":
                    e.preventDefault();
                    e.stopPropagation();
                    toggleCinemaMode();
                    break;
                case "l":
                case "L":
                    e.preventDefault();
                    e.stopPropagation();
                    toggleLights();
                    break;
                case "ArrowRight":
                    e.preventDefault();
                    e.stopPropagation();
                    skip(10);
                    break;
                case "ArrowLeft":
                    e.preventDefault();
                    e.stopPropagation();
                    skip(-10);
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    e.stopPropagation();
                    setVolume((v) => {
                        const newVol = Math.min(1, v + 0.05);
                        if (playerRef.current) playerRef.current.volume = newVol;
                        return newVol;
                    });
                    break;
                case "ArrowDown":
                    e.preventDefault();
                    e.stopPropagation();
                    setVolume((v) => {
                        const newVol = Math.max(0, v - 0.05);
                        if (playerRef.current) playerRef.current.volume = newVol;
                        return newVol;
                    });
                    break;
                default:
                    break;
            }
        };

        // Thêm event listener cho cả document và window
        document.addEventListener("keydown", handleKeyDown, true);
        window.addEventListener("keydown", handleKeyDown, true);

        return () => {
            document.removeEventListener("keydown", handleKeyDown, true);
            window.removeEventListener("keydown", handleKeyDown, true);
        };
    }, [isPlaying, volume, cinemaMode, isFullscreen, playbackRate]);

    return (
        <>
            {lightsOff && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 z-30 pointer-events-none"
                    style={{
                        background: `
                            radial-gradient(
                                ellipse at center,
                                transparent 0%,
                                transparent 20%,
                                rgba(0, 0, 0, 0.3) 40%,
                                rgba(0, 0, 0, 0.7) 60%,
                                rgba(0, 0, 0, 0.9) 80%,
                                rgba(0, 0, 0, 0.95) 100%
                            )
                        `
                    }}
                />
            )}

            <div className={`bg-black mt-20 text-white w-[95%] mx-auto rounded-2xl relative overflow-hidden ${lightsOff ? 'z-40' : ''}`}>
                {cinemaMode && (
                    <div
                        className="fixed inset-0 bg-black z-40 transition-all duration-300"
                        onClick={toggleCinemaMode}
                    />
                )}

                <div
                    ref={containerRef}
                    className={`relative w-full ${isFullscreen ? 'h-screen' : 'aspect-video'} flex justify-center items-center overflow-hidden bg-black`}
                    tabIndex={-1}
                    style={{ outline: 'none' }}
                >
                    {showAdPopup && (
                        <PauseVideoAd onClose={() => {
                            setShowAdPopup(false)
                        }} />
                    )}

                    <MuxPlayer
                        ref={playerRef}
                        className={`${isFullscreen ? 'w-full h-full' : 'w-full h-full'} object-contain`}
                        style={{ outline: 'none' }}
                        playbackId={episode.url}
                        autoPlay
                        metadata={{
                            video_title: episode.title || "Video Player",
                            viewer_user_id: "Placeholder (optional)",
                        }}
                        onPause={handleMuxPause}
                        startTime={startTime}
                    />

                    {showSettings && showControls && (
                        <div className="absolute bottom-24 right-2 sm:right-8 bg-[#1e1e1e] rounded-xl shadow-lg text-sm w-56 p-4 space-y-3 z-50">
                            {!showSpeedMenu ? (
                                <>
                                    <div className="font-bold border-b pb-2">Cài đặt</div>
                                    <div
                                        className="flex justify-between hover:text-yellow-400 cursor-pointer"
                                        onClick={() => setShowSpeedMenu(true)}
                                    >
                                        <span>Tốc độ</span>
                                        <span>{playbackRate}x ▸</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span>Chất lượng</span>
                                        <span>4K</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span>Phụ đề</span>
                                        <span>Tùy chỉnh</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center gap-2 text-white font-bold border-b pb-2">
                                        <button onClick={() => setShowSpeedMenu(false)}>
                                            <PiCaretLeftBold />
                                        </button>
                                        <span>Tốc độ</span>
                                    </div>
                                    {speedOptions.map((speed) => (
                                        <div
                                            key={speed}
                                            onClick={() => {
                                                changePlaybackRate(speed);
                                                setShowSpeedMenu(false);
                                            }}
                                            className={`flex justify-between items-center px-2 py-1 rounded hover:bg-white/10 cursor-pointer ${playbackRate === speed ? "bg-white/10" : ""}`}
                                        >
                                            <span>{speed}x</span>
                                            {playbackRate === speed && (
                                                <FaCheck className="text-[#7008e7]" />
                                            )}
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    )}
                </div>

                {!isFullscreen && (
                    <EpisodeInformation
                        episode={episode}
                        skipIntro={skipIntro}
                        lightsOff={lightsOff}
                        onToggleLights={toggleLights}
                    />
                )}
            </div>
        </>
    );
};

export default VideoPlayer;
