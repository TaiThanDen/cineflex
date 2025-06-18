import type { Season } from "@/lib/types/Season";
import { useState } from "react";
import type { Episode } from "@/lib/types/Episode";
import { Link } from "react-router";

// interface SeasonEpisodeListProps {
//   seasonsData: {
//     season: number;
//     episodes: {
//       title: string;
//       thumbnail: string;
//     }[];
//   }[];
// }

interface props {
  seasons: Season[],
  episodesBySeason: Record<string, Episode[]>
}

const SeasonEpisodeList = ({ seasons, episodesBySeason }: props) => {
  const [activeSeason, setActiveSeason] = useState<string | undefined>(seasons[0]?.id || undefined);


  
  


  return (
    <div className="px-8 pl-0 pt-10">
      {/* Tab Season */}
      <div className="flex gap-6 mb-6 border-b border-gray-600 overflow-x-auto">
        {seasons.map((s) => (
          <button
            key={s.id}
            className={`pb-2 font-medium text-sm transition-all ${
              s.id === activeSeason
                ? "border-b-2 border-purple-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveSeason(s.id)}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Episodes */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {activeSeason && episodesBySeason[activeSeason].map((ep) => (
          <Link key={ep.id} to={`/watch/${ep.id}`}>
            <div className="w-[200px] flex-shrink-0">
              <img
                src={`https://image.mux.com/${ep.url}/thumbnail.png?width=214&height=121&time=355`}
                alt={ep.title}
                className="w-full h-[120px] object-cover rounded-lg"
              />
              <p className="mt-2 text-sm text-white">{ep.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SeasonEpisodeList;
