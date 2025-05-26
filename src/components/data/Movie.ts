export interface MovieItem {
  id: string;
  title: string;
  image: string;
  year: string;
  seasons: string;
  rating: string;
  genre: string;
  content: string;
  type: "film" | "anime";
  episodes?: {
    title: string;
    thumbnail: string;
  }[];
  seasonsData?: {
    season: number;
    episodes: {
      title: string;
      thumbnail: string;
    }[];
  }[];
}
