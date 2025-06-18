import type { Episode } from "@/lib/types/Episode";
import type { Season } from "@/lib/types/Season";
import { FaPlay } from "react-icons/fa";

interface props {
  currentSeason: string | undefined;
  currentEpisode: string | undefined;
  onSeasonChange: (id: string) => void;
  onEpisodeSelect: (id: string) => void;
  seasons: Season[],
  episodes: Record<string, Episode[]>
}

const SeasonEpisodeMiniList = ({
  currentSeason,
  currentEpisode,
  onEpisodeSelect,
  seasons,
  episodes
}: props) => {
  const currentData = (seasons.length === 0 ? undefined : episodes[currentSeason || seasons[0].id]);

  

  if (!currentData) return <>Chưa có tập phim (╥﹏╥)</>;

  return (
    <div className="space-y-4 pb-4">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold flex-1 ">
          📂 Phần {seasons.filter((season) => season.id === (currentSeason || seasons[0].id))[0].title}
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 ">
        {currentData.map((ep) => (
          <button
            key={ep.id}
            onClick={() => onEpisodeSelect(ep.id)}
            className={`px-4 h-[50px] w-auto py-2 rounded ${
              currentEpisode === ep.id
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
