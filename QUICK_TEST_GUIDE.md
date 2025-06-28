# 🧪 Test Auto Refresh - Quick Commands

## 1. Kiểm tra Console Logs

Mở Developer Tools (F12) → Console tab và xem các log sau:

### Khi thêm episode:

```
✅ Expected logs:
"Thêm tập mới:" + episode data
"Thêm tập phim thành công!"

❌ Error logs to watch:
"Lỗi khi thêm episode:" + error
```

### Khi sửa episode:

```
✅ Expected logs:
"Cập nhật tập phim thành công!"

❌ Error logs to watch:
"Lỗi khi cập nhật episode:" + error
```

### Khi xóa episode:

```
✅ Expected logs:
"Deleting episode:" + episode object
"Current season:" + season object
"Xóa tập phim thành công!"

❌ Error logs to watch:
"Lỗi khi xóa episode:" + error
```

## 2. Kiểm tra Network Tab

### Add Episode:

```
POST /api/seasons/{seasonId}/episodes
Status: 201 Created
Body: {
  "title": "Episode Name",
  "number": "1",
  "description": "...",
  "url": "...",
  "duration": seconds,
  "releaseDate": "...",
  "openingStart": 0,
  "openingEnd": 0
}
```

### Update Episode:

```
PUT /api/episodes/{episodeId}
Status: 200 OK
Body: { updated episode data }
```

### Delete Episode:

```
DELETE /api/episodes/{episodeId}
Status: 204 No Content
```

## 3. Quick Test Steps

### Test Thêm Episode:

1. Click "Thêm tập mới"
2. Điền form (tên, URL, thời lượng, mô tả)
3. Click "Thêm"
4. **Expected**: Modal đóng, episode xuất hiện trong bảng

### Test Sửa Episode:

1. Click "Edit" trên episode
2. Thay đổi tên episode
3. Click "Cập nhật"
4. **Expected**: Modal đóng, tên episode cập nhật trong bảng

### Test Xóa Episode:

1. Click "Xóa" trên episode
2. Click "Delete" trong modal xác nhận
3. **Expected**: Modal đóng, episode biến mất khỏi bảng

## 4. Debug Commands (Console)

```javascript
// Kiểm tra React Query cache
const queryClient = window.__REACT_QUERY_CLIENT__;
queryClient.getQueryData(["all-movies-with-details"]);

// Force refresh tất cả data
queryClient.invalidateQueries({ queryKey: ["all-movies-with-details"] });

// Kiểm tra mutation state
queryClient.isMutating();
```

## 5. Expected Behavior ✅

- **NO page reload** (`window.location.reload()`)
- **Instant UI updates** after operations
- **Loading states** during mutations
- **Error handling** với alert messages
- **Console logs** for debugging

## 6. Common Issues & Fixes 🔧

### Issue: UI không auto refresh

**Fix**: Kiểm tra invalidateQueries có đúng queryKey không

### Issue: "Cannot find name 'addEpisode'"

**Fix**: Đổi thành `addEpisodeAsync`

### Issue: Modal không đóng

**Fix**: Kiểm tra onClose() được gọi trong success callback

### Issue: API request fail

**Fix**: Kiểm tra backend server và endpoint URLs

## 7. Performance Check

- Mutations should complete in < 2 seconds
- UI updates should be immediate
- No unnecessary re-renders
- Clean console (no errors)

**🎯 Target: 100% smooth operations without manual refresh!**
