import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const sideBanner =
  "https://m.media-amazon.com/images/M/MV5BMTM0ZGIzZmQtYTgyZC00MmJiLTkxZjItOWQyYzViMmI3ZDQzXkEyXkFqcGc@._V1_.jpg";
const adBanners = [
  "https://collider.com/wp-content/uploads/the-avengers-movie-poster-banners-04.jpg",
  "https://i0.wp.com/teaser-trailer.com/wp-content/uploads/2019/01/Polar-new-banner.jpg?ssl=1",
  "https://samfillingham.com/wp-content/uploads/2020/05/2200-1000px-banner-Muna-1310x595.jpg",
];

const AdsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const redirectTo = location.state?.redirectTo || "/watch";

  useEffect(() => {
    // Có thể thêm logic đếm ngược hoặc hiệu ứng nếu muốn
  }, []);

  const handleWatch = () => {
    sessionStorage.setItem("adsWatched", "true");
    navigate(redirectTo);
  };

  return (
    <div className="min-h-screen bg-[#181a20] flex flex-row justify-center items-start relative">
      {/* Banner trái fixed sát màn hình */}
      <div className="hidden md:block fixed left-18 top-16 h-screen w-[240px] z-30 flex items-center justify-center">
        <img
          src={sideBanner}
          alt="Banner Left"
          className="h-[90vh] w-auto rounded-xl shadow-lg object-cover"
        />
      </div>
      {/* Banner phải fixed sát màn hình */}
      <div className="hidden md:block fixed right-6 top-16 h-screen w-[240px] z-30 flex items-center justify-center">
        <img
          src={sideBanner}
          alt="Banner Right"
          className="h-[90vh] w-auto rounded-xl shadow-lg object-cover"
        />
      </div>
      {/* Cột giữa */}
      <div className="flex-1 flex flex-col items-center justify-start pt-10 pb-18 px-2 max-w-[920px] mx-auto md:mx-[140px]">
        <h2 className="text-3xl font-bold text-white mb-8 mt-4">
          🎬 Quảng cáo
        </h2>
        <div className="flex flex-col gap-8 w-full">
          {adBanners.map((src) => (
            <div className="bg-[#23263a] rounded-2xl shadow-xl p-4 flex flex-col items-center">
              <img
                src={src}
                alt={`Ad Banner`}
                className="w-full max-h-72 object-cover rounded-xl mb-2"
              />
              <div className="text-white text-center font-semibold">
                Movie Poster Designer | Digital Composites, Key Art, Movies &
                Advertising
              </div>
            </div>
          ))}
        </div>
        <div className="h-6" />
        <div className="w-full flex justify-center mt-10">
          <button
            onClick={handleWatch}
            className="bg-purple-500 text-[#fff] font-bold px-10 py-4 rounded-2xl text-xl shadow-lg hover:scale-105 transition"
          >
            Xem phim
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdsPage;
