import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

const moviePosters = [
  {
    title: "Joker",
    image: "https://image.tmdb.org/t/p/w500/8u0QBGUbZcBW59VEAdmeFl9g98N.jpg",
  },
  {
    title: "Alien",
    image: "https://m.media-amazon.com/images/I/71g81iiCupL.jpg",
  },
  {
    title: "Star Wars",
    image: "https://image.tmdb.org/t/p/w500/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg",
  },
  {
    title: "Wednesday",
    image: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
  },
  {
    title: "Godzilla",
    image: "https://image.tmdb.org/t/p/w500/pU3bnutJU91u3b4IeRPQTOP8jhV.jpg",
  },
  {
    title: "Harley Quinn",
    image: "https://m.media-amazon.com/images/I/71-6ttsgzVL._AC_SL1500_.jpg",
  },
  {
    title: "Avengers",
    image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
  },
];

const MobileHeroBanner: React.FC = () => {
  return (
    <div className="w-full h-[70vh] bg-[#111] flex items-center justify-center overflow-hidden px-0">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1.5}
        loop={true}
        modules={[EffectCoverflow]}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 120,
          modifier: 1.5,
          slideShadows: false,
        }}
        className="w-full max-w-md h-[420px]"
      >
        {moviePosters.map((movie, index) => (
          <SwiperSlide
            key={index}
            className="rounded-xl overflow-hidden shadow-lg"
          >
            <div className="relative w-full h-[420px]">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-white/20 text-xs px-2 py-1 rounded text-white">
                    New
                  </span>
                  <span className="bg-white/20 text-xs px-2 py-1 rounded text-white">
                    Movie
                  </span>
                  <button className="ml-2 bg-white/30 rounded-full p-2">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <polygon points="7,5 15,10 7,15" />
                    </svg>
                  </button>
                </div>
                <h2 className="text-3xl font-bold text-white">{movie.title}</h2>
                <p className="text-sm text-gray-200 mt-1">
                  Crime, Drama, Thriller. Datasat, Dolby Digital
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="bg-yellow-600 text-xs px-2 py-1 rounded text-white">
                    Action
                  </span>
                  <span className="flex items-center text-white text-sm">
                    <svg
                      className="w-4 h-4 text-yellow-400 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <polygon points="10,1 12,7 18,7 13,11 15,17 10,13 5,17 7,11 2,7 8,7" />
                    </svg>
                    5.0
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
