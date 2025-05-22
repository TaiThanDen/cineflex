import React from "react";

interface MovieItem {
  title: string;
  image: string;
  subtitle?: string;
  ep?: string;
  tm?: string;
}

interface MovieSectionProps {
  title: string;
  data: MovieItem[];
  selectedTitle?: string;
  onSelect?: (item: MovieItem) => void;
  showViewAll?: boolean;
}

const MovieSection: React.FC<MovieSectionProps> = ({
  title,
  data,
  selectedTitle,
  onSelect,
  showViewAll = false,
}) => {
  return (
    <div className="w-full">
      {title && (
        <div className="flex justify-between items-center mb-4 px-2">
          <h2 className="text-white text-xl font-semibold">{title}</h2>
          {showViewAll && (
            <button className="text-sm text-red-500 hover:underline">
              View All
            </button>
          )}
        </div>
      )}

      <div className="overflow-x-auto">
        <div className="flex md:grid md:grid-cols-4 gap-4 px-2">
          {data.map((item, index) => (
            <div
              key={index}
              onClick={() => onSelect?.(item)}
              className={`bg-[#2f3147] rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 min-w-[160px] md:min-w-0 ${
                selectedTitle === item.title
                  ? "border-violet-500"
                  : "border-transparent"
              }`}
            >
              <div className="w-full h-[200px]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2">
                <div className="flex gap-2 flex-wrap text-xs mb-1">
                  {item.ep && (
                    <span className="bg-[#3a3d5c] text-white px-2 py-0.5 rounded">
                      {item.ep}
                    </span>
                  )}
                  {item.tm && (
                    <span className="bg-green-600 text-white px-2 py-0.5 rounded">
                      {item.tm}
                    </span>
                  )}
                </div>
                <h3 className="text-white font-semibold text-sm truncate">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-gray-400 text-xs truncate">
                    {item.subtitle}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieSection;
