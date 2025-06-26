import { useQuery } from "@tanstack/react-query";
import { getAllShows, getSeasonsByShowId, getEpisodesBySeasonId, getGenresByShow } from "@/lib/api";
import type { Show } from "@/lib/types/Show";
import type { Season } from "@/lib/types/Season";
import type { Episode } from "@/lib/types/Episode";
import type { Genre } from "@/lib/types/Genre";

// Interface cho dữ liệu phim đầy đủ (bao gồm seasons và episodes)
export interface MovieWithDetails extends Show {
  seasons?: (Season & { episodes?: Episode[] })[];
  genres?: Genre[];
  tags?: string[];
}

// Custom hook để lấy tất cả dữ liệu phim
export const useAllMoviesData = () => {
  return useQuery({
    queryKey: ["all-movies-with-details"],
    queryFn: async (): Promise<MovieWithDetails[]> => {
      // Lấy danh sách tất cả shows
      const shows = await getAllShows();
      
      // Với mỗi show, lấy thêm seasons và episodes
      const moviesWithDetails = await Promise.all(        shows.map(async (show) => {
          try {
            // Lấy seasons cho show này
            const seasons = await getSeasonsByShowId(show.id);
            
            // Lấy genres cho show này
            const genres = await getGenresByShow(show.id);
            
            // Với mỗi season, lấy episodes
            const seasonsWithEpisodes = await Promise.all(
              seasons.map(async (season) => {
                try {
                  const episodes = await getEpisodesBySeasonId(season.id);
                  return { ...season, episodes };
                } catch (error) {
                  console.error(`Error loading episodes for season ${season.id}:`, error);
                  return { ...season, episodes: [] };
                }
              })
            );
            
            return {
              ...show,
              seasons: seasonsWithEpisodes,
              genres: genres,
              tags: [] // Có thể thêm logic để lấy tags nếu API hỗ trợ
            } as MovieWithDetails;
          } catch (error) {
            console.error(`Error loading details for show ${show.id}:`, error);
            return {
              ...show,
              seasons: [],
              genres: [],
              tags: []
            } as MovieWithDetails;
          }
        })
      );
      
      return moviesWithDetails;
    },
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 phút
    gcTime: 10 * 60 * 1000, // 10 phút
    // Chỉ fetch nếu cần thiết
    refetchOnWindowFocus: false,
  });
};

// Custom hook để lấy chi tiết một phim cụ thể
export const useMovieDetails = (showId: string | undefined) => {
  return useQuery({
    queryKey: ["movie-details", showId],
    queryFn: async (): Promise<MovieWithDetails | null> => {
      if (!showId) return null;
      
      try {        // Lấy thông tin show
        const { getShowById } = await import("@/lib/api");
        const show = await getShowById(showId);
        
        // Lấy seasons
        const seasons = await getSeasonsByShowId(showId);
        
        // Lấy genres
        const genres = await getGenresByShow(showId);
        
        // Lấy episodes cho mỗi season
        const seasonsWithEpisodes = await Promise.all(
          seasons.map(async (season) => {
            try {
              const episodes = await getEpisodesBySeasonId(season.id);
              return { ...season, episodes };
            } catch (error) {
              console.error(`Error loading episodes for season ${season.id}:`, error);
              return { ...season, episodes: [] };
            }
          })
        );
        
        return {
          ...show,
          seasons: seasonsWithEpisodes,
          genres: genres,
          tags: []
        } as MovieWithDetails;
      } catch (error) {
        console.error(`Error loading movie details for ${showId}:`, error);
        throw error;
      }
    },
    enabled: !!showId, // Chỉ chạy khi có showId
    retry: 2,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
