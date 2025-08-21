# 🧪 Test Script - Episode Management Auto Refresh

## Danh sách kiểm tra chức năng

### 🔍 Trước khi test:

- [ ] Đảm bảo backend API đang chạy
- [ ] Đảm bảo database có dữ liệu test
- [ ] Mở Developer Tools (F12) → Network tab
- [ ] Mở React Query DevTools (nếu có)

### 📝 Test Case 1: Thêm Episode

1. **Bước thực hiện:**

   - Vào trang Movie Admin
   - Click vào một movie để xem detail
   - Click nút "Thêm tập mới"
   - Điền đầy đủ thông tin episode
   - Click "Thêm"

2. **Kết quả mong đợi:**

   - [ ] Modal đóng tự động
   - [ ] Episode mới xuất hiện trong danh sách
   - [ ] KHÔNG có page reload
   - [ ] Network tab hiển thị POST request
   - [ ] Console.log thành công (không có lỗi)

3. **Debug nếu fail:**

   ```javascript
   // Check console logs
   console.log("Thêm tập mới:", episodeData);

   // Check React Query cache
   queryClient.getQueryData(["all-movies-with-details"]);
   ```

### ✏️ Test Case 2: Sửa Episode

1. **Bước thực hiện:**

   - Click nút "Edit" trên một episode
   - Thay đổi thông tin (ví dụ: tên episode)
   - Click "Cập nhật"

2. **Kết quả mong đợi:**
   - [ ] Modal đóng tự động
   - [ ] Thông tin episode cập nhật ngay lập tức
   - [ ] KHÔNG có page reload
   - [ ] Network tab hiển thị PUT request
   - [ ] Console.log thành công

### 🗑️ Test Case 3: Xóa Episode

1. **Bước thực hiện:**

   - Click nút "Xóa" trên một episode
   - Xác nhận xóa trong modal

2. **Kết quả mong đợi:**

   - [ ] Modal xác nhận hiển thị
   - [ ] Nút "Delete" hiển thị "Deleting..." khi đang xóa
   - [ ] Modal đóng sau khi xóa
   - [ ] Episode biến mất khỏi danh sách
   - [ ] KHÔNG có page reload
   - [ ] Network tab hiển thị DELETE request

3. **Debug nếu fail:**

   ```javascript
   // Check debug logs
   console.log("Deleting episode:", selectedEpisodeToDelete);
   console.log("Current season:", currentSeason);

   // Check API endpoint
   // DELETE /api/episodes/{episodeId}
   ```

### 🔄 Test Case 4: UI Responsiveness

1. **Kiểm tra Loading States:**

   - [ ] Nút "Edit" hiển thị "..." khi đang update
   - [ ] Nút "Xóa" hiển thị "..." khi đang delete
   - [ ] Modal xác nhận có trạng thái loading

2. **Kiểm tra Error Handling:**
   - Tắt internet và thử thực hiện operations
   - [ ] Hiển thị alert với thông báo lỗi
   - [ ] Console.error được log
   - [ ] UI không bị crash

### 🌐 Test Case 5: Network Requests

1. **Mở Developer Tools → Network tab**
2. **Thực hiện từng operation và kiểm tra:**

   **Add Episode:**

   ```
   Method: POST
   URL: /api/seasons/{seasonId}/episodes
   Status: 201 Created
   Response: { id, title, number, ... }
   ```

   **Update Episode:**

   ```
   Method: PUT
   URL: /api/episodes/{episodeId}
   Status: 200 OK
   Response: { id, title, number, ... }
   ```

   **Delete Episode:**

   ```
   Method: DELETE
   URL: /api/episodes/{episodeId}
   Status: 204 No Content
   ```

### 📊 Test Case 6: React Query Cache

1. **Mở React Query DevTools**
2. **Kiểm tra sau mỗi operation:**
   - [ ] Query `["all-movies-with-details"]` được invalidated
   - [ ] Query `["episodes", seasonId]` được invalidated
   - [ ] Data refetch tự động
   - [ ] Cache được update đúng

### 🚨 Các lỗi thường gặp và cách fix:

#### Lỗi: UI không auto refresh

```javascript
// Fix: Kiểm tra query keys
queryClient.invalidateQueries({ queryKey: ["all-movies-with-details"] });
```

#### Lỗi: Episode không có ID

```javascript
// Fix: Đảm bảo mock data có đủ fields
const episode = {
  id: "ep1",
  title: "Episode 1",
  number: "1",
  // ...
};
```

#### Lỗi: API request fail

```javascript
// Fix: Kiểm tra backend endpoint
// Đảm bảo server trả về đúng format
```

#### Lỗi: ConfirmDeleteModal không async

```javascript
// Fix: Đã update để support async
const handleConfirm = async () => {
  await onConfirm(); // Now supports Promise
};
```

### Checklist tổng quát:

- [ ] Tất cả operations hoạt động không cần reload
- [ ] Loading states hiển thị đúng
- [ ] Error handling hoạt động
- [ ] Network requests gửi đúng
- [ ] React Query cache invalidation đúng
- [ ] UI responsive và mượt mà
- [ ] Console không có lỗi
- [ ] Data luôn đồng bộ với backend

### 📝 Notes:

- Nếu có bất kỳ test case nào fail, hãy check console log và network tab trước
- Đảm bảo backend API endpoints hoạt động đúng
- Kiểm tra React Query DevTools để debug cache issues
- Test trên nhiều scenarios khác nhau (slow network, errors, etc.)

**🎯 Mục tiêu: 100% test cases pass để đảm bảo tính năng hoạt động hoàn hảo!**
