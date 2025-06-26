# Hướng dẫn sử dụng Modal thêm Mùa phim và Tập phim - CineFlex Admin

## Tổng quan

Hệ thống CineFlex Admin được tích hợp với hai modal nâng cao để thêm mùa phim và tập phim một cách chuyên nghiệp:

1. **AddSeasonModalAdvanced** - Modal thêm mùa phim với validate chặt chẽ
2. **AddEpisodeModalAdvanced** - Modal thêm tập phim với preview tự động

## 1. AddSeasonModalAdvanced

### Tính năng chính

- **Hỗ trợ nhiều loại mùa phim:**

  - `regular` - Mùa chính (Season 1, Season 2, ...)
  - `special` - Tập đặc biệt, OVA
  - `movie` - Phim điện ảnh trong series
  - `ova` - Original Video Animation
  - `extra` - Ngoại truyện, spin-off

- **Validation thông minh:**

  - Tự động đề xuất số mùa tiếp theo
  - Kiểm tra trùng lặp tên mùa
  - Validate logic số mùa (không thể nhảy quá xa)
  - Kiểm tra độ dài mô tả tối thiểu

- **Preview tự động:**
  - Tên mùa được tạo tự động dựa trên loại
  - Hiển thị danh sách mùa hiện có
  - Gợi ý và cảnh báo

### Cách sử dụng

```tsx
import AddSeasonModalAdvanced from "./AddSeasonModalAdvanced";

const [showAddSeasonModal, setShowAddSeasonModal] = useState(false);

const handleAddSeason = (seasonData: {
  title: string;
  seasonNumber?: number;
  description: string;
  releaseDate: string;
  seasonType: "regular" | "special" | "movie" | "ova" | "extra";
  isMainSeries: boolean;
}) => {
  // Gọi API để thêm mùa phim
  console.log("Thêm mùa phim:", seasonData);
};

{
  showAddSeasonModal && (
    <AddSeasonModalAdvanced
      movieId={selectedMovie.id}
      existingSeasons={selectedMovie.seasons}
      onClose={() => setShowAddSeasonModal(false)}
      onAdd={handleAddSeason}
    />
  );
}
```

### Props Interface

```typescript
interface Props {
  movieId: string; // ID của phim
  existingSeasons: Season[]; // Danh sách mùa hiện có
  onClose: () => void; // Hàm đóng modal
  onAdd: (seasonData: {
    // Hàm xử lý khi thêm mùa mới
    title: string;
    seasonNumber?: number;
    description: string;
    releaseDate: string;
    seasonType: "regular" | "special" | "movie" | "ova" | "extra";
    isMainSeries: boolean;
  }) => void;
}
```

### Validation Rules

1. **Tên mùa phim:** Bắt buộc, không được trùng với mùa hiện có
2. **Số mùa (với Regular Season):**
   - Bắt buộc cho mùa chính
   - Phải lớn hơn 0
   - Không được trùng với mùa hiện có
   - Không được nhảy quá xa (ví dụ: không thể thêm Season 5 khi chỉ có Season 2)
3. **Mô tả:** Bắt buộc, tối thiểu 10 ký tự
4. **Ngày phát hành:** Bắt buộc, cảnh báo nếu là ngày tương lai

## 2. AddEpisodeModalAdvanced

### Tính năng chính

- **Chọn mùa phim:** Dropdown hiển thị tất cả mùa có sẵn
- **Validation URL:** Kiểm tra format URL hợp lệ
- **Validation thời lượng:** Hỗ trợ nhiều format (45 phút, 1h 30m, 90 min)
- **Preview tập phim:** Hiển thị thông tin tập sẽ được tạo
- **Thông tin mùa:** Hiển thị chi tiết mùa được chọn

### Cách sử dụng

```tsx
import AddEpisodeModalAdvanced from "./AddEpisodeModalAdvanced";

const [showAddEpisodeModal, setShowAddEpisodeModal] = useState(false);

const handleAddEpisode = (episodeData: {
  name: string;
  url: string;
  duration: string;
  seasonId: string;
  description: string;
  episodeNumber: number;
}) => {
  // Gọi API để thêm tập phim
  console.log("Thêm tập phim:", episodeData);
};

{
  showAddEpisodeModal && (
    <AddEpisodeModalAdvanced
      seasons={selectedMovie.seasons}
      onClose={() => setShowAddEpisodeModal(false)}
      onAdd={handleAddEpisode}
    />
  );
}
```

### Props Interface

```typescript
interface Props {
  seasons: Season[]; // Danh sách mùa phim
  onClose: () => void; // Hàm đóng modal
  onAdd: (episodeData: {
    // Hàm xử lý khi thêm tập mới
    name: string;
    url: string;
    duration: string;
    seasonId: string;
    description: string;
    episodeNumber: number;
  }) => void;
}
```

### Validation Rules

1. **Chọn mùa phim:** Bắt buộc
2. **Số tập:** Phải lớn hơn 0
3. **Tên tập:** Bắt buộc
4. **URL Video:** Bắt buộc, phải là URL hợp lệ
5. **Thời lượng:** Bắt buộc, format hỗ trợ:
   - "45 phút", "45 p", "45 min"
   - "1h 30m", "1 giờ 30 phút"
6. **Mô tả:** Bắt buộc, tối đa 500 ký tự

## 3. Tích hợp vào MovieAdminPage

### Code mẫu hoàn chỉnh

```tsx
// Import các modal
import AddSeasonModalAdvanced from "../../components/admin/MovieManagerComponent/AddSeasonModalAdvanced";
import AddEpisodeModalAdvanced from "../../components/admin/MovieManagerComponent/AddEpisodeModalAdvanced";

export default function MovieAdminPage() {
  // State quản lý modal
  const [showAddSeasonModal, setShowAddSeasonModal] = useState(false);
  const [showAddEpisodeModal, setShowAddEpisodeModal] = useState(false);

  // Handler cho việc thêm mùa phim
  const handleAddSeason = (seasonData) => {
    console.log("Thêm mùa phim mới:", seasonData);
    // TODO: Gọi API để thêm mùa phim
    // addSeasonMutation.mutate(seasonData);
    alert(`Mùa phim mới được thêm: ${seasonData.title}`);
    setShowAddSeasonModal(false);
  };

  // Handler cho việc thêm tập phim
  const handleAddEpisode = (episodeData) => {
    console.log("Thêm tập phim mới:", episodeData);
    // TODO: Gọi API để thêm tập phim
    // addEpisodeMutation.mutate(episodeData);
    alert(`Tập phim mới được thêm: ${episodeData.name}`);
    setShowAddEpisodeModal(false);
  };

  return (
    <div>
      {/* Các component khác */}

      {/* Truyền handler vào MovieDetail */}
      {id && selectedMovie && (
        <MovieDetail
          movie={selectedMovie}
          onBack={() => navigate("/admin/movies")}
          onEditEpisode={handleEditEpisode}
          onDeleteMovie={handleDeleteMovie}
          onAddSeason={() => setShowAddSeasonModal(true)}
          onAddEpisode={() => setShowAddEpisodeModal(true)}
        />
      )}

      {/* Modal thêm mùa phim */}
      {showAddSeasonModal && selectedMovie && (
        <AddSeasonModalAdvanced
          movieId={selectedMovie.id}
          existingSeasons={selectedMovie.seasons || []}
          onClose={() => setShowAddSeasonModal(false)}
          onAdd={handleAddSeason}
        />
      )}

      {/* Modal thêm tập phim */}
      {showAddEpisodeModal && selectedMovie && (
        <AddEpisodeModalAdvanced
          seasons={selectedMovie.seasons || []}
          onClose={() => setShowAddEpisodeModal(false)}
          onAdd={handleAddEpisode}
        />
      )}
    </div>
  );
}
```

## 4. Kết nối với API

### Ví dụ mutation hooks

```tsx
// hooks/useSeasonMutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddSeasonMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (seasonData: AddSeasonRequest) => {
      const response = await api.post(
        `/shows/${seasonData.movieId}/seasons`,
        seasonData
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Cập nhật cache
      queryClient.invalidateQueries({
        queryKey: ["movie-details", variables.movieId],
      });
      queryClient.invalidateQueries({ queryKey: ["all-movies"] });
    },
  });
};

export const useAddEpisodeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (episodeData: AddEpisodeRequest) => {
      const response = await api.post(
        `/seasons/${episodeData.seasonId}/episodes`,
        episodeData
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Cập nhật cache
      const seasonDetails = queryClient.getQueryData([
        "season-details",
        variables.seasonId,
      ]);
      if (seasonDetails) {
        queryClient.invalidateQueries({ queryKey: ["movie-details"] });
      }
    },
  });
};
```

### Sử dụng trong component

```tsx
import {
  useAddSeasonMutation,
  useAddEpisodeMutation,
} from "./hooks/useSeasonMutations";

export default function MovieAdminPage() {
  const addSeasonMutation = useAddSeasonMutation();
  const addEpisodeMutation = useAddEpisodeMutation();

  const handleAddSeason = (seasonData) => {
    addSeasonMutation.mutate(
      {
        ...seasonData,
        movieId: selectedMovie.id,
      },
      {
        onSuccess: () => {
          setShowAddSeasonModal(false);
          toast.success("Thêm mùa phim thành công!");
        },
        onError: (error) => {
          toast.error("Lỗi khi thêm mùa phim: " + error.message);
        },
      }
    );
  };

  const handleAddEpisode = (episodeData) => {
    addEpisodeMutation.mutate(episodeData, {
      onSuccess: () => {
        setShowAddEpisodeModal(false);
        toast.success("Thêm tập phim thành công!");
      },
      onError: (error) => {
        toast.error("Lỗi khi thêm tập phim: " + error.message);
      },
    });
  };
}
```

## 5. Tips và Best Practices

### UI/UX

1. **Loading States:** Hiển thị loading khi submit form
2. **Toast Notifications:** Thông báo thành công/lỗi sau khi thêm
3. **Confirm Dialog:** Xác nhận trước khi thêm dữ liệu quan trọng
4. **Auto-refresh:** Cập nhật danh sách sau khi thêm thành công

### Data Management

1. **Optimistic Updates:** Cập nhật UI ngay lập tức, rollback nếu lỗi
2. **Cache Invalidation:** Xóa cache cũ sau khi thêm dữ liệu mới
3. **Error Handling:** Xử lý lỗi network, validation từ server
4. **Retry Logic:** Thử lại request nếu thất bại

### Validation

1. **Client-side Validation:** Validate ngay trong form
2. **Server-side Validation:** Luôn validate lại ở server
3. **Real-time Feedback:** Hiển thị lỗi ngay khi user nhập
4. **Cross-field Validation:** Validate logic giữa các field

## 6. Troubleshooting

### Lỗi thường gặp

1. **Type errors với Season interface:**

   ```
   Error: Property 'id' is missing in type Season
   ```

   **Giải pháp:** Đảm bảo mock data có đầy đủ các field required trong Season interface

2. **Modal không hiển thị:**

   ```
   Modal appears behind other elements
   ```

   **Giải pháp:** Kiểm tra z-index, đảm bảo modal có z-index cao nhất

3. **Form validation không hoạt động:**
   ```
   Validation errors not showing
   ```
   **Giải pháp:** Kiểm tra state errors, đảm bảo validation được trigger

### Debug Tips

1. **Console logs:** Log dữ liệu form trước khi submit
2. **React DevTools:** Kiểm tra state và props của component
3. **Network tab:** Kiểm tra API calls và response
4. **Error boundaries:** Wrap component trong error boundary để catch lỗi

## Kết luận

Hệ thống modal thêm mùa phim và tập phim đã được thiết kế để:

- **Dễ sử dụng:** Interface trực quan, validation rõ ràng
- **Linh hoạt:** Hỗ trợ nhiều loại mùa phim khác nhau
- **Mở rộng:** Dễ dàng thêm tính năng mới
- **Bảo trì:** Code clean, có documentation đầy đủ

Với những modal này, việc quản lý nội dung phim trở nên chuyên nghiệp và hiệu quả hơn nhiều!
