import MovieSection from "./MovieSection";
import { useQueries } from "@tanstack/react-query";
import { getShowsByGenres } from "@/lib/api";


const ListAnime = () => {

   const result = useQueries({
    queries: [
      {
        queryKey: ['shows_of_genres', 'Anime', 'Mới'],
        queryFn: () => getShowsByGenres('Anime', 'Mới'),
        
      },
      {
        queryKey: ['shows_of_genres', 'Anime', 'Trinh thám'],
        queryFn: () => getShowsByGenres('Anime', 'Trinh thám')
      },
      {
        queryKey: ['shows_of_genres', 'Anime', 'Thập kỷ'],
        queryFn: () => getShowsByGenres('Anime', 'Thập kỷ')
      }
    ]
   })

  return (
    <div className="bg-[#23263a] min-h-screen px-4 py-8 space-y-10">
      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h2 className={`text-xl md:text-2xl font-bold text-purple-300`}>
            Anime mới tới chơi bro 🥴
          </h2>
          <button className="text-white text-sm hover:underline flex items-center gap-1">
            Xem toàn bộ ➔
          </button>
        </div>
        <MovieSection title="" data={result[0].data} showViewAll={false} />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h2 className={`text-xl md:text-2xl font-bold text-yellow-300`}>
            Nổ não với anime hình sự 🤯
          </h2>
          <button className="text-white text-sm hover:underline flex items-center gap-1">
            Xem toàn bộ ➔
          </button>
        </div>
        <MovieSection title="" data={result[1].data} showViewAll={false} />
      </div>


      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h2 className={`text-xl md:text-2xl font-bold text-purple-300`}>
            Anime Thập Kỷ
          </h2>
          <button className="text-white text-sm hover:underline flex items-center gap-1">
            Xem toàn bộ ➔
          </button>
        </div>
        <MovieSection title="" data={result[2].data} showViewAll={false} />
      </div>
    </div>
  );
};

export default ListAnime;
