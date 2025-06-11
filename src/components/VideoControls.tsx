import React from "react";
import {
  FaRegCirclePlay,
  FaRegCirclePause,
  FaVolumeHigh,
  FaVolumeXmark,
  FaRegHeart,
  FaCheck,
} from "react-icons/fa6";
import {
  RiSettingsLine,
  RiReplay10Fill,
  RiForward10Fill,
} from "react-icons/ri";
import {
  PiSubtitlesBold,
  PiTelevisionSimpleBold,
  PiShareFatBold,
  PiCaretLeftBold,
} from "react-icons/pi";
import { MdFullscreen } from "react-icons/md";

type VideoControlsProps = {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;
  cinemaMode: boolean;
  isFullscreen: boolean;
  showSettings: boolean;
  showSpeedMenu: boolean;
  speedOptions: number[];
  copied: boolean;
  onPlayPause: () => void;
  onSkip: (sec: number) => void;
  onVolume: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMute: () => void;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPiP: () => void;
  onCinemaMode: () => void;
  onSettings: () => void;
  onFullscreen: () => void;
  onShare: () => void;
  onChangeSpeed: (rate: number) => void;
  setShowSpeedMenu: (v: boolean) => void;
  formatTime: (t: number) => string;
};

const VideoControls: React.FC<VideoControlsProps> = ({
  isPlaying,
  currentTime,
  duration,
  volume,
  playbackRate,
  cinemaMode,
  isFullscreen,
  showSettings,
  showSpeedMenu,
  speedOptions,
  copied,
  onPlayPause,
  onSkip,
  onVolume,
  onMute,
  onSeek,
  onPiP,
  onCinemaMode,
  onSettings,
  onFullscreen,
  onShare,
  onChangeSpeed,
  setShowSpeedMenu,
  formatTime,
}) => (
  <>
    {/* Thanh tiến trình video */}
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
          onChange={onSeek}
          className="flex-1 accent-[#7008e7] h-1"
        />
        <span className="text-xs w-10 sm:w-12">{formatTime(duration)}</span>
      </div>
    </div>

    {/* Settings Dropdown */}
    {showSettings && (
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
                  onChangeSpeed(speed);
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
    <div className="absolute bottom-0 w-full p-2 sm:p-4 bg-gradient-to-t from-[#23263a] to-transparent text-white text-xs sm:text-sm space-y-2 z-50 transition-all">
      <div className="flex flex-wrap items-center justify-between sm:justify-between gap-2 sm:gap-3">
        {/* Nhóm nút trái */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <button
            onClick={onPlayPause}
            className="text-2xl sm:text-3xl cursor-pointer hover:text-yellow-400"
          >
            {isPlaying ? <FaRegCirclePause /> : <FaRegCirclePlay />}
          </button>
          <button
            onClick={() => onSkip(-10)}
            className="text-lg sm:text-2xl cursor-pointer hover:text-yellow-400"
          >
            <RiReplay10Fill />
          </button>
          <button
            onClick={() => onSkip(10)}
            className="text-lg sm:text-2xl cursor-pointer hover:text-yellow-400"
          >
            <RiForward10Fill />
          </button>
          {/* Volume chỉ hiện trên desktop */}
          <div className="hidden sm:flex items-center gap-2 group">
            <button
              onClick={onMute}
              className="text-xl cursor-pointer hover:text-yellow-400"
            >
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
                onChange={onVolume}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>
        {/* Nhóm nút phải */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xl sm:text-2xl  ">
          <button onClick={onPiP} title="Picture-in-Picture">
            <svg
              className="w-6 h-6 hover:text-yellow-400"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 7h-6v6h6V7z" />
              <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5h-2V5H5v14h6v2H5a2 2 0 0 1-2-2V5z" />
            </svg>
          </button>
          <PiSubtitlesBold
            title="Phụ đề"
            className="cursor-pointer hover:text-yellow-400"
          />
          <button onClick={onCinemaMode}>
            <PiTelevisionSimpleBold
              title="Chế độ rạp"
              className={
                cinemaMode
                  ? "text-yellow-400"
                  : "cursor-pointer hover:text-yellow-400"
              }
            />
          </button>
          <button onClick={onSettings}>
            <RiSettingsLine
              title="Cài đặt"
              className="cursor-pointer hover:text-yellow-400"
            />
          </button>
          <button onClick={onFullscreen}>
            <MdFullscreen
              title="Toàn màn hình"
              className="cursor-pointer hover:text-yellow-400"
            />
          </button>
        </div>
      </div>
      {/* Ẩn các chức năng phụ khi ở full screen */}
      {!isFullscreen && (
        <div className="flex items-center justify-between mt-2 text-white/80 text-sm">
          <div className="flex gap-6">
            <span className="flex items-center gap-1 cursor-pointer hover:text-yellow-400">
              <FaRegHeart />
              <span> Yêu thích</span>
            </span>
            <span className="cursor-pointer hover:text-yellow-400">
              Chuyển tập{" "}
              <span className="bg-yellow-400 text-black px-1 rounded text-xs ml-1 ">
                ON
              </span>
            </span>
            <button
              onClick={onShare}
              className="flex items-center gap-1 hover:underline cursor-pointer hover:text-yellow-400"
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
        </div>
      )}
    </div>
  </>
);

export default VideoControls;
