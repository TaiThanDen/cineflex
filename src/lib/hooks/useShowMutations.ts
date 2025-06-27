import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateShow, deleteShow, addShow, addGenresToShow } from "@/lib/api";
import type { Show } from "@/lib/types/Show";

// Interface cho dữ liệu show từ form
export interface ShowFormData {
  title: string;
  description: string;
  releaseDate: string;
  thumbnail: string;
  onGoing: boolean;
  isSeries: boolean;
  ageRating: string;
}

// Interface cho API request
interface ShowApiData {
  title: string;
  description: string;
  releaseDate: string;
  thumbnail: string;
  onGoing: boolean;
  isSeries: boolean;
  ageRating: string;
}

// Chuyển đổi dữ liệu từ form sang API format
const transformFormDataToApiData = (formData: ShowFormData): ShowApiData => {
  return {
    title: formData.title,
    description: formData.description,
    releaseDate: formData.releaseDate,
    thumbnail: formData.thumbnail,
    onGoing: formData.onGoing,
    isSeries: formData.isSeries,
    ageRating: formData.ageRating,
  };
};

export const useShowMutations = () => {
  const queryClient = useQueryClient();

  // Mutation để thêm show mới
  const addShowMutation = useMutation({
    mutationFn: async (data: ShowFormData) => {
      const apiData = transformFormDataToApiData(data);
      return addShow(apiData);
    },
    onSuccess: (newShow: Show) => {
      // Invalidate và refetch các query liên quan
      queryClient.invalidateQueries({ queryKey: ["all-movies-with-details"] });
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      queryClient.invalidateQueries({ queryKey: ["shows"] });
      
      // Cập nhật cache
      queryClient.setQueryData(
        ["shows"],
        (oldData: Show[] | undefined) => {
          if (oldData) {
            return [...oldData, newShow];
          }
          return [newShow];
        }
      );
    },
    onError: (error) => {
      console.error("Lỗi khi thêm show:", error);
    },
  });

  // Mutation để cập nhật show
  const updateShowMutation = useMutation({
    mutationFn: async ({ showId, data }: { showId: string; data: ShowFormData }) => {
      const apiData = transformFormDataToApiData(data);
      return updateShow(showId, apiData);
    },
    onSuccess: (updatedShow: Show, variables) => {
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ["all-movies-with-details"] });
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      queryClient.invalidateQueries({ queryKey: ["shows"] });
      queryClient.invalidateQueries({ queryKey: ["show", variables.showId] });
      
      // Cập nhật cache
      queryClient.setQueryData(["show", variables.showId], updatedShow);
    },
    onError: (error) => {
      console.error("Lỗi khi cập nhật show:", error);
    },
  });

  // Mutation để xóa show
  const deleteShowMutation = useMutation({
    mutationFn: async (showId: string) => {
      await deleteShow(showId);
      return showId;
    },
    onSuccess: (showId) => {
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ["all-movies-with-details"] });
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      queryClient.invalidateQueries({ queryKey: ["shows"] });
      
      // Remove từ cache
      queryClient.setQueryData(
        ["shows"],
        (oldData: Show[] | undefined) => {
          if (oldData) {
            return oldData.filter(show => show.id !== showId);
          }
          return [];
        }
      );
    },
    onError: (error) => {
      console.error("Lỗi khi xóa show:", error);
    },
  });

  // Mutation để thêm genres cho show
  const addGenrestoShowMutation = useMutation({
    mutationFn: async ({ showId, genreIds }: { showId: string; genreIds: string[] }) => {
      return addGenresToShow(showId, genreIds);
    },
    onSuccess: (_, variables) => {
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ["all-movies-with-details"] });
      queryClient.invalidateQueries({ queryKey: ["show", variables.showId] });
      queryClient.invalidateQueries({ queryKey: ["genres", variables.showId] });
    },
    onError: (error) => {
      console.error("Lỗi khi thêm genres cho show:", error);
    },
  });

  return {
    // Add show
    addShow: addShowMutation.mutate,
    addShowAsync: addShowMutation.mutateAsync,
    isAddingShow: addShowMutation.isPending,
    addShowError: addShowMutation.error,

    // Update show
    updateShow: updateShowMutation.mutate,
    updateShowAsync: updateShowMutation.mutateAsync,
    isUpdatingShow: updateShowMutation.isPending,
    updateShowError: updateShowMutation.error,

    // Delete show
    deleteShow: deleteShowMutation.mutate,
    deleteShowAsync: deleteShowMutation.mutateAsync,
    isDeletingShow: deleteShowMutation.isPending,
    deleteShowError: deleteShowMutation.error,

    // Add genres to show
    addGenresToShow: addGenrestoShowMutation.mutate,
    addGenresToShowAsync: addGenrestoShowMutation.mutateAsync,
    isAddingGenres: addGenrestoShowMutation.isPending,
    addGenresError: addGenrestoShowMutation.error,

    // Overall loading state
    isLoading: addShowMutation.isPending || updateShowMutation.isPending || deleteShowMutation.isPending || addGenrestoShowMutation.isPending,
  };
};
