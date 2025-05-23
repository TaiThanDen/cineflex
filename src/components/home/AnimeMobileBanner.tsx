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
    title: "Witch Watch",
    image:
      "https://static.nutscdn.com/vimg/0-0/6ac4c22c54d138af06162a3d080612a2.jpg",
    category: "Horror, Sci-Fi",
    categorymain: "Drama",
    rating: "3.7",
  },
  {
    title: "GUILTY GEAR STRIVE: DUAL RULERS",
    image:
      "https://static.nutscdn.com/vimg/0-0/56e42ecd12a0f7d54994b2fd7c9b853a.jpg",
    category: "Action, Adventure, Fantasy",
    categorymain: "Action",
    rating: "4.5",
  },
  {
    title:
      "The 100 Girlfriends Who Really Really Really Really Really Love You",
    image:
      "https://static.nutscdn.com/vimg/0-0/bd747c4c97cb3ae132fe154cfd70a62c.jpg",
    category: "Comedy, Drama, Romance",
    categorymain: "Drama",
    rating: "4.8",
  },
  {
    title: "SAKAMOTO DAYS",
    image:
      "https://static.nutscdn.com/vimg/0-0/ce411bcecf54c431839a776d1762bc83.jpg",
    category: "Action, Comedy, Drama",
    categorymain: "Action",
    rating: "4.9",
  },
  {
    title: "Why Does Nobody Remember Me in This World?",
    image:
      "https://static.nutscdn.com/vimg/0-0/8edd6d53b882d4ecb09d642830ba3d1f.jpg",
    category: "Action, Dark Fantasy, Isekai",
    categorymain: "Action",
    rating: "4.3",
  },
];

const FilmsMobileBanner: React.FC = () => {
  return <MobileHeroBanner data={defaultMovies} />;
};

export default FilmsMobileBanner;
