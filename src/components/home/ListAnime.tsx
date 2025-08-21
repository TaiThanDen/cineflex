import MovieSection from "./MovieSection";
import { useQueries } from "@tanstack/react-query";
import { queryShow } from "@/lib/api";
import { Link } from "react-router";

const ListAnime = () => {
  const result = useQueries({
    queries: [
      {
        queryKey: ['shows_of_genres', 'Anime Hay'],
        queryFn: () => queryShow({
          genres: ['Anime Hay']
        }, 0, 10),
      },
      {
        queryKey: ['shows_of_genres', 'Trinh thám'],
        queryFn: () => queryShow({
          genres: ['Trinh thám']
        }, 0, 10),
      },
      {
        queryKey: ['shows_of_genres', 'Thập kỷ'],
        queryFn: () => queryShow({
          genres: ['Thập kỷ']
        }, 0, 10),
      }
    ]
  });

  const animeData = [
    {
      title: "Đề xuất cho bạn 🥴",
      genres: ['Anime Hay'],
      color: "text-purple-300",
      data: result[0].data?.data ?? []
    },
    {
      title: "Nổ não với anime hình sự 🤯",
      genres: ['Trinh thám'],
      color: "text-yellow-300",
      data: result[1].data?.data ?? []
    },
    {
      title: "Anime Thập Kỷ",
      genres: ['Thập kỷ'],
      color: "text-green-300",
      data: result[2].data?.data ?? []
    }
  ];

  // Debug: Log để xem dữ liệu chi tiết (fixed TypeScript errors)
  console.log('Query results:', result.map((r, i) => ({
    index: i,
    isLoading: r.isLoading,
    isError: r.isError,
    dataLength: r.data?.data?.length || 0,
    actualData: r.data?.data?.map(item => ({
      title: item.title,
      id: item.id
    }))
  })));

  return (
    <div className="bg-[#23263a] min-h-screen px-4 py-8 space-y-10">
      {animeData.map((section, index) => (
        <div key={index} className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h2 className={`text-xl md:text-2xl font-bold ${section.color}`}>
              {section.title}
            </h2>
            <Link
              to={`/search?genre=${encodeURIComponent(section.genres[0])}`}
              className="text-white text-sm hover:text-purple-400 hover:underline flex items-center gap-1 transition-colors"
            >
              Xem toàn bộ ➔
            </Link>
          </div>
          <MovieSection
            title=""
            data={section.data}
            showViewAll={false}
            overflowX={true}
          />
        </div>
      ))}
    </div>
  );
};

export default ListAnime;
