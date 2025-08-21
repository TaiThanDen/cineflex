# Hướng dẫn hiển thị mùa phim (Seasons)

## 📋 Tổng quan

Hướng dẫn cách hiển thị danh sách mùa phim và tập phim trong ứng dụng CineFlex.

## 🎯 Các cách hiển thị Seasons

### 1. **Sử dụng SeasonTabs Component (Admin)**

```tsx
import SeasonTabs from "@/components/admin/MovieManagerComponent/SeasonTabs";

<SeasonTabs
  seasons={movie.seasons || []}
  activeSeason={seasonIdx}
  onSeasonChange={setSeasonIdx}
  episodes={currentEpisodes}
  className="mb-4"
/>;
```

### 2. **Sử dụng SeasonEpisodeList (User Frontend)**

```tsx
import SeasonEpisodeList from "@/components/PreviewFilm/SeasonEpisodeList";

<SeasonEpisodeList seasons={seasons} episodesBySeason={episodesBySeason} />;
```

### 3. **Custom Display đơn giản**

```tsx
const SeasonsDisplay = ({ seasons, onSeasonSelect }) => {
  const [activeSeason, setActiveSeason] = useState(0);

  return (
    <div>
      {/* Season Tabs */}
      <div className="flex gap-2 mb-4">
        {seasons.map((season, idx) => (
          <button
            key={season.id}
            className={`px-4 py-2 rounded ${
              activeSeason === idx ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveSeason(idx)}
          >
            Mùa {season.seasonNumber || idx + 1}
          </button>
        ))}
      </div>

      {/* Current Season Info */}
      {seasons[activeSeason] && (
        <div>
          <h3>{seasons[activeSeason].title}</h3>
          <p>{seasons[activeSeason].description}</p>
        </div>
      )}
    </div>
  );
};
```

## 🔧 Cấu trúc dữ liệu

### Season Interface

```typescript
interface Season {
  id: string;
  title?: string;
  seasonNumber?: number;
  releaseDate: string;
  description: string;
  episodes?: Episode[];
}
```

### Episode Interface

```typescript
interface Episode {
  id: string;
  title: string;
  url: string;
  duration: number;
  description?: string;
  releaseDate: string;
}
```

## 🎨 Styling Guidelines

### Colors

- **Active Tab**: `bg-indigo-600 text-white`
- **Inactive Tab**: `text-gray-600 hover:text-indigo-600`
- **Season Info**: `bg-gray-50 rounded-lg p-3`

### Layout

- **Horizontal Tabs**: `flex gap-1 overflow-x-auto`
- **Responsive**: `whitespace-nowrap` cho mobile
- **Episode Count**: Badge nhỏ bên cạnh tên mùa

## 📱 Responsive Design

```css
/* Mobile First */
.season-tabs {
  @apply flex gap-1 overflow-x-auto;
}

.season-tab {
  @apply px-4 py-2 whitespace-nowrap;
}

/* Desktop */
@screen md {
  .season-tabs {
    @apply overflow-visible;
  }
}
```

## ⚡ Best Practices

### 1. **Error Handling**

```tsx
// Luôn check seasons tồn tại
{
  movie.seasons && movie.seasons.length > 0 ? (
    <SeasonTabs seasons={movie.seasons} />
  ) : (
    <div>Chưa có mùa phim nào</div>
  );
}
```

### 2. **Loading States**

```tsx
{
  isLoading ? (
    <div className="animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-10 bg-gray-300 rounded mb-2"></div>
      ))}
    </div>
  ) : (
    <SeasonTabs seasons={seasons} />
  );
}
```

### 3. **Safe Navigation**

```tsx
// Tránh crash khi data null
const currentEpisodes = movie.seasons?.[seasonIdx]?.episodes || [];
const seasonTitle = season.title || season.seasonNumber || "Unnamed Season";
```

## 🚀 API Integration

### Lấy seasons và episodes

```typescript
// Từ useMovieData hook
const { data: movieWithDetails } = useAllMoviesData();

// Hoặc riêng biệt
const seasons = await getSeasonsByShowId(showId);
const episodes = await getEpisodesBySeasonId(seasonId);
```

### Cấu trúc dữ liệu trả về

```javascript
{
  id: "show123",
  title: "Breaking Bad",
  seasons: [
    {
      id: "season1",
      title: "Season 1",
      seasonNumber: 1,
      releaseDate: "2008-01-20",
      description: "The beginning...",
      episodes: [
        {
          id: "ep1",
          title: "Pilot",
          url: "video_url",
          duration: 3480, // seconds
          releaseDate: "2008-01-20"
        }
      ]
    }
  ]
}
```

## 🎭 UX/UI Features

### Features đã implement:

- Tab navigation
- Episode count badges
- Season descriptions
- Responsive horizontal scroll
- Loading states
- Empty states
- Consistent styling

### Có thể thêm:

- 🔄 Drag & drop reorder seasons
- 🎬 Season thumbnails
- 📊 Season progress tracking
- 🔍 Search episodes within season
- ⭐ Season ratings

## 📂 File Structure

```
src/
├── components/
│   ├── admin/MovieManagerComponent/
│   │   ├── SeasonTabs.tsx          # Admin season tabs
│   │   └── MovieDetail.tsx         # Uses SeasonTabs
│   └── PreviewFilm/
│       └── SeasonEpisodeList.tsx   # User-facing seasons
├── examples/
│   └── SEASONS_GUIDE.md           # This file
└── lib/hooks/
    └── useMovieData.ts            # Data fetching
```
