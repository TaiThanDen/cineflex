import { FaPlay } from "react-icons/fa";

interface Props {
  data: { season: number; episodes: { title: string }[] }[];
  currentSeason: number;
  currentEpisode: number;
  onSeasonChange: (index: number) => void;
  onEpisodeSelect: (index: number) => void;
}

const SeasonEpisodeMiniList = ({
  data,
  currentSeason,
  currentEpisode,
  onEpisodeSelect,
}: Props) => {
  const currentData = data[currentSeason];

  if (!currentData) return null;

  return (
    <div className="space-y-4 pb-4">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold flex-1 ">
          📂 Phần {currentData.season}
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 ">
        {currentData.episodes.map((ep, idx) => (
          <button
            key={idx}
            onClick={() => onEpisodeSelect(idx)}
            className={`px-4 h-[50px] w-auto py-2 rounded ${
              currentEpisode === idx
                ? "bg-purple-500 text-black"
                : "bg-[#2f3147] text-white"
            }`}
          >
            <span className="flex items-center justify-center gap-2 ]">
              <FaPlay /> {ep.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeasonEpisodeMiniList;
