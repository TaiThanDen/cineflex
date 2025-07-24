import React, { useRef, useState, useEffect } from "react";
import MuxPlayer from "@mux/mux-player-react";

import { PiCaretLeftBold } from "react-icons/pi";
import { FaCheck } from "react-icons/fa6";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAdsRandom } from "@/lib/api";

const AD_URL = "https://example.com";

type VideoPlayerProps = {
  url: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [prevVolume, setPrevVolume] = useState(1);
  const [showSettings] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [cinemaMode, setCinemaMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [, setCurrentTime] = useState(0);
  const [, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [showAdPopup, setShowAdPopup] = useState(false);
  const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);

  const queryClient = useQueryClient();

  const pauseAdsResult = useQuery({
    queryKey: ["user-ads", "pause-video"],
    queryFn: () => getAdsRandom(2),
    gcTime: 0
  })

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Cập nhật thời gian hiện tại khi video phát
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      // Save to localStorage every second
      localStorage.setItem("videoProgress", video.currentTime.toString());
    };
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      const savedProgress = localStorage.getItem("videoProgress");
      if (savedProgress) {
        const time = parseFloat(savedProgress);
        if (!isNaN(time) && time < video.duration) {
          video.currentTime = time;
          setCurrentTime(time);
        }
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  // Ẩn control khi full screen và không di chuyển chuột
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
    // Khi vào full screen thì tự động hiện control 4s đầu
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

  // Thêm hàm xử lý pause cho MuxPlayer
  const handleMuxPause = () => {
    const last = localStorage.getItem("lastAdRedirect");
    const now = Date.now();
    if (!last || now - parseInt(last, 10) > 10 * 60 * 1000) {
      ////////////////////
      setShowAdPopup(true);
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
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
    if (videoRef.current) videoRef.current.currentTime += sec;
  };
  const toggleMute = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      setVolume(0);
      if (videoRef.current) videoRef.current.volume = 0;
    } else {
      setVolume(prevVolume);
      if (videoRef.current) videoRef.current.volume = prevVolume;
    }
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else container.requestFullscreen();
  };

  const changePlaybackRate = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) videoRef.current.playbackRate = rate;
  };

  const speedOptions = [0.25, 0.5, 1, 1.25, 1.5, 2];

  // Chế độ rạp
  const toggleCinemaMode = () => setCinemaMode((v) => !v);

  // Hàm đóng popup và tiếp tục phát video
  const handleCloseAd = () => {
    // Lưu thời gian chuyển hướng vào localStorage
    localStorage.setItem("lastAdRedirect", Date.now().toString());
    window.open(pauseAdsResult.data?.link ?? AD_URL, "_blank");
    setShowAdPopup(false);
    queryClient.invalidateQueries({
      queryKey: ["user-ads"]
    })
    // Không cần play video vì đã chuyển hướng
  };

  // Phím tắt tiện ích khi xem phim
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement &&
        (document.activeElement.tagName === "INPUT" ||
          document.activeElement.tagName === "TEXTAREA")
      )
        return;
      switch (e.key) {
        case " ":
          e.preventDefault();
          togglePlay();
          break;
        case "m":
        case "M":
          toggleMute();
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
        case "c":
        case "C":
          toggleCinemaMode();
          break;
        case "ArrowRight":
          skip(10);
          break;
        case "ArrowLeft":
          skip(-10);
          break;
        case "ArrowUp":
          setVolume((v) => {
            const newVol = Math.min(1, v + 0.05);
            if (videoRef.current) videoRef.current.volume = newVol;
            return newVol;
          });
          break;
        case "ArrowDown":
          setVolume((v) => {
            const newVol = Math.max(0, v - 0.05);
            if (videoRef.current) videoRef.current.volume = newVol;
            return newVol;
          });
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, volume, cinemaMode, isFullscreen, playbackRate]);



  return (
    <div className="bg-[#23263a] text-white w-full pt-0 sm:min-h-full relative ">
      {/* Overlay Cinema Mode */}
      {cinemaMode && (
        <div
          className="fixed inset-0 bg-black z-40 transition-all duration-300"
          onClick={toggleCinemaMode}
        />
      )}
      <div
        ref={containerRef}
        className="relative w-full flex justify-center items-center"
        style={{ height: "100vh", minHeight: "0" }} // Sửa ở đây
        tabIndex={0}
      >
        {/* Popup quảng cáo khi pause */}
        {showAdPopup && (
          <div className="absolute inset-0 bg-black/70 z-50 flex flex-col items-center justify-center">
            <div className="bg-white rounded-lg p-4 shadow-lg flex flex-col items-center">
              <img
                src={pauseAdsResult.data?.image ?? "https://static.nutscdn.com/vimg/0-0/784543799c537bda4c8f8b9c1757bfc3.jpg"}
                alt="Quảng cáo"
                className="max-w-xs w-full mb-4"
              />
              <button
                onClick={handleCloseAd}
                className="bg-[#23263a] text-white px-6 py-2 rounded mt-2 text-lg font-semibold hover:bg-[#3a3a4a] transition"
              >
                Đóng và Xem Tiếp
              </button>
            </div>
          </div>
        )}
        <MuxPlayer
          className="w-full h-full object-contain bg-black"
          style={{
            width: "100vw",
            height: "100vh",
            aspectRatio: "16/9",
            background: "black",
          }}
          playbackId={url}
          autoPlay
          metadata={{
            video_title: "Solo Leveling-S1E1-1080P",
            viewer_user_id: "Placeholder (optional)",
          }}
          onPause={handleMuxPause} // Thêm dòng này
        />

        {/* Settings Dropdown */}
        {showSettings && showControls && (
          <div className="absolute bottom-24 right-2 sm:right-8 bg-[#1e1e1e] rounded-xl shadow-lg text-sm w-56 p-4 space-y-3">
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
                <div className="flex justify-between text-gray-400  ">
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
                    className={`flex justify-between items-center px-2 py-1 rounded hover:bg-white/10 cursor-pointer ${playbackRate === speed ? "bg-white/10" : ""
                      }`}
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

        {/* Controls */}
        {/* {showControls && (
          <VideoControls
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            volume={volume}
            playbackRate={playbackRate}
            cinemaMode={cinemaMode}
            isFullscreen={isFullscreen}
            showSettings={showSettings}
            showSpeedMenu={showSpeedMenu}
            speedOptions={speedOptions}
            copied={copied}
            onPlayPause={togglePlay}
            onSkip={skip}
            onVolume={handleVolume}
            onMute={toggleMute}
            onSeek={handleSeek}
            onPiP={togglePiP}
            onCinemaMode={toggleCinemaMode}
            onSettings={() => setShowSettings((prev) => !prev)}
            onFullscreen={toggleFullscreen}
            onShare={handleShare}
            onChangeSpeed={changePlaybackRate}
            setShowSpeedMenu={setShowSpeedMenu}
            formatTime={formatTime}
          />
        )} */}
      </div>
    </div>
  );
};

export default VideoPlayer;
