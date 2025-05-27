import { PiInfoBold } from "react-icons/pi";

const MovieInfoCard = () => {
  return (
    <div className="bg-[#23263a] text-white p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-8 items-start w-full">
      {/* Poster */}
      <img
        src="https://static.nutscdn.com/vimg/0-0/27191f4250dd4757f67cc34a119b5c9f.jpg"
        alt="Lãnh Địa Tử Chiến"
        className="w-[100px] h-[140px] sm:w-[120px] sm:h-[170px] object-cover rounded-lg shadow-md mx-auto sm:mx-0"
      />

      {/* Main Info + Description */}
      <div className="flex-1 flex flex-col gap-2 min-w-[180px] sm:min-w-[250px]">
        {/* Main Info */}
        <div>
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <h1 className="text-2xl sm:text-4xl font-bold">
              Lãnh Địa Tử Chiến
            </h1>
          </div>
          <p className="text-yellow-400 font-semibold text-base sm:text-lg">
            MobLand
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-2 text-xs sm:text-sm">
            <span className="border border-yellow-500 px-2 py-0.5 rounded text-yellow-500 font-semibold">
              IMDb 8.5
            </span>
            <span className="bg-yellow-400 text-black px-2 py-0.5 rounded font-semibold">
              4K
            </span>
            <span className="bg-white text-black px-2 py-0.5 rounded font-semibold">
              T16
            </span>
            <span className="bg-[#2f3147] px-2 py-0.5 rounded">2025</span>
            <span className="bg-[#2f3147] px-2 py-0.5 rounded">Phần 1</span>
            <span className="bg-[#2f3147] px-2 py-0.5 rounded">Tập 9</span>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mt-2 text-xs">
            <span className="bg-[#2f3147] px-2 py-0.5 rounded">Chính Kịch</span>
            <span className="bg-[#2f3147] px-2 py-0.5 rounded">Hành Động</span>
            <span className="bg-[#2f3147] px-2 py-0.5 rounded">Gay Cấn</span>
            <span className="bg-[#2f3147] px-2 py-0.5 rounded">Hình Sự</span>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 mt-4">
            <span className="bg-[#2a1e1c] text-orange-400 px-4 py-1 rounded-full text-xs sm:text-sm flex items-center gap-2">
              🕒 Đã chiếu: 9 / 10 tập
            </span>
          </div>
        </div>

        {/* Description  */}
        <div className="text-xs sm:text-sm text-gray-300 leading-relaxed min-w-[180px] sm:min-w-[250px] max-w-full sm:max-w-[420px] mt-4 sm:mt-6">
          <div className="line-clamp-4">
            Hai gia tộc tội phạm khét tiếng ở London, nhà Harrigan và nhà
            Stevenson, lao vào cuộc chiến sống còn để giành quyền kiểm soát thế
            giới ngầm. Trong khi bạo lực leo thang, Harry Da Souza – một "fixer"
            đầy mưu mô – bị cuốn vào cuộc chiến quyền lực tàn khốc này. Khi c...
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
