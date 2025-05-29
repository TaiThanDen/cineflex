import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { MovieItem } from "./data/Movie";
import { Link } from "react-router-dom";

interface HeroBannerProps {
  items: MovieItem[];
  children?: React.ReactNode;
  selectedIndex?: number; // thêm optional
  setSelectedIndex?: (idx: number) => void; // thêm optional
}

const HeroBanner = ({ items, children }: HeroBannerProps) => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = items[selectedIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % items.length);
    }, 5000); // 5 giây
    return () => clearInterval(interval);
  }, [items.length]);

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
        className="relative w-full px-4 sm:px-8 py-10 sm:py-20 flex flex-col gap-4 sm:gap-6"
        style={{ maxHeight: "60vh" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-xs sm:text-sm uppercase tracking-wide font-semibold text-[#7f22fe] mt-10 sm:mt-20">
              CineFlex
            </div>
            <h1 className="text-2xl sm:text-5xl font-bold leading-tight break-words">
              {selected.title}
            </h1>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-200">
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
              className="text-gray-200 max-w-full sm:max-w-xl text-xs sm:text-sm leading-relaxed overflow-y-auto scrollbar-hide"
              style={{ maxHeight: "60px" }}
            >
              {selected.content}
            </p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2 sm:mt-4 w-full">
              <Link to={"/watch"} className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white font-medium px-4 sm:px-6 py-2 rounded flex items-center justify-center gap-2">
                  <FaPlay />
                  <p>Watch Now</p>
                </button>
              </Link>
              <button
                className="w-full sm:w-auto bg-white/20 hover:bg-white/30 text-white font-medium px-4 sm:px-6 py-2 rounded"
                onClick={handleMoreInfo}
              >
                <p>More Info</p>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nội dung phụ */}
      <div className="relative z-10 w-full px-4 sm:px-8 pb-4 sm:pb-8">
        {children}
      </div>
    </div>
  );
};

export default HeroBanner;
