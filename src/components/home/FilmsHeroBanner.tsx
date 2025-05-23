import HeroBanner from "../HeroBanner";

const filmsData = [
  {
    title: "Desperate Mrs. Seonju",
    image:
      "https://static.nutscdn.com/vimg/0-0/c26ee8c37b3ab8ed47a748285e648c1e.jpg",
    content:
      "A woman who is the only survivor of a plane crash is forced to live with a man who has a dark past.",
    year: "2023",
    seasons: "1",
    rating: "PG-13",
  },
  {
    title: "Star Wars Andor",
    image:
      "https://static.nutscdn.com/vimg/0-0/28db6d830e7a420abb2cd7e0225ef0cc.jpg",
    content:
      "The story of the burgeoning rebellion against the Empire and how people and planets became involved.",
    year: "2024420244",
    seasons: "1",
    rating: "PG",
  },
  {
    title: "Final Destination Bloodlines",
    image:
      "https://static.nutscdn.com/vimg/0-0/321b0537ce9d3d6ad123d95f8d73d2ad.jpg",
    content: "Death returns in a new chapter of the Final Destination saga.",
    year: "2025",
    seasons: "3",
    rating: "PG-18",
  },
  {
    title: "Inception",
    image:
      "https://static.nutscdn.com/vimg/0-0/53e2087e18e852bc6e74677dd02b2d1c.jpg",
    content:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.",
    year: "2010",
    seasons: "1",
    rating: "PG-13",
  },
  {
    title: "Interstellar",
    image:
      "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    content:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    year: "2014",
    seasons: "1",
    rating: "PG-13",
  },
  {
    title: "The Dark Knight",
    image:
      "https://static.nutscdn.com/vimg/0-0/8b3593ae6cd2c3d39d65d38246458980.jpg",
    content:
      "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and DA Harvey Dent, Batman sets out to dismantle the remaining criminal organizations.",
    year: "2008",
    seasons: "1",
    rating: "PG-13",
  },
];

const FilmsHeroBanner = () => {
  return <HeroBanner items={filmsData} />;
};

export default FilmsHeroBanner;
