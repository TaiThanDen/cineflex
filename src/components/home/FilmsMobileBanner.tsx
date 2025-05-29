import MobileHeroBanner from "../MobileHeroBanner";

const defaultMovies = [
  {
    title: "demonic-slash",
    image: "https://image.tmdb.org/t/p/w500/8u0QBGUbZcBW59VEAdmeFl9g98N.jpg",
    category: "Crime, Drama, Thriller. Datasat, Dolby Digital",
    categorymain: "Action",
    rating: "5.0",
  },
  {
    title: "interstellar",
    image: "https://m.media-amazon.com/images/I/71g81iiCupL.jpg",
    category: "Horror, Sci-Fi",
    categorymain: "Drama",
    rating: "3.7",
  },
  {
    title: "sun-warriors",
    image: "https://image.tmdb.org/t/p/w500/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg",
    category: "Action, Adventure, Fantasy",
    categorymain: "Action",
    rating: "4.5",
  },
  {
    title: "desperate-mrs-seonju",
    image: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
    category: "Comedy, Drama, Fantasy",
    categorymain: "Drama",
    rating: "4.8",
  },
  {
    title: "inception",
    image: "https://image.tmdb.org/t/p/w500/pU3bnutJU91u3b4IeRPQTOP8jhV.jpg",
    category: "Action, Adventure, Sci-Fi",
    categorymain: "Action",
    rating: "4.2",
  },
  {
    title: "inception",
    image: "https://m.media-amazon.com/images/I/71-6ttsgzVL._AC_SL1500_.jpg",
    category: "Action, Adventure, Comedy",
    categorymain: "Comedy",
    rating: "3.9",
  },
  {
    title: "inception",
    image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    category: "Action, Adventure, Fantasy",
    categorymain: "Action",
    rating: "4.7",
  },
];

const FilmsMobileBanner = () => {
  return <MobileHeroBanner data={defaultMovies} title="Popular Movie " />;
};

export default FilmsMobileBanner;
