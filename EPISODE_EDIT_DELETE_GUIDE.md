# 🎬 Hướng dẫn tích hợp Database cho nút Edit và Delete Episode

## ✅ Đã hoàn thành

### 1. **Cập nhật MovieDetail.tsx**

#### Thêm imports và hooks:

```typescript
import EditEpisodeModal from "./EditEpisodeModal";
import { useEpisodeMutations } from "@/lib/hooks/useEpisodeMutations";
```

#### Thêm state quản lý:

```typescript
const [showEditEpisodeModal, setShowEditEpisodeModal] = useState(false);
const [selectedEpisodeToEdit, setSelectedEpisodeToEdit] = useState<any>(null);
```

#### Hook xử lý mutations:

```typescript
const { deleteEpisode, updateEpisode, isDeletingEpisode, isUpdatingEpisode } =
  useEpisodeMutations();
```

#### Functions xử lý Edit và Delete:

```typescript
// Xử lý xóa episode
const handleDeleteEpisode = async () => {
  if (!selectedEpisodeToDelete) return;

  try {
    const currentSeason = movie.seasons[seasonIdx];
    await deleteEpisode({
      episodeId: selectedEpisodeToDelete.id,
      seasonId: currentSeason.id,
    });

    alert("Xóa tập phim thành công!");
    // Auto refresh hoặc update cache
  } catch (error) {
    alert("Có lỗi xảy ra khi xóa tập phim!");
  }
};

// Xử lý edit episode
const handleEditEpisode = (episode: any) => {
  setSelectedEpisodeToEdit(episode);
  setShowEditEpisodeModal(true);
};

// Xử lý update episode
const handleUpdateEpisode = async (episodeData: any) => {
  try {
    await updateEpisode({
      episodeId: selectedEpisodeToEdit.id,
      data: episodeData,
    });

    alert("Cập nhật tập phim thành công!");
    // Auto refresh hoặc update cache
  } catch (error) {
    alert("Có lỗi xảy ra khi cập nhật tập phim!");
  }
};
```

### 2. **Cập nhật Episode Action Buttons**

#### Trước (chỉ local):

```typescript
<button
  className="bg-yellow-400 hover:bg-yellow-500 text-white rounded px-2 py-1 text-xs font-semibold"
  onClick={() => onEditEpisode(movie.id, seasonIdx, epIdx)}
>
  ✏ Edit
</button>
```

#### Sau (tích hợp database):

```typescript
<button
  className="bg-yellow-400 hover:bg-yellow-500 text-white rounded px-2 py-1 text-xs font-semibold disabled:opacity-50"
  onClick={() => handleEditEpisode(ep)}
  disabled={isUpdatingEpisode}
>
  ✏ {isUpdatingEpisode ? "..." : "Edit"}
</button>

<button
  className="bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1 text-xs font-semibold disabled:opacity-50"
  onClick={() => {
    setSelectedEpisodeToDelete(ep);
    setShowDeleteEpisodeModal(true);
  }}
  disabled={isDeletingEpisode}
>
  🗑 {isDeletingEpisode ? "..." : "Xóa"}
</button>
```

### 3. **Cập nhật EditEpisodeModal.tsx**

#### Tích hợp với database:

- ✅ Sử dụng `useEpisodeMutations` hook
- ✅ Form validation với error states
- ✅ Loading states khi submit
- ✅ Error handling và display
- ✅ Auto close modal sau khi thành công
- ✅ Transform data trước khi gửi API

#### Key features:

```typescript
const { updateEpisode, isUpdatingEpisode, updateEpisodeError } =
  useEpisodeMutations();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;

  const episodeData: EpisodeFormData = {
    seasonId: formData.seasonId,
    name: formData.name,
    url: formData.url,
    duration: formData.duration,
    description: formData.description,
    episodeNumber: formData.episodeNumber,
  };

  try {
    await updateEpisode({ episodeId: episode.id, data: episodeData });
    alert("Cập nhật tập phim thành công!");
    if (onUpdate) onUpdate(episodeData);
    onClose();
  } catch (error) {
    alert("Có lỗi xảy ra!");
  }
};
```

### 4. **Cập nhật Delete Confirmation Modal**

#### Trước:

```typescript
onConfirm={() => {
  // Chỉ update local state
  movie.seasons[seasonIdx].episodes = movie.seasons[seasonIdx].episodes.filter(
    (ep: any) => ep.id !== selectedEpisodeToDelete.id
  );
}}
```

#### Sau:

```typescript
onConfirm = { handleDeleteEpisode }; // Gọi API thực tế
```

## 🔧 Cách hoạt động

### **Edit Episode Flow:**

1. User click nút "✏ Edit" → `handleEditEpisode(episode)`
2. Set `selectedEpisodeToEdit` và show `EditEpisodeModal`
3. User chỉnh sửa form và submit
4. Call API `updateEpisode({ episodeId, data })`
5. Update React Query cache tự động
6. Close modal và refresh UI
7. Show success message

### **Delete Episode Flow:**

1. User click nút "🗑 Xóa" → Show confirmation modal
2. User confirm → `handleDeleteEpisode()`
3. Call API `deleteEpisode({ episodeId, seasonId })`
4. Update React Query cache tự động
5. Close modal và refresh UI
6. Show success message

## 🎯 Key Benefits

### ✅ **Real Database Integration**

- Episodes được thêm/sửa/xóa trực tiếp trong database
- Không còn chỉ update local state

### ✅ **Auto Cache Management**

- React Query tự động sync data
- UI tự động refresh khi có thay đổi

### ✅ **Better UX**

- Loading states khi đang thực hiện operations
- Disable buttons để tránh multiple clicks
- Error handling và feedback cho user

### ✅ **Type Safety**

- Full TypeScript support
- Interface rõ ràng cho tất cả data structures

### ✅ **Error Handling**

- Try-catch cho tất cả API calls
- Display errors cho user
- Graceful fallbacks

## 🚀 Sử dụng

Bây giờ trong MovieDetail component:

```typescript
// Import đã có sẵn
import MovieDetail from "@/components/admin/MovieManagerComponent/MovieDetail";

// Sử dụng
<MovieDetail
  movie={movieData}
  onBack={() => setSelectedMovie(null)}
  onAddSeason={() => setShowAddSeason(true)}
  onAddEpisode={() => setShowAddEpisode(true)}
/>;
```

**Lưu ý:** Không cần truyền `onEditEpisode` prop nữa vì đã được handle internal với database integration.

## 🧪 Testing

### Test Edit Episode:

1. Click nút "✏ Edit" trên bất kỳ episode nào
2. Modal mở với dữ liệu episode hiện tại
3. Chỉnh sửa tên, URL, duration, description
4. Click "Cập nhật"
5. Kiểm tra episode được update trong database
6. UI tự động refresh với data mới

### Test Delete Episode:

1. Click nút "🗑 Xóa" trên bất kỳ episode nào
2. Confirmation modal hiện ra
3. Click "Xác nhận"
4. Episode bị xóa khỏi database
5. UI tự động refresh, episode không còn trong list

## 🔗 Files liên quan

- `src/components/admin/MovieManagerComponent/MovieDetail.tsx` - Main component
- `src/components/admin/MovieManagerComponent/EditEpisodeModal.tsx` - Edit modal
- `src/lib/hooks/useEpisodeMutations.ts` - Episode mutations hook
- `src/lib/api.ts` - API functions
- `src/lib/utils/episodeUtils.ts` - Utility functions

---

**✨ Hoàn thành!** Các nút Edit và Delete episode trong MovieDetail giờ đã tích hợp hoàn toàn với database! 🎉
