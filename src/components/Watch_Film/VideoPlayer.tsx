import React, { useRef, useState, useEffect } from "react";
import {
  PiSubtitlesBold,
  PiTelevisionSimpleBold,
  PiShareFatBold,
  PiCaretLeftBold,
} from "react-icons/pi";
import {
  RiSettingsLine,
  RiReplay10Fill,
  RiForward10Fill,
} from "react-icons/ri";
import {
  FaRegCirclePlay,
  FaRegCirclePause,
  FaVolumeHigh,
  FaVolumeXmark,
  FaRegHeart,
  FaCheck,
} from "react-icons/fa6";
import { MdFullscreen } from "react-icons/md";

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [prevVolume, setPrevVolume] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [cinemaMode, setCinemaMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);

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
    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);

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

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (videoRef.current) videoRef.current.volume = vol;
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

  // Chia sẻ: Copy URL
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  // Chế độ rạp
  const toggleCinemaMode = () => setCinemaMode((v) => !v);

  // Đổi thời gian khi kéo thanh tiến trình
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // Định dạng thời gian mm:ss
  const formatTime = (t: number) => {
    if (isNaN(t)) return "00:00";
    const m = Math.floor(t / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(t % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="bg-[#23263a] text-white w-full min-h-0 pt-15  sm:min-h-screen relative">
      {/* Overlay Cinema Mode */}
      {cinemaMode && (
        <div
          className="fixed inset-0 bg-black z-40 transition-all duration-300"
          onClick={toggleCinemaMode}
        />
      )}

      <div
        ref={containerRef}
        className={`bg-[#23263a] h-auto w-full relative flex items-center justify-center z-50`}
        tabIndex={0}
      >
        <video
          ref={videoRef}
          className="w-full h-auto object-contain"
          src="https://rr4---sn-8pxuuxa-nbo6r.googlevideo.com/videoplayback?expire=1748359379&ei=c4Q1aJDqM67Es8IPiIyVoAo&ip=125.234.97.122&id=o-AItCjmsGljyaboMEh9zErMUkIgig1BkTPt7ovR-W-dcJ&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1748337779%2C&mh=2m&mm=31%2C26&mn=sn-8pxuuxa-nbo6r%2Csn-ogul7ne6&ms=au%2Conr&mv=m&mvi=4&pl=20&rms=au%2Cau&gcr=vn&initcwndbps=1831250&bui=AY1jyLPmE-VRPUUTBjzDcPA_XhKTxp4P27Jsqome6ilJl5Fu33KwIO1sn-uZBXltaEx1C4eGc07uF4vV&vprv=1&svpuc=1&mime=video%2Fmp4&ns=UzLnjJvpDNFX6pfIXNILMbwQ&rqh=1&gir=yes&clen=315798900&ratebypass=yes&dur=5809.214&lmt=1742764057648397&mt=1748337417&fvip=4&lmw=1&c=TVHTML5&sefc=1&txp=5438534&n=gEjV6d4-hS17Wg&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cgcr%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgFiiFLLVLUlCrlP0irzbBuWMt2aMZ2dGAzgfGj2dasEgCIHyIKGzHJ3NMqR0Sd5Je0hZ4IQk4bfGmIyYnAT3w6smY&sig=AJfQdSswRgIhALXTxqA7XXG9GhmZ39w3PPWkJF3ZfcnIs8k1HDcHJuUVAiEA8cSvF3lLPx5UuzqE-dQc28lFqm1-hOksC9xdiLAE-Nk%3D&title=Sena%20Chill%20Mixtape%20%232%20-%20Lamsung026%20ft%20Sena%20%3A%20Nhac%20Lak"
          onClick={togglePlay}
        />

        {/* Thanh tiến trình video */}
        {showControls && (
          <div className="absolute left-0 right-0 bottom-20 px-2 sm:px-4 z-50 mb-3 sm:mb-5">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xs w-10 sm:w-12 text-right">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 accent-[#7008e7] h-1"
              />
              <span className="text-xs w-10 sm:w-12">
                {formatTime(duration)}
              </span>
            </div>
          </div>
        )}

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
                    className={`flex justify-between items-center px-2 py-1 rounded hover:bg-white/10 cursor-pointer ${
                      playbackRate === speed ? "bg-white/10" : ""
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
        {showControls && (
          <div className="absolute bottom-0 w-full p-2 sm:p-4 bg-gradient-to-t from-[#23263a] to-transparent text-white text-xs sm:text-sm space-y-2 z-50 transition-all">
            <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2 sm:gap-3">
              {/* Nhóm nút trái */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                <button onClick={togglePlay} className="text-2xl sm:text-3xl">
                  {isPlaying ? <FaRegCirclePause /> : <FaRegCirclePlay />}
                </button>
                <button
                  onClick={() => skip(-10)}
                  className="text-lg sm:text-2xl"
                >
                  <RiReplay10Fill />
                </button>
                <button
                  onClick={() => skip(10)}
                  className="text-lg sm:text-2xl"
                >
                  <RiForward10Fill />
                </button>
                {/* Volume chỉ hiện trên desktop */}
                <div className="hidden sm:flex items-center gap-2 group">
                  <button onClick={toggleMute} className="text-xl">
                    {volume === 0 ? <FaVolumeXmark /> : <FaVolumeHigh />}
                  </button>
                  <div className="relative w-32 h-1 bg-gray-600 rounded-full overflow-hidden group-hover:h-2 transition-all">
                    <div
                      className="absolute top-0 left-0 h-full bg-white rounded-full"
                      style={{ width: `${volume * 100}%` }}
                    ></div>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={volume}
                      onChange={handleVolume}
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              {/* Nhóm nút phải */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xl sm:text-2xl">
                <PiSubtitlesBold title="Phụ đề" />
                <button onClick={toggleCinemaMode}>
                  <PiTelevisionSimpleBold
                    title="Chế độ rạp"
                    className={cinemaMode ? "text-yellow-400" : ""}
                  />
                </button>
                <button onClick={() => setShowSettings((prev) => !prev)}>
                  <RiSettingsLine title="Cài đặt" />
                </button>
                <button onClick={toggleFullscreen}>
                  <MdFullscreen title="Toàn màn hình" />
                </button>
              </div>
            </div>

            {/* Ẩn các chức năng phụ khi ở full screen */}
            {!isFullscreen && (
              <div className="flex items-center justify-between mt-2 text-white/80 text-sm">
                <div className="flex gap-6">
                  <span className="flex items-center gap-1">
                    <FaRegHeart />
                    <span> Yêu thích</span>
                  </span>
                  <span>
                    Chuyển tập{" "}
                    <span className="bg-yellow-400 text-black px-1 rounded text-xs ml-1">
                      ON
                    </span>
                  </span>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1 hover:underline"
                    title="Chia sẻ"
                  >
                    <PiShareFatBold /> Chia sẻ
                  </button>
                  {copied && (
                    <span className="text-[#5c69ff] ml-2 animate-pulse">
                      Đã copy link!
                    </span>
                  )}
                </div>
                {/* <span className="text-red-500">📣 Báo lỗi</span> */}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
