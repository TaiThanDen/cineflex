import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import { FaPlayCircle } from "react-icons/fa";

interface MovieItem {
    title: string;
    image: string;
    category: string;
    categorymain: string;
    rating: string;
}

interface MobileHeroBannerProps {
    data: MovieItem[];
}

const MobileHeroBanner = ({ data } : MobileHeroBannerProps) => {
    return (
        <div className="w-full h-[80vh] bg-[#23263a] flex items-center justify-center overflow-hidden px-0">
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
                {data.map((movie, index) => (
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
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col items-center justify-center text-center px-6">
                                <div className="flex flex-col items-center mb-4 mt-40">
                                    <button className="hover:bg-white/50 transition rounded-full p-3">
                                        <FaPlayCircle className="text-3xl text-white" />
                                    </button>
                                    <div className="flex gap-2 ">
                                        <span className="text-xs px-2 py-1 rounded text-white border border-white/30">
                                            New
                                        </span>
                                        <span className="text-xs px-2 py-1 rounded text-white border border-white/30">
                                            Movie
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h2 className="text-2xl font-bold text-white mb-2">
                                        {movie.title}
                                    </h2>
                                    <p className="text-sm text-gray-200 mb-2">{movie.category}</p>
                                    <div className="flex items-center justify-center gap-4">
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
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MobileHeroBanner;
