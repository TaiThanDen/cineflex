import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSeasonToShow, updateSeason, deleteSeason } from "@/lib/api";
import type { Season } from "@/lib/types/Season";

// Interface cho dữ liệu season từ form
export interface SeasonFormData {
  title: string;
  description: string;
  releaseDate: string;
  seasonNumber?: number;
  seasonType?: "regular" | "special" | "movie" | "ova" | "extra";
  isMainSeries?: boolean;
}

// Interface cho API request
interface SeasonApiData {
  title: string;
  releaseDate: string;
  description: string;
}

// Chuyển đổi dữ liệu từ form sang API format
const transformFormDataToApiData = (formData: SeasonFormData): SeasonApiData => {
  return {
    title: formData.title,
    releaseDate: formData.releaseDate,
    description: formData.description,
  };
};

export const useSeasonMutations = () => {
  const queryClient = useQueryClient();

  // Mutation để thêm season mới
  const addSeasonMutation = useMutation({
    mutationFn: async ({ showId, data }: { showId: string; data: SeasonFormData }) => {
      const apiData = transformFormDataToApiData(data);
      return addSeasonToShow(showId, apiData);
    },
    onSuccess: (newSeason: Season, variables) => {
      // Invalidate và refetch các query liên quan
      queryClient.invalidateQueries({ queryKey: ["seasons", variables.showId] });
      queryClient.invalidateQueries({ queryKey: ["seasons"] });
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      queryClient.invalidateQueries({ queryKey: ["movie"] });
      queryClient.invalidateQueries({ queryKey: ["all-movies-with-details"] });
      
      // Cập nhật cache nếu cần
      queryClient.setQueryData(
        ["seasons", variables.showId],
        (oldData: Season[] | undefined) => {
          if (oldData) {
            // Thêm season mới vào cuối danh sách thay vì sắp xếp theo ngày
            return [...oldData, newSeason];
          }
          return [newSeason];
        }
      );
    },
    onError: (error) => {
      console.error("Lỗi khi thêm season:", error);
    },
  });

  // Mutation để cập nhật season
  const updateSeasonMutation = useMutation({
    mutationFn: async ({ seasonId, data }: { seasonId: string; data: SeasonFormData }) => {
      const apiData = transformFormDataToApiData(data);
      return updateSeason(seasonId, apiData);
    },
    onSuccess: (updatedSeason: Season, variables) => {
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ["seasons"] });
      queryClient.invalidateQueries({ queryKey: ["season", variables.seasonId] });
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      queryClient.invalidateQueries({ queryKey: ["movie"] });
      queryClient.invalidateQueries({ queryKey: ["all-movies-with-details"] });
      
      // Cập nhật cache
      queryClient.setQueryData(["season", variables.seasonId], updatedSeason);
    },
    onError: (error) => {
      console.error("Lỗi khi cập nhật season:", error);
    },
  });

  // Mutation để xóa season
  const deleteSeasonMutation = useMutation({
    mutationFn: async (seasonId: string) => {
      await deleteSeason(seasonId);
      return seasonId;
    },
    onSuccess: (seasonId) => {
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ["seasons"] });
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      queryClient.invalidateQueries({ queryKey: ["movie"] });
      queryClient.invalidateQueries({ queryKey: ["all-movies-with-details"] });
      
      // Remove từ cache
      queryClient.setQueryData(
        ["seasons"],
        (oldData: Season[] | undefined) => {
          if (oldData) {
            return oldData.filter(season => season.id !== seasonId);
          }
          return [];
        }
      );
    },
    onError: (error) => {
      console.error("Lỗi khi xóa season:", error);
    },
  });

  return {
    // Add season
    addSeason: addSeasonMutation.mutate,
    addSeasonAsync: addSeasonMutation.mutateAsync,
    isAddingSeason: addSeasonMutation.isPending,
    addSeasonError: addSeasonMutation.error,

    // Update season
    updateSeason: updateSeasonMutation.mutate,
    updateSeasonAsync: updateSeasonMutation.mutateAsync,
    isUpdatingSeason: updateSeasonMutation.isPending,
    updateSeasonError: updateSeasonMutation.error,

    // Delete season
    deleteSeason: deleteSeasonMutation.mutate,
    deleteSeasonAsync: deleteSeasonMutation.mutateAsync,
    isDeletingSeason: deleteSeasonMutation.isPending,
    deleteSeasonError: deleteSeasonMutation.error,

    // Overall loading state
    isLoading: addSeasonMutation.isPending || updateSeasonMutation.isPending || deleteSeasonMutation.isPending,
  };
};
