import React from "react";

interface Genre {
  id: string;
  name: string;
}

interface Props {
  genres?: Genre[];
  tags?: string[];
  maxDisplay?: number;
  className?: string;
}

const GenreDisplay: React.FC<Props> = ({
  genres = [],
  tags = [],
  maxDisplay = 5,
  className = "",
}) => {
  // Ưu tiên genres từ API, fallback về tags
  const displayItems =
    genres.length > 0
      ? genres
      : tags.map((tag, index) => ({ id: index.toString(), name: tag }));

  if (displayItems.length === 0) return null;

  const visibleItems = displayItems.slice(0, maxDisplay);
  const remainingCount = displayItems.length - maxDisplay;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {visibleItems.map((item) => (
        <span
          key={item.id}
          className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs font-medium hover:bg-purple-200 transition-colors"
        >
          {item.name}
        </span>
      ))}
      {remainingCount > 0 && (
        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
          +{remainingCount} thêm
        </span>
      )}
    </div>
  );
};

export default GenreDisplay;
