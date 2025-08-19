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
          {/* <Menu>
            <MenuButton className="inline-flex items-center gap-2 rounded-md bg-[#23263a] px-3 py-1.5 text-sm/6 font-semibold text-white">
              {seasons.filter((season) => season.id === (currentSeason || seasons[0].id))[0].title}
              <ChevronDownIcon className="size-4 fill-white/60" />
            </MenuButton>

            <MenuItems
              transition
              anchor="bottom start"
              className="w-52 z-30 origin-bottom rounded-xl border border-white/5 bg-[#2f3147] p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
            >
              {seasons.map((s) => (
                <MenuItem>
                  <button
                    onClick={() => onSeasonChange(s.id)}
                    className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
                    {s.title}
                  </button>
                </MenuItem>
              ))}
            </MenuItems>
          </Menu> */}
        </h2>

      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 ">
        {currentData.map((ep) => (
          <button
            key={ep.id}
            onClick={() => onEpisodeSelect(ep.id)}
            className={`px-4 h-[50px] w-auto py-2 rounded ${currentEpisode === ep.id
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
