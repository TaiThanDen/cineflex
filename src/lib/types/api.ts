// ======================== API RESPONSE TYPES ========================

export interface Genre {
  id: string;
  name: string;
}

export interface Show {
  id: string;
  title: string;
  description: string;
  releaseDate: string;
  thumbnail: string;
  onGoing: boolean;
  isSeries: boolean;
  ageRating: string;
}

export interface Season {
  id: string;
  title: string;
  releaseDate: string;
  description: string;
  show: string; // showId
}

export interface Episode {
  id: string;
  title: string;
  number: string;
  description: string;
  url: string;
  releaseDate: string;
  duration: number; // in minutes
  openingStart: number;
  openingEnd: number;
  season: string; // seasonId
}

export interface Comment {
  id: string;
  content: string;
  account: string; // accountId
  episode: string; // episodeId
  createdAt: string;
}

// ======================== API REQUEST TYPES ========================

export interface CreateShowRequest {
  title: string;
  description: string;
  releaseDate: string;
  thumbnail: string;
  onGoing: boolean;
  isSeries: boolean;
  ageRating: string;
}

export interface UpdateShowRequest {
  id: string;
  title?: string;
  description?: string;
  releaseDate?: string;
  thumbnail?: string;
  onGoing?: boolean;
  isSeries?: boolean;
  ageRating?: string;
}

export interface CreateSeasonRequest {
  title: string;
  releaseDate: string;
  description: string;
}

export interface UpdateSeasonRequest {
  id: string;
  title?: string;
  releaseDate?: string;
  description?: string;
  show?: string;
}

export interface CreateEpisodeRequest {
  title: string;
  number: string;
  description: string;
  url: string;
  releaseDate: string;
  duration: number;
  openingStart?: number;
  openingEnd?: number;
}

export interface UpdateEpisodeRequest {
  id: string;
  title?: string;
  number?: string;
  description?: string;
  url?: string;
  releaseDate?: string;
  duration?: number;
  openingStart?: number;
  openingEnd?: number;
}

export interface CreateGenreRequest {
  name: string;
}

// ======================== UI FORM TYPES ========================

export interface ShowFormData {
  title: string;
  description: string;
  releaseDate: string;
  thumbnail: string;
  onGoing: boolean;
  isSeries: boolean;
  ageRating: string;
  genreIds: string[];
}

export interface SeasonFormData {
  title: string;
  releaseDate: string;
  description: string;
}

export interface EpisodeFormData {
  title: string;
  number: string;
  description: string;
  url: string;
  releaseDate: string;
  duration: string; // Will be converted to number
  openingStart?: number;
  openingEnd?: number;
}

export interface GenreFormData {
  name: string;
}

// ======================== EXTENDED TYPES FOR UI ========================

export interface ShowWithSeasons extends Show {
  seasons?: Season[];
}

export interface SeasonWithEpisodes extends Season {
  episodes?: Episode[];
}

// ======================== API RESPONSE COLLECTION TYPES ========================

export interface ShowsResponse {
  data: Show[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface SeasonsResponse {
  data: Season[];
}

export interface EpisodesResponse {
  data: Episode[];
}

export interface GenresResponse {
  data: Genre[];
}
