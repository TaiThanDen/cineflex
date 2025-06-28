// Utility functions để xử lý dữ liệu episode

/**
 * Chuyển đổi duration từ string sang số giây
 * VD: "45 phút" -> 2700, "1h 30m" -> 5400
 */
export const parseDurationToSeconds = (duration: string): number => {
  // Loại bỏ khoảng trắng và chuyển về lowercase
  const cleanDuration = duration.toLowerCase().trim();
  
  // Pattern cho "1h 30m" hoặc "1 giờ 30 phút"
  const hourMinutePattern = /(\d+)\s*(?:h|giờ)\s*(\d+)\s*(?:m|phút|p)/;
  const hourMinuteMatch = cleanDuration.match(hourMinutePattern);
  
  if (hourMinuteMatch) {
    const hours = parseInt(hourMinuteMatch[1]);
    const minutes = parseInt(hourMinuteMatch[2]);
    return (hours * 60 + minutes) * 60; // Chuyển sang giây
  }
  
  // Pattern cho chỉ giờ: "2h" hoặc "2 giờ"
  const hourPattern = /(\d+)\s*(?:h|giờ)/;
  const hourMatch = cleanDuration.match(hourPattern);
  
  if (hourMatch) {
    const hours = parseInt(hourMatch[1]);
    return hours * 60 * 60; // Chuyển sang giây
  }
  
  // Pattern cho chỉ phút: "45 phút", "45 p", "45 min"
  const minutePattern = /(\d+)\s*(?:phút|p|min|m)/;
  const minuteMatch = cleanDuration.match(minutePattern);
  
  if (minuteMatch) {
    const minutes = parseInt(minuteMatch[1]);
    return minutes * 60; // Chuyển sang giây
  }
  
  // Nếu không match pattern nào, coi như là phút
  const numericMatch = cleanDuration.match(/(\d+)/);
  if (numericMatch) {
    return parseInt(numericMatch[1]) * 60;
  }
  
  // Default fallback
  return 0;
};

/**
 * Chuyển đổi giây thành format hiển thị
 * VD: 2700 -> "45 phút", 5400 -> "1h 30m"
 */
export const formatSecondsToDisplay = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else {
    return `${minutes} phút`;
  }
};

/**
 * Tạo số tập tiếp theo dựa trên danh sách tập hiện có
 */
export const getNextEpisodeNumber = (existingEpisodes: { number: string }[]): string => {
  if (existingEpisodes.length === 0) {
    return "1";
  }
  
  // Tìm số lớn nhất trong danh sách
  const maxNumber = Math.max(
    ...existingEpisodes.map(ep => {
      const num = parseInt(ep.number);
      return isNaN(num) ? 0 : num;
    })
  );
  
  return (maxNumber + 1).toString();
};

/**
 * Validate và format release date
 */
export const formatReleaseDate = (date?: string): string => {
  if (!date) {
    return new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format
  }
  
  // Nếu đã là format YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date;
  }
  
  // Nếu là Date object hoặc timestamp
  try {
    const dateObj = new Date(date);
    return dateObj.toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
};
