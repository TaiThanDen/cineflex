import React from "react";
import MobileHeroBanner from "../MobileHeroBanner";

const defaultMovies = [
  {
    title: "Teogonia",
    image:
      "https://static.nutscdn.com/vimg/0-0/7aac45ead7eba60727e620d50e45ff5b.jpg",
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
  // thêm phim khác nếu cần
];

const FilmsMobileBanner: React.FC = () => {
  return <MobileHeroBanner data={defaultMovies} />;
};

export default FilmsMobileBanner;
