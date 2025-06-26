# Hướng dẫn sử dụng Database Operations - CineFlex Admin

## Tóm tắt

Bây giờ các nút **thêm**, **xóa**, **sửa** trong CineFlex Admin đã được kết nối với database thông qua React Query mutations và API calls. Không còn chỉ là mock data nữa!

## 🔄 Luồng hoạt động Database

### 1. Thêm mùa phim mới

```
User click "Thêm mùa phim"
→ Mở AddSeasonModalAdvanced
→ User nhập form + validate
→ Submit form
→ handleAddSeason()
→ mutations.createSeason.mutate()
→ API POST /seasons/
→ Database updated
→ React Query invalidate cache
→ UI refresh với data mới
→ Toast notification success
```

### 2. Thêm tập phim mới

```
User click "Thêm tập phim"
→ Mở AddEpisodeModalAdvanced
→ User chọn season + nhập form
→ Submit form
→ handleAddEpisode()
→ mutations.createEpisode.mutate()
→ API POST /episodes/
→ Database updated
→ React Query invalidate cache
→ UI refresh với data mới
→ Toast notification success
```

### 3. Xóa tập phim

```
User click "🗑 Xóa" trên tập phim
→ Mở ConfirmDeleteModal
→ User confirm
→ handleDeleteEpisode()
→ mutations.deleteEpisode.mutate()
→ API DELETE /episodes/{id}
→ Database updated
→ React Query invalidate cache
→ UI refresh (tập bị xóa biến mất)
→ Toast notification success
```

## 📁 Cấu trúc code được thêm

### 1. API Layer (`src/lib/api/seasonApi.ts`)

```typescript
// Các function gọi API
- createSeason(data) → POST /seasons/
- updateSeason(data) → PUT /seasons/{id}/
- deleteSeason(id) → DELETE /seasons/{id}/
- createEpisode(data) → POST /episodes/
- updateEpisode(data) → PUT /episodes/{id}/
- deleteEpisode(id) → DELETE /episodes/{id}/

// Utility functions
- parseDuration() → Chuyển "45 phút" thành 45
- formatDuration() → Chuyển 45 thành "45 phút"
```

### 2. React Query Hooks (`src/lib/hooks/useSeasonMutations.ts`)

```typescript
// Mutation hooks với error handling và cache invalidation
- useCreateSeasonMutation()
- useUpdateSeasonMutation()
- useDeleteSeasonMutation()
- useCreateEpisodeMutation()
- useUpdateEpisodeMutation()
- useDeleteEpisodeMutation()

// Tổng hợp
- useSeasonEpisodeMutations() → Trả về tất cả mutations
```

### 3. Components cập nhật

```typescript
// MovieAdminPage.tsx
- Thêm mutations hooks
- Handler functions gọi API thay vì mock
- Toast notifications
- Error handling

// MovieDetail.tsx
- Thêm props cho delete handlers
- Cập nhật delete episode logic
- Fallback cho mock data
```

## 🛠 Cách sử dụng trong code

### Trong component

```tsx
import { useSeasonEpisodeMutations } from "@/lib/hooks/useSeasonMutations";

function MyComponent() {
  const mutations = useSeasonEpisodeMutations();

  const handleAddSeason = (data) => {
    mutations.createSeason.mutate({
      title: data.title,
      description: data.description,
      // ... other fields
      movieId: selectedMovie.id,
    });
  };

  // Loading state
  if (mutations.createSeason.isPending) {
    return <div>Đang thêm mùa phim...</div>;
  }

  return <button onClick={handleAddSeason}>Thêm mùa phim</button>;
}
```

### Error handling

```tsx
// Errors được handle tự động trong mutations:
mutations.createSeason.mutate(data, {
  onSuccess: () => {
    toast.success("Thêm thành công!");
    // Cache invalidation tự động
  },
  onError: (error) => {
    toast.error(`Lỗi: ${error.message}`);
    console.error("Chi tiết lỗi:", error);
  },
});
```

## 🎯 Tính năng mới

### 1. Real-time Toast Notifications

- ✅ Success: "Mùa phim đã được thêm thành công!"
- ❌ Error: "Lỗi khi thêm mùa phim: [chi tiết lỗi]"
- ⏳ Loading states trong buttons
- 🔄 Auto dismiss sau 3-5 giây

### 2. Smart Cache Management

- Tự động refresh danh sách movies sau khi thêm season
- Tự động refresh chi tiết movie sau khi thêm episode
- Optimistic updates cho UX mượt mà
- Rollback nếu API call failed

### 3. Enhanced Error Handling

- Network errors: "Không thể kết nối server"
- Validation errors: "Dữ liệu không hợp lệ"
- Authorization errors: "Bạn không có quyền thực hiện"
- Server errors: Hiển thị message từ backend

### 4. Data Transformation

- Duration: "45 phút" ↔ 45 (database number)
- Season types: UI labels ↔ backend enums
- Date formats: Input date ↔ ISO string

## 🧪 Testing

### Thêm mùa phim

1. Vào movie detail
2. Click "Thêm mùa phim"
3. Chọn loại: "Mùa chính"
4. Nhập: Season 2, mô tả, ngày phát hành
5. Submit → Kiểm tra:
   - Toast success hiển thị
   - Modal đóng
   - Season 2 xuất hiện trong danh sách
   - Data được lưu vào database

### Thêm tập phim

1. Click "Thêm tập phim"
2. Chọn season từ dropdown
3. Nhập: tên tập, URL, thời lượng, mô tả
4. Submit → Kiểm tra:
   - Toast success
   - Episode mới trong bảng
   - Data trong database

### Xóa tập phim

1. Click "🗑 Xóa" trên episode
2. Confirm delete
3. Kiểm tra:
   - Toast success
   - Episode biến mất khỏi bảng
   - Database record deleted

## 🔧 Troubleshooting

### Lỗi thường gặp

**1. "Cannot connect to server"**

```
Giải pháp:
- Kiểm tra BASE_API_URL trong request.ts
- Đảm bảo backend server đang chạy
- Kiểm tra CORS settings
```

**2. "Unauthorized"**

```
Giải pháp:
- Kiểm tra localStorage có auth token
- Refresh login nếu token expired
- Kiểm tra API permissions
```

**3. "Validation error"**

```
Giải pháp:
- Kiểm tra dữ liệu form trước submit
- Xem chi tiết error trong console
- Đảm bảo required fields được điền
```

**4. Cache không refresh**

```
Giải pháp:
- Kiểm tra queryKey trong invalidateQueries
- Hard refresh browser (Ctrl+F5)
- Clear React Query dev tools cache
```

### Debug tips

**1. Kiểm tra API calls:**

```typescript
// Trong browser dev tools → Network tab
// Xem request/response của POST /seasons/, DELETE /episodes/...
```

**2. Kiểm tra React Query state:**

```typescript
// Install React Query DevTools
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Xem cache state, mutations status
```

**3. Console logging:**

```typescript
const mutations = useSeasonEpisodeMutations();

console.log("Create season status:", mutations.createSeason.status);
console.log("Error details:", mutations.createSeason.error);
```

## 📈 Tính năng mở rộng

### Có thể thêm trong tương lai:

1. **Bulk operations:**

   - Thêm nhiều tập cùng lúc
   - Xóa nhiều episodes selected

2. **Drag & drop reorder:**

   - Thay đổi thứ tự episodes
   - Thay đổi thứ tự seasons

3. **Advanced filters:**

   - Filter episodes theo duration
   - Filter seasons theo type

4. **Export/Import:**

   - Export season data to CSV/JSON
   - Import episodes from file

5. **Version history:**
   - Track changes to episodes
   - Rollback to previous versions

## ✅ Checklist hoàn thành

- [x] ✅ API functions cho Season CRUD
- [x] ✅ API functions cho Episode CRUD
- [x] ✅ React Query mutation hooks
- [x] ✅ Error handling & toast notifications
- [x] ✅ Cache invalidation & refresh
- [x] ✅ Tích hợp vào MovieAdminPage
- [x] ✅ Tích hợp vào MovieDetail
- [x] ✅ Delete episode functionality
- [x] ✅ Duration parsing & formatting
- [x] ✅ Loading states & UX improvements
- [x] ✅ Fallback cho mock data
- [x] ✅ Documentation đầy đủ

**Kết quả:** Hệ thống quản lý phim hoàn chỉnh với database operations, không còn mock data!
