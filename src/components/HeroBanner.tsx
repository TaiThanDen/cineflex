import { useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

type Item = {
  title: string;
  image: string;
  content: string;
  year: string;
  seasons: string;
  rating: string;
};

interface HeroBannerProps {
  items: Item[];
}

const HeroBanner = ({ items }: HeroBannerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(items[0]);
  const [autoIndex, setAutoIndex] = useState(0);
  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAutoIndex((prev) => (prev + 1) % items.length);
    }, 10000); // 5s chuyển slide

    return () => clearInterval(interval);
  }, [items.length]);

  // Sync selected with autoIndex
  useEffect(() => {
    setSelected(items[autoIndex]);
  }, [autoIndex, items]);

  // Khi user click chọn thủ công, reset autoIndex
  const handleSelect = (item: Item, idx: number) => {
    setSelected(item);
    setAutoIndex(idx);
  };

  return (
    <div
      className="relative w-full h-max bg-cover text-white transition-all duration-500"
      style={{
        backgroundImage: `url('${selected.image}')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#23263a] via-black/60 to-transparent" />

      {/* Animated Content */}
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
            <div className="text-sm uppercase tracking-wide font-semibold text-purple-400 mt-20">
              CineFlex
            </div>
            <h1 className="text-5xl font-bold leading-tight">
              {selected.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-gray-300">
              <span>{selected.year}</span>
              <span>•</span>
              <span>
                {selected.seasons} Season{selected.seasons !== "1" && "s"}
              </span>
              <span className="bg-gray-700 text-white px-2 py-1 rounded text-xs">
                {selected.rating}
              </span>
            </div>

            {/* Giới hạn chiều cao content và cho phép cuộn */}
            <p
              className="text-gray-300 max-w-xl text-sm leading-relaxed overflow-y-auto scrollbar-hide"
              style={{ maxHeight: "100px" }}
            >
              {selected.content}
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <button className="bg-violet-600 hover:bg-violet-700 text-white font-medium px-6 py-2 rounded-2xl flex items-center gap-2">
                <FaPlay />
                <p>Watch Now</p>
              </button>
              <button className="bg-white/20 hover:bg-white/30 text-white font-medium px-6 py-2 rounded">
                <p>More Info</p>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Popular Section */}
      <div className="relative w-full px-8 pt-18 pb-20">
        <h2 className="text-white text-xl font-semibold mb-4">
          Popular on slothUI
        </h2>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
          onWheel={(e) => {
            if (scrollRef.current) {
              scrollRef.current.scrollLeft += e.deltaY;
            }
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={`w-[230px] rounded-lg overflow-hidden relative flex-shrink-0 shadow-lg cursor-pointer border-2 transition-all duration-300 ${selected.title === item.title
                  ? "border-violet-500"
                  : "border-transparent"
                }`}
              onClick={() => handleSelect(item, index)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[150px] object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/80 to-transparent " />
              {/* Title */}
              <div className="absolute bottom-0 left-0 w-full px-3 pb-2 text-white text-sm font-medium ">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
