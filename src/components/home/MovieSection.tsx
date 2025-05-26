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

const MovieSection = ({
  title,
  data,
  selectedTitle,
  onSelect,
  showViewAll = false,
}: MovieSectionProps) => {
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

      {/* Container scrollable on mobile, grid on md+ */}
      <div className="overflow-x-auto md:overflow-visible px-2 scrollbar-hide">
        <div className="flex gap-3 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((item, index) => (
            <div
              key={index}
              onClick={() => onSelect?.(item)}
              className={`min-w-[48%] md:min-w-0 bg-[#2f3147] rounded-xl overflow-hidden cursor-pointer border-2 transition-transform duration-300 group ${
                selectedTitle === item.title
                  ? "border-violet-500"
                  : "border-transparent"
              } hover:scale-110 hover:shadow-2xl`}
            >
              <div className="w-full h-[200px]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-lg"
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
