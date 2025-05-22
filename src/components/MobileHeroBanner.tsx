import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { FaPlayCircle } from "react-icons/fa";

const moviePosters = [
  {
    title: "Joker",
    image: "https://image.tmdb.org/t/p/w500/8u0QBGUbZcBW59VEAdmeFl9g98N.jpg",
    category: "Crime, Drama, Thriller. Datasat, Dolby Digital",
    categorymain: "Action",
    rating: "5.0",
  },
  {
    title: "Alien",
    image: "https://m.media-amazon.com/images/I/71g81iiCupL.jpg",
    category: "Horror, Sci-Fi",
    categorymain: "Drama",
    rating: "3.7",
  },
  {
    title: "Star Wars",
    image: "https://image.tmdb.org/t/p/w500/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg",
    category: "Action, Adventure, Fantasy",
    categorymain: "Action",
    rating: "4.5",
  },
  {
    title: "Wednesday",
    image: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
    category: "Comedy, Drama, Fantasy",
    categorymain: "Drama",
    rating: "4.8",
  },
  {
    title: "Godzilla",
    image: "https://image.tmdb.org/t/p/w500/pU3bnutJU91u3b4IeRPQTOP8jhV.jpg",
    category: "Action, Adventure, Sci-Fi",
    categorymain: "Action",
    rating: "4.2",
  },
  {
    title: "Harley Quinn",
    image: "https://m.media-amazon.com/images/I/71-6ttsgzVL._AC_SL1500_.jpg",
    category: "Action, Adventure, Comedy",
    categorymain: "Comedy",
    rating: "3.9",
  },
  {
    title: "Avengers",
    image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    category: "Action, Adventure, Fantasy",
    categorymain: "Action",
    rating: "4.7",
  },
];

const MobileHeroBanner: React.FC = () => {
  return (
    <div className="w-full h-[70vh] bg-[#111] flex items-center justify-center overflow-hidden px-0">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1.1}
        loop={true}
        modules={[EffectCoverflow]}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 120,
          modifier: 1.5,
          slideShadows: false,
        }}
        className="w-full max-w-xs sm:max-w-md h-[420px]"
      >
        {moviePosters.map((movie, index) => (
          <SwiperSlide
            key={index}
            className="rounded-xl overflow-hidden shadow-lg"
          >
            <div className="relative w-full h-[420px] ">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-full object-cover rounded-xl "
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-center justify-center text-center px-6 top-50">
                {/* Play button */}
                <div className="flex flex-col items-center mb-4">
                  <button className="hover:bg-white/50 transition rounded-full p-3 ">
                    <FaPlayCircle className="text-3xl text-white" />
                  </button>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 rounded text-white border border-white/30">
                      New
                    </span>
                    <span className="text-xs px-2 py-1 rounded text-white border border-white/30">
                      Movie
                    </span>
                  </div>
                </div>

                {/* Movie info */}
                <h2 className="text-2xl font-bold text-white mb-2">
                  {movie.title}
                </h2>
                <p className="text-sm text-gray-200 mb-2">{movie.category}</p>
                <div className="flex items-center gap-4">
                  <span className="bg-white/20 text-xs px-2 py-1 rounded text-white">
                    {movie.categorymain}
                  </span>
                  <span className="flex items-center text-white text-sm">
                    <svg
                      className="w-4 h-4 text-yellow-400 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <polygon points="10,1 12,7 18,7 13,11 15,17 10,13 5,17 7,11 2,7 8,7" />
                    </svg>
                    {movie.rating}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MobileHeroBanner;
