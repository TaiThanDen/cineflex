import { useLocation, Link } from "react-router";
import { useState } from "react";
import { Filter } from "lucide-react";

const unifiedData = [
  {
    id: "desperate-mrs-seonju",
    title: "Desperate Mrs. Seonju",
    description: "A woman who is the only survivor of a plane crash is forced to live with a man who has a dark past.",
    thumbnail: "https://static.nutscdn.com/vimg/0-0/c26ee8c37b3ab8ed47a748285e648c1e.jpg",
    releaseDate: "2023-09-01",
    ageRating: "T13",
    country: "Hàn Quốc",
    isSeries: true,
    onGoing: true,
    createdTime: "2025-01-01",
    uploadedTime: "2025-01-02",
    genres: ["Lãng Mạn", "Tâm Lý", "Hài"]
  },
  {
    id: "star-wars-andor",
    title: "Star Wars Andor",
    description: "The story of the burgeoning rebellion against the Empire and how people and planets became involved.",
    thumbnail: "https://static.nutscdn.com/vimg/0-0/72ce66ad46c56a84b74ec02308e4939c.jpg",
    releaseDate: "2023-09-01",
    ageRating: "T16",
    country: "Mỹ",
    isSeries: true,
    onGoing: true,
    createdTime: "2025-01-01",
    uploadedTime: "2025-01-02",
    genres: ["Viễn Tưởng", "Hành Động"]
  },
  {
    id: "demonic-slash",
    title: "Final Destination Bloodlines",
    description: "A woman who is the only survivor of a plane crash is forced to live with a man who has a dark past.",
    thumbnail: "https://static.nutscdn.com/vimg/0-0/321b0537ce9d3d6ad123d95f8d73d2ad.jpg",
    releaseDate: "2023-09-01",
    ageRating: "T16",
    country: "Mỹ",
    isSeries: true,
    onGoing: true,
    createdTime: "2025-01-01",
    uploadedTime: "2025-01-02",
    genres: ["Kinh Dị", "Tâm Lý", "Hành Động"]
  },

  // ==== MOVIES (isSeries: false) ====
  {
    id: "inception",
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.",
    thumbnail: "https://static.nutscdn.com/vimg/0-0/53e2087e18e852bc6e74677dd02b2d1c.jpg",
    releaseDate: "2010-07-16",
    ageRating: "T13",
    country: "Mỹ",
    isSeries: false,
    onGoing: false,
    createdTime: "2025-01-01",
    uploadedTime: "2025-01-02",
    genres: ["Khoa Học", "Hành Động", "Viễn Tưởng"]
  },
  {
    id: "the-dark-knight",
    title: "The Dark Knight",
    description: "Batman raises the stakes in his war on crime.",
    thumbnail: "https://static.nutscdn.com/vimg/0-0/8b3593ae6cd2c3d39d65d38246458980.jpg",
    releaseDate: "2008-07-18",
    ageRating: "T13",
    country: "Mỹ",
    isSeries: false,
    onGoing: false,
    createdTime: "2025-01-01",
    uploadedTime: "2025-01-02",
    genres: ["Viễn Tưởng", "Hành Động"]
  },
  {
    id: "interstellar",
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    thumbnail: "https://static.nutscdn.com/vimg/0-0/9d0db9f943cd1dbdbc12c20213e6b4d8.jpg",
    releaseDate: "2014-11-07",
    ageRating: "T13",
    country: "Mỹ",
    isSeries: false,
    onGoing: false,
    createdTime: "2025-01-01",
    uploadedTime: "2025-01-02",
    genres: ["Khoa Học", "Tâm Lý", "Hành Động", "Viễn Tưởng"]
  },

  // ==== ANIME SERIES ====
  {
    id: "teogonia",
    title: "Teogonia",
    description: "Trong một thế giới loạn lạc bởi chiến tranh giữa loài người và các bộ tộc á nhân, Kai – một cậu bé bình thường ở làng Rag – ngày ngày chiến đấu để bảo vệ quê hương. Giữa những trận chiến khốc liệt, cậu bất ngờ nhớ lại ký ức về một thế giới hiện đại mà mình chưa từng sống.",
    thumbnail: "https://static.nutscdn.com/vimg/0-0/7aac45ead7eba60727e620d50e45ff5b.jpg",
    releaseDate: "2023-09-01",
    ageRating: "T13",
    country: "Nhật Bản",
    isSeries: true,
    onGoing: true,
    createdTime: "2025-01-01",
    uploadedTime: "2025-01-02",
    genres: ["Phiêu Lưu", "Hành Động", "Anime"]
  },
  {
    id: "witch-watch",
    title: "Witch Watch",
    description: "Morihito – một thanh niên orc – sống cuộc đời yên bình cho đến khi cô phù thủy bạn thơ ấu xuất hiện.",
    thumbnail: "https://static.nutscdn.com/vimg/0-0/6ac4c22c54d138af06162a3d080612a2.jpg",
    releaseDate: "2023-09-01",
    ageRating: "P",
    country: "Nhật Bản",
    isSeries: true,
    onGoing: true,
    createdTime: "2025-01-01",
    uploadedTime: "2025-01-02",
    genres: ["Hài", "Phép Thuật", "Lãng Mạn", "Anime"]
  },
  {
    id: "100-girlfriends",
    title: "The 100 Girlfriends Who Really Love You",
    description: "Rentarou Aijou hẹn hò với 100 cô gái vì nếu bỏ lỡ một người, cô ấy sẽ chết.",
    thumbnail: "https://static.nutscdn.com/vimg/0-0/bd747c4c97cb3ae132fe154cfd70a62c.jpg",
    releaseDate: "2023-09-01",
    ageRating: "P",
    country: "Nhật Bản",
    isSeries: true,
    onGoing: true,
    createdTime: "2025-01-01",
    uploadedTime: "2025-01-02",
    genres: [ "Lãng Mạn", "Anime"]
  },
  {
    id: "sakamoto-days",
    title: "SAKAMOTO DAYS",
    description: "Sakamoto – sát thủ huyền thoại – nay đã gác kiếm, sống đời thường.",
    thumbnail: "https://static.nutscdn.com/vimg/0-0/ce411bcecf54c431839a776d1762bc83.jpg",
    releaseDate: "2023-09-01",
    ageRating: "P",
    country: "Nhật Bản",
    isSeries: true,
    onGoing: true,
    createdTime: "2025-01-01",
    uploadedTime: "2025-01-02",
    genres: ["Hành Động", "Anime"]
  },
  {
    id: "nobody-remembers",
    title: "Why Does Nobody Remember Me in This World?",
    description: "Kai là người duy nhất nhớ về thế giới cũ nơi con người chiến thắng.",
    thumbnail: "https://static.nutscdn.com/vimg/0-0/8edd6d53b882d4ecb09d642830ba3d1f.jpg",
    releaseDate: "2023-09-01",
    ageRating: "P",
    country: "Nhật Bản",
    isSeries: true,
    onGoing: true,
    createdTime: "2025-01-01",
    uploadedTime: "2025-01-02",
    genres: ["Tâm Lý", "Hành Động", "Anime"]
  },
];

const filterOptions = {
  country: ["Tất cả", "Anh", "Canada", "Hàn Quốc", "Mỹ", "Nhật Bản"],
  type: ["Tất cả", "Phim lẻ", "Phim bộ"],
  rating: ["Tất cả", "P", "K", "T13", "T16", "T18"],
  year: ["Tất cả", "2025", "2024", "2023", "2022", "2021", "2020"],
  genre: [
    "Tất cả", "Anime", "Hành Động", "Hài", "Kinh Dị", "Tâm Lý",
    "Lãng Mạn", "Viễn Tưởng", "Phiêu Lưu", "Phép Thuật", "Khoa Học",
  ],
};

const SearchResults = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q")?.toLowerCase() || "";

  const [filters, setFilters] = useState({
    country: "Tất cả",
    type: "Tất cả",
    rating: "Tất cả",
    year: "Tất cả",
    genre: "Tất cả",
  });

  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredResults = unifiedData.filter((film) => {
    return (
      film.title.toLowerCase().includes(query) &&
      (filters.country === "Tất cả" || film.country === filters.country) &&
      (filters.type === "Tất cả" ||
        (filters.type === "Phim bộ" && film.isSeries) ||
        (filters.type === "Phim lẻ" && !film.isSeries)) &&
      (filters.rating === "Tất cả" || film.ageRating === filters.rating) &&
      (filters.year === "Tất cả" || film.releaseDate.startsWith(filters.year)) &&
      (filters.genre === "Tất cả" || film.genres.includes(filters.genre))
    );
  });

  return (
    <div className="lg:pt-[7%] sm:p-[5%] px-1 md:px-2 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl md:text-3xl text-purple-400 font-semibold">
          Kết quả tìm kiếm:{" "}
          <span className="italic text-white">{query}</span>
        </h2>
      </div>
      <button
        onClick={() => setShowFilters((prev) => !prev)}
        className="flex items-center py-5 gap-2 text-sm text-purple-400 hover:text-purple-300 transition"
      >
        <Filter size={18} />
        <span className="hidden sm:inline">Lọc</span>
      </button>

      {showFilters && (
        <div className="bg-[#2b2e45c8] p-4 rounded-lg mb-6 shadow-inner space-y-4 text-sm">
          {Object.entries(filterOptions).map(([key, options]) => (
            <div key={key}>
              <p className="text-gray-300 mb-1 font-medium capitalize">{key}:</p>
              <div className="flex flex-wrap gap-2">
                {options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleFilterChange(key, opt)}
                    className={`px-3 py-1 rounded-xl border transition-colors duration-200 ${
                      filters[key as keyof typeof filters] === opt
                        ? "border-purple-500 text-purple-400"
                        : "bg-transparent border-transparent text-gray-300 hover:text-purple-400"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={() =>
              setFilters({
                country: "Tất cả",
                type: "Tất cả",
                rating: "Tất cả",
                year: "Tất cả",
                genre: "Tất cả",
              })
            }
            className="text-xs text-red-400 hover:text-red-300 border border-red-400 px-2 py-1 rounded-md transition"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      )}

      {filteredResults.length === 0 ? (
        <p className="text-gray-400 text-lg">Không tìm thấy phim nào phù hợp.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredResults.map((film) => (
            <Link
              key={film.id}
              to={`/preview/${film.id}`}
              className="group relative bg-[#1f2027] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={film.thumbnail}
                  alt={film.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition" />
              </div>
              <div className="p-4">
                <h3 className="text-white text-lg font-semibold truncate">
                  {film.title}
                </h3>
                <p className="mt-1 text-gray-400 text-sm">
                  {film.releaseDate} • {film.ageRating}
                </p>
              </div>
              <button className="absolute top-3 right-3 bg-purple-500 p-2 rounded-full opacity-0 group-hover:opacity-100 transition">
                ▶
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
