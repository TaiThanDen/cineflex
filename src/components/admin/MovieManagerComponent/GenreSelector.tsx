import React, { useState, useEffect } from "react";
import { useShowGenres, useAllGenres } from "@/lib/hooks/useGenres";

interface Genre {
  id: string;
  name: string;
}

interface Props {
  showId?: string;
  selectedGenres?: Genre[];
  onGenresChange?: (genres: Genre[]) => void;
  className?: string;
  disabled?: boolean;
}

const GenreSelector: React.FC<Props> = ({
  showId,
  selectedGenres = [],
  onGenresChange,
  className = "",
  disabled = false,
}) => {
  const [localSelectedGenres, setLocalSelectedGenres] =
    useState<Genre[]>(selectedGenres);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Lấy genres hiện tại của show (nếu có showId)
  const { data: currentGenres, isLoading: isLoadingCurrent } =
    useShowGenres(showId);

  // Lấy tất cả genres có sẵn
  const { data: allGenres, isLoading: isLoadingAll } = useAllGenres();

  // Cập nhật local state khi có dữ liệu từ API
  useEffect(() => {
    if (currentGenres && currentGenres.length > 0) {
      setLocalSelectedGenres(currentGenres);
    }
  }, [currentGenres]);

  // Cập nhật parent component khi có thay đổi
  useEffect(() => {
    onGenresChange?.(localSelectedGenres);
  }, [localSelectedGenres, onGenresChange]);

  const toggleGenre = (genre: Genre) => {
    if (disabled) return;

    setLocalSelectedGenres((prev) => {
      const isSelected = prev.some((g) => g.id === genre.id);
      if (isSelected) {
        return prev.filter((g) => g.id !== genre.id);
      } else {
        return [...prev, genre];
      }
    });
  };

  const removeGenre = (genreId: string) => {
    if (disabled) return;
    setLocalSelectedGenres((prev) => prev.filter((g) => g.id !== genreId));
  };

  if (isLoadingCurrent || isLoadingAll) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
        <div className="h-10 bg-gray-300 rounded"></div>
      </div>
    );
  }

  return (
    <div className={className}>
      <label className="block text-sm font-semibold mb-2">
        Thể loại phim
        {showId && (
          <span className="text-xs text-gray-500 ml-2">
            (Từ API: {currentGenres?.length || 0} genres)
          </span>
        )}
      </label>

      {/* Hiển thị genres đã chọn */}
      <div className="flex flex-wrap gap-2 mb-3 min-h-[2.5rem] border border-gray-300 rounded-md p-2">
        {localSelectedGenres.length > 0 ? (
          localSelectedGenres.map((genre) => (
            <span
              key={genre.id}
              className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {genre.name}
              {!disabled && (
                <button
                  type="button"
                  onClick={() => removeGenre(genre.id)}
                  className="text-purple-500 hover:text-purple-700 font-bold"
                >
                  ×
                </button>
              )}
            </span>
          ))
        ) : (
          <span className="text-gray-500 text-sm">Chưa chọn thể loại nào</span>
        )}
      </div>

      {/* Dropdown để chọn genres */}
      {!disabled && (
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full text-left px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            + Thêm thể loại
          </button>

          {isDropdownOpen && (
            <>
              {/* Overlay để đóng dropdown */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
              />

              {/* Dropdown menu */}
              <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {allGenres?.map((genre) => {
                  const isSelected = localSelectedGenres.some(
                    (g) => g.id === genre.id
                  );
                  return (
                    <button
                      key={genre.id}
                      type="button"
                      onClick={() => {
                        toggleGenre(genre);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 hover:bg-gray-50 ${
                        isSelected
                          ? "bg-purple-50 text-purple-700 font-medium"
                          : ""
                      }`}
                    >
                      <span className="flex items-center justify-between">
                        {genre.name}
                        {isSelected && (
                          <span className="text-purple-500">✓</span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GenreSelector;
