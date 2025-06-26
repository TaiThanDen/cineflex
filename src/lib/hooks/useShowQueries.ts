import { useQuery } from "@tanstack/react-query";
import { 
  getAllShows, 
  getShowById, 
  getShowSeasons, 
  getSeasonEpisodes,
  searchShows
} from "../api/seasonApi";
import type { Show, Season, Episode } from "../types/api";

// ======================== SHOW QUERIES ========================

/**
 * Hook để lấy tất cả shows với phân trang
 */
export const useAllShows = (page: number = 1, limit: number = 10, genres?: string[]) => {
  return useQuery<Show[]>({
    queryKey: ["all-shows", page, limit, genres],
    queryFn: () => getAllShows(page, limit, genres),
    staleTime: 5 * 60 * 1000, // 5 phút
    gcTime: 10 * 60 * 1000, // 10 phút
  });
};

/**
 * Hook để lấy chi tiết show theo ID
 */
export const useShowDetails = (showId: string | undefined) => {
  return useQuery<Show>({
    queryKey: ["show-details", showId],
    queryFn: () => getShowById(showId!),
    enabled: !!showId,
    staleTime: 5 * 60 * 1000, // 5 phút
    gcTime: 10 * 60 * 1000, // 10 phút
  });
};

/**
 * Hook để lấy seasons của một show
 */
export const useShowSeasons = (showId: string | undefined) => {
  return useQuery<Season[]>({
    queryKey: ["show-seasons", showId],
    queryFn: () => getShowSeasons(showId!),
    enabled: !!showId,
    staleTime: 5 * 60 * 1000, // 5 phút
    gcTime: 10 * 60 * 1000, // 10 phút
  });
};

/**
 * Hook để tìm kiếm shows
 */
export const useSearchShows = (query: string, page: number = 1, limit: number = 10) => {
  return useQuery<Show[]>({
    queryKey: ["search-shows", query, page, limit],
    queryFn: () => searchShows(query, page, limit),
    enabled: query.trim().length > 0,
    staleTime: 2 * 60 * 1000, // 2 phút
    gcTime: 5 * 60 * 1000, // 5 phút
  });
};

// ======================== SEASON QUERIES ========================

/**
 * Hook để lấy episodes của một season
 */
export const useSeasonEpisodes = (seasonId: string | undefined) => {
  return useQuery<Episode[]>({
    queryKey: ["season-episodes", seasonId],
    queryFn: () => getSeasonEpisodes(seasonId!),
    enabled: !!seasonId,
    staleTime: 5 * 60 * 1000, // 5 phút
    gcTime: 10 * 60 * 1000, // 10 phút
  });
};

// ======================== COMPOUND HOOKS ========================

/**
 * Hook tổng hợp để lấy tất cả dữ liệu cần thiết cho trang quản trị phim
 */
export const useMovieAdminData = (showId?: string, seasonId?: string) => {
  const showsQuery = useAllShows();
  const showDetailsQuery = useShowDetails(showId);
  const showSeasonsQuery = useShowSeasons(showId);
  const seasonEpisodesQuery = useSeasonEpisodes(seasonId);

  return {
    shows: showsQuery,
    showDetails: showDetailsQuery,
    showSeasons: showSeasonsQuery,
    seasonEpisodes: seasonEpisodesQuery,
    
    // Loading states
    isLoading: showsQuery.isLoading || showDetailsQuery.isLoading || 
               showSeasonsQuery.isLoading || seasonEpisodesQuery.isLoading,
    
    // Error states  
    hasError: showsQuery.isError || showDetailsQuery.isError ||
              showSeasonsQuery.isError || seasonEpisodesQuery.isError,
  };
};
