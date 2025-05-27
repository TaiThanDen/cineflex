import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { MovieItem } from "./data/Movie";

interface HeroBannerProps {
  items: MovieItem[];
  children?: React.ReactNode;
}

const HeroBanner = ({ items, children }: HeroBannerProps) => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = items[selectedIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % items.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [items.length]);

  const user = {
    isPro: false,
  };

  const handleWatchNow = () => {
    const movieId =
      selected.id || selected.title.replace(/\s+/g, "-").toLowerCase();

    const hasWatchedAds = sessionStorage.getItem("adsWatched");

    if (user.isPro || hasWatchedAds) {
      navigate(`/preview/${movieId}`);
    } else {
      navigate("/ads", {
        state: { redirectTo: `/preview/${movieId}` },
      });
    }
  };

  const handleMoreInfo = () => {
    const movieId =
      selected.id || selected.title.replace(/\s+/g, "-").toLowerCase();
    navigate(`/preview/${movieId}`);
  };

  return (
    <div
      className="relative w-full h-max bg-cover text-white transition-all duration-500 overflow-x-hidden"
      style={{
        backgroundImage: `url('${selected.image}')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#23263a] via-black/60 to-transparent" />

      {/* Banner Content */}
      <div
        className="relative w-full px-8 py-20 flex flex-col gap-6"
        style={{ maxHeight: "60vh" }} // Giới hạn chiều cao tổng thể content
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-sm uppercase tracking-wide font-semibold text-[#7f22fe] mt-20">
              CineFlex
            </div>
            <h1 className="text-5xl font-bold leading-tight">
              {selected.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-gray-200">
              <span>{selected.year}</span>
              <span>•</span>
              <span>
                {selected.seasons} Season{selected.seasons !== "1" && "s"}
              </span>
              <span className="bg-gray-700 text-white px-2 py-1 rounded text-xs">
                {selected.rating}
              </span>
            </div>

            <p
              className="text-gray-200 max-w-xl text-sm leading-relaxed overflow-y-auto scrollbar-hide"
              style={{ maxHeight: "100px" }}
            >
              {selected.content}
            </p>

            <div className="flex gap-4 mt-4">
              <button
                className="bg-violet-600 hover:bg-violet-700 text-white font-medium px-6 py-2 rounded flex items-center gap-2"
                onClick={handleWatchNow}
              >
                <FaPlay />
                <p>Watch Now</p>
              </button>
              <button
                className="bg-white/20 hover:bg-white/30 text-white font-medium px-6 py-2 rounded"
                onClick={handleMoreInfo}
              >
                <p>More Info</p>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ✅ Chỉ render nội dung phụ không ảnh hưởng animation */}
      <div className="relative z-10 w-full px-8 pb-8">{children}</div>
    </div>
  );
};

export default HeroBanner;
