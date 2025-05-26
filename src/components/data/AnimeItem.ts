import type { MovieItem } from "./Movie";

export interface AnimeItem extends MovieItem {
  episodes: {
    title: string;
    thumbnail: string;
  }[]; // đảm bảo không được undefined
}
