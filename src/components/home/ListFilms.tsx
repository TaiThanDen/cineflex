import MovieSection from "./MovieSection";
import { getAllShows } from "@/lib/api";
import { useQueries } from "@tanstack/react-query";



const ListFilms = () => {


   const result = useQueries({
    queries: [
      {
        queryKey: ['shows_of_genres', 'Phim Hàn Quốc'],
        queryFn: () => getAllShows(0, 100),
        
      },
      {
        queryKey: ['shows_of_genres', 'Phim Trung Quốc'],
        queryFn: () => getAllShows(0, 100)
      },
      {
        queryKey: ['shows_of_genres', 'Phim US-UK'],
        queryFn: () => getAllShows(0, 100)
      }
    ]
   })

  return (
    <div className="bg-[#23263a] min-h-screen px-4 py-8 space-y-10">
      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h2 className={`text-xl md:text-2xl font-bold text-purple-300`}>
            Phim Hàn Quốc mới
          </h2>
          <button className="text-white text-sm hover:underline flex items-center gap-1">
            Xem toàn bộ ➔
          </button>
        </div>
        <MovieSection title="" data={result[0].data?.data ?? []} showViewAll={false} />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h2 className={`text-xl md:text-2xl font-bold text-yellow-300`}>
            Phim US-UK mới
          </h2>
          <button className="text-white text-sm hover:underline flex items-center gap-1">
            Xem toàn bộ ➔
          </button>
        </div>
        <MovieSection title="" data={result[1].data?.data ?? []} showViewAll={false} />
      </div>


      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h2 className={`text-xl md:text-2xl font-bold text-purple-300`}>
            Phim Trung Quốc mới
          </h2>
          <button className="text-white text-sm hover:underline flex items-center gap-1">
            Xem toàn bộ ➔
          </button>
        </div>
        <MovieSection title="" data={result[2].data?.data ?? []} showViewAll={false} />
      </div>
    </div>
  );
};

export default ListFilms;
