import { useRef } from "react";

interface PopularSectionReusableProps<T> {
  items: T[];
  selectedTitle: string;
  onSelect: (item: T, index: number) => void;
  getImage: (item: T) => string;
  getTitle: (item: T) => string;
  sectionTitle: string;
}

function PopularSectionReusable<T>({
  items,
  selectedTitle,
  onSelect,
  getImage,
  getTitle,
  sectionTitle,
}: PopularSectionReusableProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative z-10 w-full pl-0 pt-18">
      <h2 className="text-white text-xl font-semibold mb-4">{sectionTitle}</h2>
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
            className={`w-[219px] rounded-lg overflow-hidden relative flex-shrink-0 shadow-lg cursor-pointer border-2 transition-all duration-300 ${
              selectedTitle === getTitle(item)
                ? "border-violet-500"
                : "border-transparent"
            }`}
            onClick={() => onSelect(item, index)}
          >
            <img
              src={getImage(item)}
              alt={getTitle(item)}
              className="w-full h-[150px] object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/80 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 w-full px-3 pb-2 text-white text-sm font-medium z-20">
              {getTitle(item)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularSectionReusable;
