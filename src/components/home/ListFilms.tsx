import MovieSection from "./MovieSection";

const sections = [
  {
    title: "Phim Hàn Quốc mới",
    color: "text-purple-300",
    data: [
      {
        title: "Khi đời cho bạn quả quýt",
        subtitle: "When Life Gives You tangerines",
        image:
          "https://static.nutscdn.com/vimg/0-0/27191f4250dd4757f67cc34a119b5c9f.jpg",
        ep: "PD. 4",
      },
      {
        title: "Yadang: Ba mặt lật kèo",
        subtitle: "Yadang: The Snitch",
        image:
          "https://static.nutscdn.com/vimg/0-0/784543799c537bda4c8f8b9c1757bfc3.jpg",
        ep: "PD. 4",
      },
      {
        title: "Chín Mảnh Ghép Bí Ẩn",
        subtitle: "Nine Puzzles",
        image:
          "https://static.nutscdn.com/vimg/0-0/0dde799dcd15df61990f268e64fb34a6.jpg",
        ep: "PD. 4",
      },
      {
        title: "Mỹ Vị Yêu Đương",
        subtitle: "Tastefully Yours",
        image:
          "https://static.nutscdn.com/vimg/0-0/a6f8fcdae31f6a00152e7a71f9f6365b.jpg",
        ep: "PD. 10",
        tm: "TM. 10",
      },
    ],
  },
  {
    title: "Phim Trung Quốc mới",
    color: "text-yellow-300",
    data: [
      {
        title: "Hộ Bảo Tầm Tung",
        subtitle: "The Lost National Treasure",
        image:
          "https://static.nutscdn.com/vimg/0-0/2bee3fcba87655eed5c4e60c17b3d459.webp",
        ep: "PD. 4",
      },
      {
        title: "Tàng Hải Truyện",
        subtitle: "Legend of Zang Hai",
        image:
          "https://static.nutscdn.com/vimg/0-0/c046188a525604890238606b0385ba0b.jpg",
        ep: "PD. 20",
        tm: "TM. 15",
      },
      {
        title: "Phu Nhân",
        subtitle: "Madam",
        image:
          "https://static.nutscdn.com/vimg/0-0/2fe5747e55a0fba5f1494298b67aa2a7.jpg",
        ep: "PD. 4",
      },
      {
        title: "Muốn Được Ở Gần Em",
        subtitle: "Close to You",
        image:
          "https://static.nutscdn.com/vimg/0-0/4d8ff96584dca418289a67fac94a6379.webp",
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
          "https://static.nutscdn.com/vimg/0-0/72ce66ad46c56a84b74ec02308e4939c.jpg",
        ep: "PD. 11",
      },
      {
        title: "Nhiệm Vụ Bất Khả Thi 8 - Nghiệp Báo Cuối Cùng",
        subtitle: "Mission: Impossible - The Final Reckoning",
        image:
          "https://static.nutscdn.com/vimg/0-0/fd2af3c1451bc7ae612f9840fc9f2fca.jpg",
        ep: "PD. 4",
      },
      {
        title: "Mật Danh: Kế Toán 2",
        subtitle: "The Accountant 2",
        image:
          "https://static.nutscdn.com/vimg/0-0/4d6162c3a43a2c61a5ef322bb2cc2811.jpg",
        ep: "PD. 4",
      },
      {
        title: "Sương Mù Chiến Tranh",
        subtitle: "Fog of War",
        image:
          "https://static.nutscdn.com/vimg/0-0/a25e35b72ea6e1a9cd69b41e3ea8586f.jpg",
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
