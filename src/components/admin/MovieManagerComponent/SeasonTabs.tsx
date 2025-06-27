import React from "react";

interface Season {
  id: string;
  title?: string;
  seasonNumber?: number;
  releaseDate: string;
  description: string;
}

interface Episode {
  id: string;
  title: string;
  url: string;
  duration: number;
}

interface Props {
  seasons: Season[];
  activeSeason: number;
  onSeasonChange: (seasonIndex: number) => void;
  episodes: Episode[];
  className?: string;
  onEditSeason?: (season: Season) => void;
  onDeleteSeason?: (season: Season) => void;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

const SeasonTabs: React.FC<Props> = ({
  seasons,
  activeSeason,
  onSeasonChange,
  episodes,
  className = "",
  onEditSeason,
  onDeleteSeason,
  isUpdating = false,
  isDeleting = false,
}) => {
  if (!seasons || seasons.length === 0) {
    return (
      <div className={`text-gray-500 text-center py-4 ${className}`}>
        Chưa có mùa phim nào
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Season Tabs */}
      <div className="flex gap-1 mb-4 border-b border-gray-300 overflow-x-auto">
        {seasons.map((season, idx) => (
          <button
            key={season.id || idx}
            className={`px-4 py-2 border-b-2 font-semibold text-sm whitespace-nowrap transition-colors ${
              activeSeason === idx
                ? "border-indigo-600 text-indigo-700 bg-indigo-50"
                : "border-transparent text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
            }`}
            onClick={() => onSeasonChange(idx)}
          >
            <span className="flex items-center gap-2">
              Mùa {season.seasonNumber || season.title || idx + 1}
              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                {episodes?.length || 0} tập
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Season Info */}
      {seasons[activeSeason] && (
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">
                {seasons[activeSeason].title || `Mùa ${activeSeason + 1}`}
              </h3>
              {seasons[activeSeason].description && (
                <p className="text-sm text-gray-600 mt-1">
                  {seasons[activeSeason].description}
                </p>
              )}
              <div className="text-xs text-gray-500 mt-2">
                Phát hành:{" "}
                {new Date(
                  seasons[activeSeason].releaseDate
                ).toLocaleDateString()}
              </div>
            </div>

            {/* Season Action Buttons */}
            {(onEditSeason || onDeleteSeason) && (
              <div className="flex gap-2 ml-4">
                {onEditSeason && (
                  <button
                    onClick={() => onEditSeason(seasons[activeSeason])}
                    className="text-indigo-600 hover:text-indigo-800 text-sm px-2 py-1 rounded border border-indigo-300 hover:bg-indigo-50 transition-colors disabled:opacity-50"
                    disabled={isUpdating}
                    title="Chỉnh sửa mùa phim"
                  >
                    {isUpdating ? "..." : "✏️"}
                  </button>
                )}
                {onDeleteSeason && seasons.length > 1 && (
                  <button
                    onClick={() => onDeleteSeason(seasons[activeSeason])}
                    className="text-red-600 hover:text-red-800 text-sm px-2 py-1 rounded border border-red-300 hover:bg-red-50 transition-colors disabled:opacity-50"
                    disabled={isDeleting}
                    title="Xóa mùa phim"
                  >
                    {isDeleting ? "..." : "🗑️"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SeasonTabs;
