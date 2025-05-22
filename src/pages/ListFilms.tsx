import MovieSection from "../components/MovieSection";

const sections = [
  {
    title: "Phim Hàn Quốc mới",
    color: "text-purple-300",
    data: [
      {
        title: "Chín Mảnh Ghép Bí Ẩn",
        subtitle: "Nine Puzzles",
        image:
          "https://static.nutscdn.com/vimg/0-0/8290b8ce36c1fb7bc8d8707f81faebea.jpg",
        ep: "PD. 4",
      },
      {
        title: "Chín Mảnh Ghép Bí Ẩn",
        subtitle: "Nine Puzzles",
        image:
          "https://static.nutscdn.com/vimg/0-0/8290b8ce36c1fb7bc8d8707f81faebea.jpg",
        ep: "PD. 4",
      },
      {
        title: "Chín Mảnh Ghép Bí Ẩn",
        subtitle: "Nine Puzzles",
        image:
          "https://static.nutscdn.com/vimg/0-0/8290b8ce36c1fb7bc8d8707f81faebea.jpg",
        ep: "PD. 4",
      },
      {
        title: "Cung Điện Ma Ám",
        subtitle: "The Haunted Palace",
        image:
          "https://static.nutscdn.com/vimg/0-0/8290b8ce36c1fb7bc8d8707f81faebea.jpg",
        ep: "PD. 10",
        tm: "TM. 10",
      },
      // ...thêm phim khác
    ],
  },
  {
    title: "Phim Trung Quốc mới",
    color: "text-yellow-300",
    data: [
      {
        title: "Chín Mảnh Ghép Bí Ẩn",
        subtitle: "Nine Puzzles",
        image:
          "https://static.nutscdn.com/vimg/0-0/8290b8ce36c1fb7bc8d8707f81faebea.jpg",
        ep: "PD. 4",
      },
      {
        title: "Khom Lưng",
        subtitle: "The Prisoner of Beauty",
        image:
          "https://static.nutscdn.com/vimg/0-0/8290b8ce36c1fb7bc8d8707f81faebea.jpg",
        ep: "PD. 20",
        tm: "TM. 15",
      },
      {
        title: "Chín Mảnh Ghép Bí Ẩn",
        subtitle: "Nine Puzzles",
        image:
          "https://static.nutscdn.com/vimg/0-0/8290b8ce36c1fb7bc8d8707f81faebea.jpg",
        ep: "PD. 4",
      },
      {
        title: "Chín Mảnh Ghép Bí Ẩn",
        subtitle: "Nine Puzzles",
        image:
          "https://static.nutscdn.com/vimg/0-0/8290b8ce36c1fb7bc8d8707f81faebea.jpg",
        ep: "PD. 4",
      },
    ],
  },
  {
    title: "Phim US-UK mới",
    color: "text-pink-400",
    data: [
      {
        title: "Star Wars: Andor",
        subtitle: "Chiến Tranh Giữa Các Vì Sao",
        image:
          "https://static.nutscdn.com/vimg/0-0/8290b8ce36c1fb7bc8d8707f81faebea.jpg",
        ep: "PD. 11",
      },
      {
        title: "Chín Mảnh Ghép Bí Ẩn",
        subtitle: "Nine Puzzles",
        image:
          "https://static.nutscdn.com/vimg/0-0/8290b8ce36c1fb7bc8d8707f81faebea.jpg",
        ep: "PD. 4",
      },
      {
        title: "Chín Mảnh Ghép Bí Ẩn",
        subtitle: "Nine Puzzles",
        image:
          "https://static.nutscdn.com/vimg/0-0/8290b8ce36c1fb7bc8d8707f81faebea.jpg",
        ep: "PD. 4",
      },
      {
        title: "Chín Mảnh Ghép Bí Ẩn",
        subtitle: "Nine Puzzles",
        image:
          "https://static.nutscdn.com/vimg/0-0/8290b8ce36c1fb7bc8d8707f81faebea.jpg",
        ep: "PD. 4",
      },
    ],
  },
];

const ListFilms = () => {
  return (
    <div className="bg-[#23263a] min-h-screen px-4 py-8 space-y-10">
      {sections.map((section, idx) => (
        <div key={idx} className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h2 className={`text-xl md:text-2xl font-bold ${section.color}`}>
              {section.title}
            </h2>
            <button className="text-white text-sm hover:underline flex items-center gap-1">
              Xem toàn bộ ➔
            </button>
          </div>
          <MovieSection title="" data={section.data} showViewAll={false} />
        </div>
      ))}
    </div>
  );
};

export default ListFilms;
