import MovieSection from "./MovieSection";
import { queryShow } from "@/lib/api";
import { useQueries } from "@tanstack/react-query";
import { Link } from "react-router";

const ListFilms = () => {
  const result = useQueries({
    queries: [
      {
        queryKey: ['shows_of_genres', 'Phim Hàn Quốc'],
        queryFn: () => queryShow({
          genres: ["Phim Hàn Quốc"]
        }, 0, 4),
      },
      {
        queryKey: ['shows_of_genres', 'Phim Trung Quốc'],
        queryFn: () => queryShow({
          genres: ["Phim Trung Quốc"]
        }, 0, 4),
      },
      {
        queryKey: ['shows_of_genres', 'Phim US-UK'],
        queryFn: () => queryShow({
          genres: ["Phim US-UK"]
        }, 0, 4),
      }
    ]
  });

  const genreData = [
    {
      title: "Phim Hàn Quốc mới",
      genre: "Phim Hàn Quốc",
      color: "text-purple-300",
      data: result[0].data?.data ?? []
    },
    {
      title: "Phim Trung Quốc mới", 
      genre: "Phim Trung Quốc",
      color: "text-yellow-300",
      data: result[1].data?.data ?? []
    },
    {
      title: "Phim US-UK mới",
      genre: "Phim US-UK", 
      color: "text-purple-300",
      data: result[2].data?.data ?? []
    }
  ];

  return (
    <div className="bg-[#23263a] min-h-screen px-4 py-8 space-y-10">
      {genreData.map((section, index) => (
        <div key={index} className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h2 className={`text-xl md:text-2xl font-bold ${section.color}`}>
              {section.title}
            </h2>
            <Link 
              to={`/search?genre=${encodeURIComponent(section.genre)}`}
              className="text-white text-sm hover:text-purple-400 hover:underline flex items-center gap-1 transition-colors"
            >
              Xem toàn bộ ➔
            </Link>
          </div>
          <MovieSection 
            title="" 
            data={section.data} 
            showViewAll={false} 
          />
        </div>
      ))}
    </div>
  );
};

export default ListFilms;
