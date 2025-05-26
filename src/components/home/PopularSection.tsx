// components/PopularSection.tsx
import { useRef } from "react";
import type { MovieItem } from "../data/Movie";

interface PopularSectionProps {
  items: MovieItem[];
  selectedTitle: string;
  onSelect: (item: MovieItem, index: number) => void;
}

const PopularSection = ({
  items,
  selectedTitle,
  onSelect,
}: PopularSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative z-10 w-screen pl-0 px-8 pt-18 pb-20">
      <h2 className="text-white text-xl font-semibold mb-4">
        Popular on CineFlex
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
            className={`w-[230px] rounded-lg overflow-hidden relative flex-shrink-0 shadow-lg cursor-pointer border-2 transition-all duration-300 ${
              selectedTitle === item.title
                ? "border-violet-500"
                : "border-transparent"
            }`}
            onClick={() => onSelect(item, index)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[150px] object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/80 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 w-full px-3 pb-2 text-white text-sm font-medium z-20">
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularSection;
