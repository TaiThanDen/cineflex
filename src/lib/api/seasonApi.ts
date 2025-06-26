import { get, post, put, del } from '../request';
import type { Show, Season, Episode, Genre } from '../types/api';

// ======================== INTERFACES ========================

export interface CreateShowRequest {
  title: string;
  description: string;
  releaseDate: string;
  thumbnail: string;
  onGoing: boolean;
  isSeries: boolean;
  ageRating: string;
  genreIds: string[];
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
  genreIds?: string[];
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
  duration: number; // in minutes
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

// ======================== SHOW APIs ========================

/**
 * Lấy tất cả shows với phân trang và bộ lọc
 */
export const getAllShows = async (page: number = 1, limit: number = 10, genres?: string[]): Promise<Show[]> => {
  let url = `api/shows?page=${page}&limit=${limit}`;
  if (genres && genres.length > 0) {
    const genreParams = genres.map(g => `genres=${encodeURIComponent(g)}`).join('&');
    url += `&${genreParams}`;
  }
  return await get(url);
};

/**
 * Lấy show theo ID
 */
export const getShowById = async (showId: string): Promise<Show> => {
  return await get(`api/shows/${showId}`);
};

/**
 * Tạo show mới
 */
export const createShow = async (data: CreateShowRequest): Promise<Show> => {
  return await post('api/shows', data);
};

/**
 * Cập nhật show
 */
export const updateShow = async (data: UpdateShowRequest): Promise<Show> => {
  const { id, ...updateData } = data;
  return await put(`api/shows/${id}`, updateData);
};

/**
 * Xóa show
 */
export const deleteShow = async (showId: string): Promise<void> => {
  return await del(`api/shows/${showId}`);
};

/**
 * Lấy seasons của một show
 */
export const getShowSeasons = async (showId: string): Promise<Season[]> => {
  return await get(`api/shows/${showId}/seasons`);
};

/**
 * Thêm season vào show
 */
export const addSeasonToShow = async (showId: string, data: CreateSeasonRequest): Promise<Season> => {
  return await post(`api/shows/${showId}/seasons`, data);
};

// ======================== SEASON APIs ========================

/**
 * Lấy season theo ID
 */
export const getSeasonById = async (seasonId: string): Promise<Season> => {
  return await get(`api/seasons/${seasonId}`);
};

/**
 * Cập nhật season
 */
export const updateSeason = async (data: UpdateSeasonRequest): Promise<Season> => {
  const { id, ...updateData } = data;
  return await put(`api/seasons/${id}`, updateData);
};

/**
 * Xóa season
 */
export const deleteSeason = async (seasonId: string): Promise<void> => {
  return await del(`api/seasons/${seasonId}`);
};

/**
 * Lấy episodes của một season
 */
export const getSeasonEpisodes = async (seasonId: string): Promise<Episode[]> => {
  return await get(`api/seasons/${seasonId}/episodes`);
};

/**
 * Thêm episode vào season
 */
export const addEpisodeToSeason = async (seasonId: string, data: CreateEpisodeRequest): Promise<Episode> => {
  return await post(`api/seasons/${seasonId}/episodes`, data);
};

// ======================== EPISODE APIs ========================

/**
 * Lấy episode theo ID
 */
export const getEpisodeById = async (episodeId: string): Promise<Episode> => {
  return await get(`api/episodes/${episodeId}`);
};

/**
 * Cập nhật episode
 */
export const updateEpisode = async (data: UpdateEpisodeRequest): Promise<Episode> => {
  const { id, ...updateData } = data;
  return await put(`api/episodes/${id}`, updateData);
};

/**
 * Xóa episode
 */
export const deleteEpisode = async (episodeId: string): Promise<void> => {
  return await del(`api/episodes/${episodeId}`);
};

/**
 * Lấy comments của episode
 */
export const getEpisodeComments = async (episodeId: string): Promise<any[]> => {
  return await get(`api/episodes/${episodeId}/comments`);
};

// ======================== GENRE APIs ========================

/**
 * Lấy tất cả genres
 */
export const getAllGenres = async (): Promise<Genre[]> => {
  return await get('api/genres');
};

/**
 * Tạo genre mới
 */
export const createGenre = async (data: CreateGenreRequest): Promise<Genre> => {
  return await post('api/genres', data);
};

/**
 * Lấy genre theo ID
 */
export const getGenreById = async (genreId: string): Promise<Genre> => {
  return await get(`api/genres/${genreId}`);
};

/**
 * Cập nhật genre
 */
export const updateGenre = async (genreId: string, data: { name: string }): Promise<Genre> => {
  return await put(`api/genres/${genreId}`, data);
};

/**
 * Xóa genre
 */
export const deleteGenre = async (genreId: string): Promise<void> => {
  return await del(`api/genres/${genreId}`);
};

// ======================== SEARCH APIs ========================

/**
 * Tìm kiếm shows
 */
export const searchShows = async (query: string, page: number = 1, limit: number = 10): Promise<Show[]> => {
  return await get(`api/shows/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
};

/**
 * Lấy genres của một show
 */
export const getShowGenres = async (showId: string): Promise<Genre[]> => {
  return await get(`api/shows/${showId}/genres`);
};

/**
 * Thêm genres vào show
 */
export const addGenresToShow = async (showId: string, genreIds: string[]): Promise<Genre[]> => {
  return await post(`api/shows/${showId}/genres`, { genres: genreIds });
};

// ======================== UTILITY FUNCTIONS ========================

// ======================== UTILITY FUNCTIONS ========================

/**
 * Chuyển đổi duration từ string sang number (minutes)
 */
export const parseDuration = (durationStr: string): number => {
  const cleanStr = durationStr.toLowerCase().trim();
  
  // Patterns: "45 phút", "1h 30m", "90 min", etc.
  const patterns = [
    /(\d+)\s*h\s*(\d+)\s*m/i,           // "1h 30m"
    /(\d+)\s*(phút|p|min|m)$/i,         // "45 phút", "45 min"
    /(\d+)\s*(giờ|h)$/i,                // "2 giờ", "2h"
  ];

  // Check for "1h 30m" format
  const hourMinMatch = cleanStr.match(patterns[0]);
  if (hourMinMatch) {
    const hours = parseInt(hourMinMatch[1]);
    const minutes = parseInt(hourMinMatch[2]);
    return hours * 60 + minutes;
  }

  // Check for minutes only
  const minuteMatch = cleanStr.match(patterns[1]);
  if (minuteMatch) {
    return parseInt(minuteMatch[1]);
  }

  // Check for hours only
  const hourMatch = cleanStr.match(patterns[2]);
  if (hourMatch) {
    return parseInt(hourMatch[1]) * 60;
  }

  // Default fallback
  const numberMatch = cleanStr.match(/(\d+)/);
  return numberMatch ? parseInt(numberMatch[1]) : 0;
};

/**
 * Chuyển đổi duration từ number (minutes) sang string hiển thị
 */
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} phút`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} giờ`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
};
