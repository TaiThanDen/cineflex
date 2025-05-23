import MovieSection from "./MovieSection";

const sections = [
  {
    title: "Anime mới tới chơi bro 🥴",
    color: "text-purple-300",
    data: [
      {
        title: "Những Đứa Trẻ Nhà Shiunji",
        subtitle: "Ryouki Kamitsubo",
        image:
          "https://static.nutscdn.com/vimg/0-0/7db5ab444152bf0e9b674392ce62303a.jpg",
        ep: "PD. 12",
      },
      {
        title: "Ông Chú Nhà Quê Trở Thành Thánh Kiếm",
        subtitle: "Akio Kazumi",
        image:
          "https://static.nutscdn.com/vimg/0-0/bb61b64828e80c0323129e5274802084.jpg",
        ep: "PD. 12",
      },
      {
        title: "Summer Pockets",
        subtitle: "Tomoki Kobayashi",
        image:
          "https://static.nutscdn.com/vimg/0-0/0962784a019e513e64bc34b3b3864ecd.jpg",
        ep: "PD. 12",
      },
      {
        title: "Food for the Soul",
        subtitle: "Shinya Kawatsura, Chun Shuirong",
        image:
          "https://static.nutscdn.com/vimg/0-0/47645853267cd2fb0ee52eb4ab2bbe4a.jpg",
        ep: "PD. 10",
        tm: "TM. 10",
      },
    ],
  },
  {
    title: "Nổ não với anime hình sự 🤯",
    color: "text-yellow-300",
    data: [
      {
        title: "Thám Tử Lừng Danh Conan",
        subtitle: "Kyokuichi-Tokyo Movie, TMS Entertainment",
        image:
          "https://static.nutscdn.com/vimg/0-0/5f33cd5d9bc615013d6c7a8d5b756e5b.jpg",
        ep: "PD. 860",
      },
      {
        title: "Nhật Ký Bài Giảng Kỳ Quái Của Thầy Chuzenji",
        subtitle: "Chihiro Kumano",
        image:
          "https://static.nutscdn.com/vimg/0-0/d275a120702e247e5c0275dcc18ef779.jpg",
        ep: "PD. 20",
        tm: "TM. 15",
      },
      {
        title: "Ma Cà Rồng Cuối Cùng",
        subtitle: "Hiroyuki Kitakubo, Shinji Takagi",
        image:
          "https://static.nutscdn.com/vimg/0-0/14d99b31b09799d92eb11afb163cfde3.jpg",
        ep: "PD. 4",
      },
      {
        title:
          "Thám Tử Lừng Danh Conan Movie 14: Con Tàu Biến Mất Giữa Trời Xanh",
        subtitle: "Rion Kujo, Yasuichiro Yamamoto",
        image:
          "https://static.nutscdn.com/vimg/0-0/417cf5bcdeb763d9484b2b4b7a481995.jpg",
        ep: "PD. 4",
      },
    ],
  },
  {
    title: "Anime Thập Kỷ",
    color: "text-pink-400",
    data: [
      {
        title: "Bảy Viên Ngọc Rồng Z",
        subtitle: "Chiến Tranh Giữa Các Vì Sao",
        image:
          "https://static.nutscdn.com/vimg/0-0/3a44e1f7c89adfed831a5b6891c36568.jpg",
        ep: "PD. 291",
      },
      {
        title: "Hầm Ngục Tối",
        subtitle:
          "Showgate, SB Creative, GENCO, GREE Entertainment, GREE, movic, Warner Bros. Japan, FuRyu, Hakuhodo DY Music & Pictures, THE KLOCKWORX, MAGES., J.C.STAFF, EGG FIRM",
        image:
          "https://static.nutscdn.com/vimg/0-0/75bfe20f50ebc6da5b940378121ff73d.jpg",
        ep: "PD. 153",
      },
      {
        title: "Đảo Hải Tặc 10: Thế Giới Sức Mạnh",
        subtitle: "Toei Animation, Shueisha",
        image:
          "https://static.nutscdn.com/vimg/0-0/a55d94589425e24a0801c6e7635d8ee4.jpg",
        ep: "PD. 4",
      },
      {
        title: "ReZERO - Bắt Đầu Lại Ở Thế Giới Khác",
        subtitle: "White Fox",
        image:
          "https://static.nutscdn.com/vimg/0-0/992505300d09b9d12d063a3aca4a16f9.jpg",
        ep: "PD. 75",
      },
    ],
  },
];

const ListAnime = () => {
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

export default ListAnime;
