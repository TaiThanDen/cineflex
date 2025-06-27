import { useQueryClient } from "@tanstack/react-query";

/**
 * Hook tùy chỉnh để refresh/invalidate tất cả dữ liệu movies
 * Sử dụng khi cần force refresh UI sau khi thêm/sửa/xóa
 */
export const useRefreshMovieData = () => {
  const queryClient = useQueryClient();

  const refreshAllMovieData = () => {
    // Invalidate tất cả các query liên quan đến movies
    queryClient.invalidateQueries({ queryKey: ["all-movies-with-details"] });
    queryClient.invalidateQueries({ queryKey: ["movies"] });
    queryClient.invalidateQueries({ queryKey: ["movie"] });
    queryClient.invalidateQueries({ queryKey: ["seasons"] });
    queryClient.invalidateQueries({ queryKey: ["episodes"] });
  };

  const refreshSpecificMovie = (movieId: string) => {
    queryClient.invalidateQueries({ queryKey: ["movie", movieId] });
    queryClient.invalidateQueries({ queryKey: ["all-movies-with-details"] });
  };

  const refreshSeasonData = (seasonId: string) => {
    queryClient.invalidateQueries({ queryKey: ["episodes", seasonId] });
    queryClient.invalidateQueries({ queryKey: ["seasons"] });
    queryClient.invalidateQueries({ queryKey: ["all-movies-with-details"] });
  };

  return {
    refreshAllMovieData,
    refreshSpecificMovie,
    refreshSeasonData,
  };
};
