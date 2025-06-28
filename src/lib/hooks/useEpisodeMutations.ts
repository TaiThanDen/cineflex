import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEpisodeToSeason, updateEpisode, deleteEpisode } from "@/lib/api";
import { parseDurationToSeconds, formatReleaseDate } from "@/lib/utils/episodeUtils";
import type { Episode } from "@/lib/types/Episode";

// Interface cho dữ liệu episode từ form
export interface EpisodeFormData {
  name: string;
  url: string;
  duration: string;
  seasonId: string;
  description: string;
  episodeNumber: number;
  releaseDate?: string;
  openingStart?: number;
  openingEnd?: number;
}

// Interface cho API request
interface EpisodeApiData {
  title: string;
  number: string;
  description: string;
  url: string;
  releaseDate: string;
  duration: number;
  openingStart?: number;
  openingEnd?: number;
}

// Chuyển đổi dữ liệu từ form sang API format
const transformFormDataToApiData = (formData: EpisodeFormData): EpisodeApiData => {
  return {
    title: formData.name,
    number: formData.episodeNumber.toString(),
    description: formData.description,
    url: formData.url,
    releaseDate: formatReleaseDate(formData.releaseDate),
    duration: parseDurationToSeconds(formData.duration),
    openingStart: formData.openingStart || 0,
    openingEnd: formData.openingEnd || 0,
  };
};

export const useEpisodeMutations = () => {
  const queryClient = useQueryClient();

  // Mutation để thêm episode mới
  const addEpisodeMutation = useMutation({
    mutationFn: async (data: EpisodeFormData) => {
      const apiData = transformFormDataToApiData(data);
      return addEpisodeToSeason(data.seasonId, apiData);
    },
    onSuccess: (newEpisode: Episode, variables: EpisodeFormData) => {
      // Invalidate và refetch các query liên quan
      queryClient.invalidateQueries({ queryKey: ["episodes", variables.seasonId] });
      queryClient.invalidateQueries({ queryKey: ["seasons"] });
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      queryClient.invalidateQueries({ queryKey: ["movie"] });
      queryClient.invalidateQueries({ queryKey: ["all-movies-with-details"] });
      
      // Cập nhật cache nếu cần
      queryClient.setQueryData(
        ["episodes", variables.seasonId],
        (oldData: Episode[] | undefined) => {
          if (oldData) {
            return [...oldData, newEpisode].sort((a, b) => 
              parseInt(a.number) - parseInt(b.number)
            );
          }
          return [newEpisode];
        }
      );
    },
    onError: (error) => {
      console.error("Lỗi khi thêm episode:", error);
    },
  });

  // Mutation để cập nhật episode
  const updateEpisodeMutation = useMutation({
    mutationFn: async ({ episodeId, data }: { episodeId: string; data: EpisodeFormData }) => {
      const apiData = transformFormDataToApiData(data);
      return updateEpisode(episodeId, apiData);
    },
    onSuccess: (updatedEpisode: Episode, variables) => {
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ["episodes", variables.data.seasonId] });
      queryClient.invalidateQueries({ queryKey: ["episode", variables.episodeId] });
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      queryClient.invalidateQueries({ queryKey: ["movie"] });
      queryClient.invalidateQueries({ queryKey: ["all-movies-with-details"] });
      
      // Cập nhật cache
      queryClient.setQueryData(["episode", variables.episodeId], updatedEpisode);
    },
    onError: (error) => {
      console.error("Lỗi khi cập nhật episode:", error);
    },
  });

  // Mutation để xóa episode
  const deleteEpisodeMutation = useMutation({
    mutationFn: async ({ episodeId, seasonId }: { episodeId: string; seasonId: string }) => {
      await deleteEpisode(episodeId);
      return { episodeId, seasonId };
    },
    onSuccess: (variables) => {
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ["episodes", variables.seasonId] });
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      queryClient.invalidateQueries({ queryKey: ["movie"] });
      queryClient.invalidateQueries({ queryKey: ["all-movies-with-details"] });
      
      // Remove từ cache
      queryClient.setQueryData(
        ["episodes", variables.seasonId],
        (oldData: Episode[] | undefined) => {
          if (oldData) {
            return oldData.filter(episode => episode.id !== variables.episodeId);
          }
          return [];
        }
      );
    },
    onError: (error) => {
      console.error("Lỗi khi xóa episode:", error);
    },
  });

  return {
    // Add episode
    addEpisode: addEpisodeMutation.mutate,
    addEpisodeAsync: addEpisodeMutation.mutateAsync,
    isAddingEpisode: addEpisodeMutation.isPending,
    addEpisodeError: addEpisodeMutation.error,

    // Update episode
    updateEpisode: updateEpisodeMutation.mutate,
    updateEpisodeAsync: updateEpisodeMutation.mutateAsync,
    isUpdatingEpisode: updateEpisodeMutation.isPending,
    updateEpisodeError: updateEpisodeMutation.error,

    // Delete episode
    deleteEpisode: deleteEpisodeMutation.mutate,
    deleteEpisodeAsync: deleteEpisodeMutation.mutateAsync,
    isDeletingEpisode: deleteEpisodeMutation.isPending,
    deleteEpisodeError: deleteEpisodeMutation.error,

    // Overall loading state
    isLoading: addEpisodeMutation.isPending || updateEpisodeMutation.isPending || deleteEpisodeMutation.isPending,
  };
};
