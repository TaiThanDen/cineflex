import React from "react";
import { useShowGenres } from "@/lib/hooks/useGenres";

// Component đơn giản để hiển thị genres của một show
const ShowGenresDisplay: React.FC<{ showId: string }> = ({ showId }) => {
  const { data: genres, isLoading, error } = useShowGenres(showId);

  if (isLoading) {
    return (
      <div className="flex gap-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-300 h-6 w-16 rounded-full"
          ></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-sm">
        Lỗi tải thể loại: {error.message}
      </div>
    );
  }

  if (!genres || genres.length === 0) {
    return <div className="text-gray-500 text-sm">Chưa có thể loại nào</div>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => (
        <span
          key={genre.id}
          className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium"
        >
          {genre.name}
        </span>
      ))}
    </div>
  );
};

// Component để hiển thị và chỉnh sửa genres
const GenresManager: React.FC<{ showId: string }> = ({ showId }) => {
  const { data: genres, isLoading, error, refetch } = useShowGenres(showId);

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">Thể loại phim</h3>
        <button
          onClick={handleRefresh}
          className="text-blue-500 hover:text-blue-700 text-sm"
          disabled={isLoading}
        >
          {isLoading ? "Đang tải..." : "Làm mới"}
        </button>
      </div>

      <ShowGenresDisplay showId={showId} />

      {/* Thông tin API call */}
      <div className="mt-3 text-xs text-gray-500">
        API Call: <code>getGenresByShow("{showId}")</code>
        <br />
        Status: {isLoading ? "Loading..." : error ? "Error" : "Success"}
        <br />
        Data: {genres ? `${genres.length} genres` : "No data"}
      </div>
    </div>
  );
};

export { ShowGenresDisplay, GenresManager };
export default ShowGenresDisplay;
