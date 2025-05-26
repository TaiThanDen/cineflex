import type { MovieItem } from "./Movie";

export interface AnimeItem extends MovieItem {
  episodes: {
    title: string;
    thumbnail: string;
  }[];
}
