import { useQuery } from "@tanstack/react-query";
import { getGenresByShow } from "@/lib/api";

// Hook để lấy genres của một show cụ thể
export const useShowGenres = (showId: string | undefined) => {
  return useQuery({
    queryKey: ["show-genres", showId],
    queryFn: () => getGenresByShow(showId!),
    enabled: !!showId,
    staleTime: 5 * 60 * 1000, // 5 phút
    gcTime: 10 * 60 * 1000, // 10 phút
  });
};

// Hook để lấy tất cả genres có sẵn (nếu API hỗ trợ)
export const useAllGenres = () => {
  return useQuery({
    queryKey: ["all-genres"],
    queryFn: async () => {
      // Giả sử có API để lấy tất cả genres
      // Nếu không có, có thể hardcode hoặc lấy từ một show mẫu
      try {
        // const allGenres = await getAllGenres(); // API này có thể chưa tồn tại
        
        // Tạm thời return mock data cho tất cả genres có thể có
        return [
          { id: "1", name: "Action" },
          { id: "2", name: "Adventure" },
          { id: "3", name: "Comedy" },
          { id: "4", name: "Drama" },
          { id: "5", name: "Horror" },
          { id: "6", name: "Romance" },
          { id: "7", name: "Sci-Fi" },
          { id: "8", name: "Thriller" },
          { id: "9", name: "Fantasy" },
          { id: "10", name: "Crime" },
          { id: "11", name: "Mystery" },
          { id: "12", name: "Animation" },
        ];
      } catch (error) {
        console.error("Error fetching all genres:", error);
        return [];
      }
    },
    staleTime: 30 * 60 * 1000, // 30 phút (genres ít thay đổi)
    gcTime: 60 * 60 * 1000, // 1 giờ
  });
};
