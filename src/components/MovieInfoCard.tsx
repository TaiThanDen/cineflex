import type { Genre } from "@/lib/types/Genre";
import type { Show } from "@/lib/types/Show";
import { PiInfoBold } from "react-icons/pi";

interface props {
  show: Show,
  seasonCount: number,
  genres: Genre[] | undefined
}

const MovieInfoCard = ({ show, seasonCount, genres }: props) => {

  return (
    <div className="bg-[#23263a] text-white p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-8 items-start w-full">
      {/* Poster */}
      {/* <img
        src={show.thumbnail}
        alt="Lãnh Địa Tử Chiến"
        className="w-[100px] h-[140px] sm:w-[120px] sm:h-[170px] object-cover rounded-lg shadow-md mx-auto sm:mx-0"
      /> */}

      {/* Main Info + Description */}
      <div className="flex-1 flex flex-col gap-2 min-w-[180px] sm:min-w-[250px]">
        {/* Main Info */}
        <div>
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <h1 className="text-2xl sm:text-4xl font-bold">
              {show.title}
            </h1>
          </div>
          {/* <p className="text-yellow-400 font-semibold text-base sm:text-lg">
            MobLand
          </p> */}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-2 text-xs sm:text-sm">
            <span className="border border-yellow-500 px-2 py-0.5 rounded text-yellow-500 font-semibold">
              IMDb 8.5
            </span>
            {/* <span className="bg-yellow-400 text-black px-2 py-0.5 rounded font-semibold">
              4K
            </span> */}
            <span className="bg-white text-black px-2 py-0.5 rounded font-semibold">
              {show.ageRating}
            </span>
            <span className="bg-[#2f3147] px-2 py-0.5 rounded">{(new Date(show.releaseDate)).getFullYear()}</span>
            {(seasonCount > 0) ? <span className="bg-[#2f3147] px-2 py-0.5 rounded">{seasonCount} Phần</span> : <span className="bg-[#2f3147] px-2 py-0.5 rounded">Chưa chiếu</span>}
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mt-2 text-xs">
            {(genres ? genres : []).map((g) => (
              <span className="bg-[#2f3147] px-2 py-0.5 rounded">{g.name}</span>
            ))}
          </div>

          {/* Status */}
          {/* <div className="flex items-center gap-2 mt-4">
            <span className="bg-[#2a1e1c] text-orange-400 px-4 py-1 rounded-full text-xs sm:text-sm flex items-center gap-2">
              🕒 Đã chiếu: 9 / 10 tập
            </span>
          </div> */}
        </div>

        {/* Description  */}
        <div className="text-xs sm:text-sm text-gray-300 leading-relaxed min-w-[180px] sm:min-w-[250px] max-w-full sm:max-w-[420px] mt-4 sm:mt-6">
          <div className="line-clamp-4">
            {show.description}
          </div>
          <div className="text-yellow-400 mt-2 cursor-pointer hover:underline flex items-center gap-1 font-medium">
            Thông tin phim <PiInfoBold className="inline text-base" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfoCard;
