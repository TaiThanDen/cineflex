# Hướng dẫn quản lý Episodes với API Database

## Tổng quan

Hệ thống đã được tích hợp với API backend để thêm, cập nhật và xóa episodes. Tài liệu này hướng dẫn cách sử dụng các tính năng này.

## 🛠️ Các API Functions đã tạo

### 1. Episode Management APIs (trong `src/lib/api.ts`)

```typescript
// Thêm episode mới vào season
addEpisodeToSeason(seasonId: string, episodeData: {...})

// Cập nhật episode
updateEpisode(episodeId: string, episodeData: {...})

// Xóa episode
deleteEpisode(episodeId: string)
```

### 2. Utility Functions (trong `src/lib/utils/episodeUtils.ts`)

```typescript
// Chuyển đổi duration từ string sang giây
parseDurationToSeconds("45 phút"); // → 2700

// Format giây thành hiển thị
formatSecondsToDisplay(2700); // → "45 phút"

// Tạo số tập tiếp theo
getNextEpisodeNumber(existingEpisodes);

// Format ngày phát hành
formatReleaseDate(date);
```

### 3. Custom Hook (trong `src/lib/hooks/useEpisodeMutations.ts`)

```typescript
const {
  addEpisode, // Function thêm episode
  isAddingEpisode, // Loading state
  addEpisodeError, // Error state
  updateEpisode, // Function cập nhật
  deleteEpisode, // Function xóa
  isLoading, // Overall loading state
} = useEpisodeMutations();
```

## 📝 Cách sử dụng AddEpisodeModal với API

### 1. Import dependencies

```typescript
import AddEpisodeModal from "@/components/admin/MovieManagerComponent/AddEpisodeModal";
import { useQuery } from "@tanstack/react-query";
import { getSeasonsByShowId } from "@/lib/api";
```

### 2. Setup trong component

```typescript
const YourComponent = () => {
  const [showModal, setShowModal] = useState(false);

  // Lấy danh sách seasons
  const { data: seasons = [] } = useQuery({
    queryKey: ["seasons", showId],
    queryFn: () => getSeasonsByShowId(showId),
  });

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Thêm Episode</button>

      {showModal && (
        <AddEpisodeModal
          seasons={seasons}
          onClose={() => setShowModal(false)}
          onAdd={(episodeData) => {
            console.log("Episode added:", episodeData);
            // Optional: custom handling sau khi thêm thành công
          }}
        />
      )}
    </div>
  );
};
```

## 🔄 Data Flow

### 1. Khi user submit form AddEpisodeModal:

1. **Form Validation**: Validate dữ liệu client-side
2. **Data Transformation**:

   - `name` → `title`
   - `episodeNumber` → `number` (string)
   - `duration` ("45 phút") → `duration` (2700 seconds)
   - Auto-generate `releaseDate` nếu không có

3. **API Call**: Gọi `addEpisodeToSeason(seasonId, transformedData)`
4. **Cache Update**: Tự động cập nhật React Query cache
5. **UI Update**: Danh sách episodes tự động refresh
6. **Success Feedback**: Hiển thị thông báo thành công

### 2. Khi có lỗi:

1. **Error Handling**: Catch và hiển thị lỗi
2. **Form State**: Giữ nguyên dữ liệu form
3. **User Feedback**: Hiển thị thông báo lỗi

## 🎯 Best Practices

### 1. Error Handling

```typescript
try {
  await addEpisode(episodeData);
  // Success handling
} catch (error) {
  if (error.status === 401) {
    // Redirect to login
  } else if (error.status === 403) {
    // Show permission error
  } else {
    // Show generic error
  }
}
```

### 2. Loading States

```typescript
<button disabled={isAddingEpisode}>
  {isAddingEpisode ? "Đang thêm..." : "Thêm Episode"}
</button>
```

### 3. Cache Management

React Query tự động quản lý cache, nhưng bạn có thể:

```typescript
// Invalidate cache sau khi thêm episode
queryClient.invalidateQueries({ queryKey: ["episodes", seasonId] });

// Update cache trực tiếp
queryClient.setQueryData(["episodes", seasonId], newData);
```

## 🧪 Testing

### 1. Test với mock data:

```typescript
// Mock seasons để test
const mockSeasons = [
  {
    id: "season-1",
    title: "Season 1",
    description: "First season",
    releaseDate: "2024-01-01",
    show: "show-1",
  },
];

// Test component
<AddEpisodeModal
  seasons={mockSeasons}
  onClose={() => {}}
  onAdd={(data) => console.log(data)}
/>;
```

### 2. Test API calls:

```typescript
// Test trong browser console
const testData = {
  name: "Test Episode",
  url: "test-video-id",
  duration: "45 phút",
  seasonId: "season-id",
  description: "Test description",
  episodeNumber: 1,
};

// Should transform và call API
```

## 🚀 Deployment Notes

### 1. Environment Variables:

Đảm bảo `BASE_API_URL` được set đúng trong production:

```typescript
// src/lib/request.ts
const BASE_API_URL =
  process.env.REACT_APP_API_URL || "https://cineflex-api.onrender.com/api";
```

### 2. Authentication:

API requires Bearer token trong headers. Token được tự động thêm từ localStorage.

### 3. Permissions:

User cần có quyền `ADD_CONTENT` để thêm episodes.

## 🐛 Troubleshooting

### 1. "Cannot read properties of undefined":

- Kiểm tra seasons array có data không
- Đảm bảo useQuery đã fetch xong

### 2. "401 Unauthorized":

- Kiểm tra user đã login chưa
- Verify token trong localStorage

### 3. "403 Forbidden":

- User không có quyền ADD_CONTENT
- Contact admin để cấp quyền

### 4. "Duration format error":

- Đảm bảo duration theo format: "45 phút", "1h 30m"
- Check parseDurationToSeconds function

## 📚 References

- [API Documentation](../API_DOCS.md)
- [React Query Docs](https://tanstack.com/query/latest)
- [Component Examples](../examples/EpisodeManagementExample.tsx)
