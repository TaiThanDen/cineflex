import { useState } from "react";

interface SeasonEpisodeListProps {
  seasonsData: {
    season: number;
    episodes: {
      title: string;
      thumbnail: string;
    }[];
  }[];
}

const SeasonEpisodeList = ({ seasonsData }: SeasonEpisodeListProps) => {
  const [activeSeason, setActiveSeason] = useState(seasonsData[0]?.season ?? 1);

  const currentSeason = seasonsData.find((s) => s.season === activeSeason);

  return (
    <div className="px-8 pt-10">
      {/* Tab Season */}
      <div className="flex gap-6 mb-6 border-b border-gray-600 overflow-x-auto">
        {seasonsData.map((s) => (
          <button
            key={s.season}
            className={`pb-2 font-medium text-sm transition-all ${
              s.season === activeSeason
                ? "border-b-2 border-purple-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveSeason(s.season)}
          >
            Season {s.season}
          </button>
        ))}
      </div>

      {/* Episodes */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {currentSeason?.episodes.map((ep, idx) => (
          <div key={idx} className="w-[200px] flex-shrink-0">
            <img
              src={ep.thumbnail}
              alt={ep.title}
              className="w-full h-[120px] object-cover rounded-lg"
            />
            <p className="mt-2 text-sm text-white">{ep.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonEpisodeList;
