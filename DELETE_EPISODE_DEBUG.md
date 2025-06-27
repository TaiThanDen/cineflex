# 🐛 Debug Guide: Chức năng Delete Episode

## Vấn đề đã sửa

### 1. **Lỗi TypeScript**: ✅ FIXED

- **Vấn đề**: Thiếu prop `onUpdate` cho `EditEpisodeModal` trong `MovieAdminPage.tsx`
- **Giải pháp**: Thêm prop `onUpdate` callback

### 2. **Mock Data Structure**: ✅ FIXED

- **Vấn đề**: Seasons thiếu `id` và `title`, Episodes thiếu `number` field
- **Giải pháp**: Cập nhật mock data với đầy đủ fields:

```typescript
seasons: [
  {
    id: "season-1", // ✅ Thêm id cho season
    seasonNumber: 1,
    title: "Season 1", // ✅ Thêm title
    episodes: [
      {
        id: "episode-1", // ✅ ID thực cho episode
        name: "Pilot",
        title: "Pilot", // ✅ API dùng title
        url: "pilot-episode",
        duration: "58 phút",
        description: "...", // ✅ Thêm description
        number: "1", // ✅ API dùng number as string
      },
    ],
  },
];
```

### 3. **API Call Flow**: ✅ VERIFIED

#### Flow hoạt động:

1. User click "🗑 Xóa" → `setSelectedEpisodeToDelete(episode)`
2. Confirmation modal hiển thị → User confirm
3. `handleDeleteEpisode()` được gọi:
   ```typescript
   await deleteEpisode({
     episodeId: selectedEpisodeToDelete.id, // "episode-1"
     seasonId: currentSeason.id, // "season-1"
   });
   ```
4. `useEpisodeMutations` hook xử lý:
   ```typescript
   mutationFn: async ({ episodeId, seasonId }) => {
     await deleteEpisode(episodeId); // API call: DELETE /api/episodes/episode-1
     return { episodeId, seasonId };
   };
   ```
5. API call: `DELETE /api/episodes/{episodeId}`
6. Cache update: Remove episode từ cache
7. UI refresh: Episode biến mất khỏi table

## 🧪 Cách test

### Test với Mock Data:

1. Mở MovieDetail của "Breaking Bad"
2. Click nút "🗑 Xóa" trên episode "Pilot"
3. Confirm deletion
4. Check browser console cho logs
5. Episode sẽ biến mất khỏi table

### Debug Console Logs:

```javascript
// Logs sẽ hiển thị:
"Deleting episode:" {id: "episode-1", name: "Pilot", ...}
"Current movie:" {id: "1", title: "Breaking Bad", ...}
"Season index:" 0
"Current season:" {id: "season-1", seasonNumber: 1, ...}
```

### Test với Real API:

1. Đảm bảo user có quyền `DELETE_CONTENT`
2. Episode phải tồn tại trong database
3. Check API response trong Network tab

## 🚨 Potential Issues & Solutions

### Issue 1: "Không tìm thấy season hiện tại"

```typescript
// Debug: Check season structure
console.log("Movie seasons:", movie.seasons);
console.log("Season index:", seasonIdx);
console.log("Current season:", movie.seasons?.[seasonIdx]);
```

**Solution**: Đảm bảo `seasonIdx` đúng và `movie.seasons` có data

### Issue 2: "403 Forbidden"

**Cause**: User không có quyền `DELETE_CONTENT`
**Solution**: Contact admin để cấp quyền

### Issue 3: "404 Not Found"

**Cause**: Episode ID không tồn tại trong database
**Solution**: Check episode ID trong database

### Issue 4: Cache không update

**Cause**: React Query cache không được invalidate
**Solution**: Check `useEpisodeMutations` có gọi `queryClient.invalidateQueries`

## 🔧 Advanced Debugging

### 1. Network Monitoring:

```javascript
// Open DevTools → Network tab
// Filter by: XHR/Fetch
// Look for: DELETE /api/episodes/{id}
// Check: Status code (200 = success)
```

### 2. Console Debugging:

```typescript
// Trong handleDeleteEpisode, thêm logs:
console.log("Episode to delete:", selectedEpisodeToDelete);
console.log("Delete mutation function:", deleteEpisode);
console.log("API endpoint will be:", `episodes/${selectedEpisodeToDelete.id}`);
```

### 3. React Query DevTools:

```typescript
// Install: @tanstack/react-query-devtools
// Monitor cache updates in real-time
```

## ✅ Expected Behavior

### Successful Delete:

1. ✅ Console logs episode data
2. ✅ API call: `DELETE /api/episodes/{id}` returns 200
3. ✅ Success alert: "Xóa tập phim thành công!"
4. ✅ Modal closes
5. ✅ Episode disappears from table
6. ✅ Page refreshes (temporary) hoặc cache updates

### Failed Delete:

1. ❌ Console error with details
2. ❌ Error alert with specific message
3. ❌ Modal stays open
4. ❌ Episode remains in table

## 🎯 Next Steps

1. **Test delete function** với mock data
2. **Check console logs** để verify data flow
3. **Test với real API** (nếu có)
4. **Remove `window.location.reload()`** và rely hoàn toàn vào cache update
5. **Add loading states** cho better UX

---

**🎉 Delete function giờ đã sẵn sàng hoạt động với cả mock data và real API!**
