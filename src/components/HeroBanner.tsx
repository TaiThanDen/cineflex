import { useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const popularItems = [
  {
    title: "Minecraft Movie",
    image:
      "https://c4.wallpaperflare.com/wallpaper/736/411/582/star-wars-star-wars-the-rise-of-skywalker-movie-poster-poster-movie-characters-hd-wallpaper-preview.jpg",
    content:
      "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    year: "2028",
    seasons: "1",
    rating: "PG",
  },
  {
    title: "Final Destination Bloodlines",
    image:
      "https://c4.wallpaperflare.com/wallpaper/123/991/646/avatar-blue-skin-james-cameron-s-movie-avatar-movie-poster-wallpaper-preview.jpg",
    content: "Death returns in a new chapter of the Final Destination saga.",
    year: "2027",
    seasons: "1",
    rating: "R",
  },
  {
    title: "Superman",
    image:
      "https://static.nutscdn.com/vimg/0-0/8290b8ce36c1fb7bc8d8707f81faebea.jpg",
    content:
      "Clark Kent, a journalist, discovers his superhuman abilities and becomes Superman.",
    year: "2026",
    seasons: "1",
    rating: "PG-13",
  },
  {
    title: "How to Train Your Dragon",
    image:
      "https://static.nutscdn.com/vimg/0-0/d413f57dd9cd406de09cde0e4d5d5002.jpg",
    content:
      "A young Viking befriends a dragon and learns to understand the creatures.",
    year: "2025",
    seasons: "1",
    rating: "PG",
  },
  {
    title: "Jurassic World Rebirth",
    image:
      "https://static.nutscdn.com/vimg/0-0/9fbc807ead43644630dcbe8b7bbd3ad3.jpg",
    content:
      "Dinosaurs roam the Earth again as scientists attempt to control them.",
    year: "2024",
    seasons: "1",
    rating: "PG-13",
  },
  {
    title: "M3GAN 2.0",
    image:
      "https://static.nutscdn.com/vimg/0-0/fcbbb620e45522e4262272c35d36ffd4.jpg",
    content:
      "A lifelike doll with artificial intelligence goes rogue and starts to kill.",
    year: "2023",
    seasons: "1",
    rating: "R",
  },
];

const HeroBanner = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(popularItems[0]);

  return (
    <div
      className=" relative w-full h-screen bg-cover text-white transition-all duration-500"
      style={{
        backgroundImage: `url('${selected.image}')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-0" />

      {/* Animated Content */}
      <div
        className="relative z-10 max-w-6xl px-8 py-20 flex flex-col gap-6"
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
              SlothUI Original
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
              <button className="bg-violet-600 hover:bg-violet-700 text-white font-medium px-6 py-2 rounded flex items-center gap-2">
                <FaPlay />
                <a href="https://www.profitableratecpm.com/qatn1uwbf?key=873fcd0a8493cbf8a3d4c92e372372b7" target="_blank" rel="noopener noreferrer">
                <p>Watch Now</p></a>
              </button>
              <button className="bg-white/20 hover:bg-white/30 text-white font-medium px-6 py-2 rounded">
                <p>More Info</p>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Popular Section */}
      <div className="relative z-10 w-full px-8 pt-18  pb-20">
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
          {popularItems.map((item, index) => (
            <div
              key={index}
              className={`w-[230px] rounded-lg overflow-hidden relative flex-shrink-0 shadow-lg cursor-pointer border-2 transition-all duration-300 ${
                selected.title === item.title
                  ? "border-violet-500"
                  : "border-transparent"
              }`}
              onClick={() => setSelected(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[150px] object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/80 to-transparent z-10" />
              {/* Title */}
              <div className="absolute bottom-0 left-0 w-full px-3 pb-2 text-white text-sm font-medium z-20">
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
