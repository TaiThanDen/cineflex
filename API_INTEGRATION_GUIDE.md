# CineFlex API Integration Update

## Tổng quan

Đã cập nhật toàn bộ hệ thống API và UI để tương thích với tài liệu API mới. Hệ thống hiện tại sử dụng các endpoint chuẩn REST API và có type safety hoàn chỉnh.

## Các thay đổi chính

### 1. API Layer (`src/lib/api/seasonApi.ts`)

#### Endpoints đã cập nhật:
- `GET /api/shows` - Lấy danh sách phim với phân trang và filter theo genres
- `GET /api/shows/{id}` - Lấy chi tiết phim
- `POST /api/shows` - Tạo phim mới
- `PUT /api/shows/{id}` - Cập nhật phim
- `DELETE /api/shows/{id}` - Xóa phim
- `GET /api/shows/{id}/seasons` - Lấy seasons của phim
- `POST /api/shows/{id}/seasons` - Thêm season vào phim
- `GET /api/seasons/{id}` - Lấy chi tiết season
- `PUT /api/seasons/{id}` - Cập nhật season
- `DELETE /api/seasons/{id}` - Xóa season
- `GET /api/seasons/{id}/episodes` - Lấy episodes của season
- `POST /api/seasons/{id}/episodes` - Thêm episode vào season
- `GET /api/episodes/{id}` - Lấy chi tiết episode
- `PUT /api/episodes/{id}` - Cập nhật episode
- `DELETE /api/episodes/{id}` - Xóa episode
- `GET /api/genres` - Lấy tất cả genres
- `POST /api/genres` - Tạo genre mới
- `GET /api/genres/{id}` - Lấy chi tiết genre
- `PUT /api/genres/{id}` - Cập nhật genre
- `DELETE /api/genres/{id}` - Xóa genre

#### Return Types:
Tất cả API functions đã có return type annotations:
```typescript
export const getAllShows = async (page: number = 1, limit: number = 10, genres?: string[]): Promise<Show[]>
export const getShowById = async (showId: string): Promise<Show>
export const createShow = async (data: CreateShowRequest): Promise<Show>
// ... etc
```

### 2. Type Definitions (`src/lib/types/api.ts`)

#### API Response Types:
```typescript
interface Show {
  id: string;
  title: string;
  description: string;
  releaseDate: string;
  thumbnail: string;
  onGoing: boolean;
  isSeries: boolean;
  ageRating: string;
}

interface Season {
  id: string;
  title: string;
  releaseDate: string;
  description: string;
  show: string; // showId
}

interface Episode {
  id: string;
  title: string;
  number: string;
  description: string;
  url: string;
  releaseDate: string;
  duration: number; // in minutes
  openingStart: number;
  openingEnd: number;
  season: string; // seasonId
}

interface Genre {
  id: string;
  name: string;
}
```

#### Request Types:
```typescript
interface CreateShowRequest {
  title: string;
  description: string;
  releaseDate: string;
  thumbnail: string;
  onGoing: boolean;
  isSeries: boolean;
  ageRating: string;
}

interface CreateSeasonRequest {
  title: string;
  releaseDate: string;
  description: string;
}

interface CreateEpisodeRequest {
  title: string;
  number: string;
  description: string;
  url: string;
  releaseDate: string;
  duration: number;
  openingStart?: number;
  openingEnd?: number;
}
```

### 3. Query Hooks (`src/lib/hooks/useShowQueries.ts`)

#### Các query hooks mới:
```typescript
export const useAllShows = (page: number = 1, limit: number = 10, genres?: string[]) => {
  return useQuery<Show[]>({
    queryKey: ["all-shows", page, limit, genres],
    queryFn: () => getAllShows(page, limit, genres),
    staleTime: 5 * 60 * 1000,
  });
};

export const useShowDetails = (showId: string | undefined) => {
  return useQuery<Show>({
    queryKey: ["show-details", showId],
    queryFn: () => getShowById(showId!),
    enabled: !!showId,
  });
};

export const useShowSeasons = (showId: string | undefined) => {
  return useQuery<Season[]>({
    queryKey: ["show-seasons", showId],
    queryFn: () => getShowSeasons(showId!),
    enabled: !!showId,
  });
};
```

### 4. Mutation Hooks (`src/lib/hooks/useSeasonMutations.ts`)

#### Mutations đã cập nhật:
```typescript
// Show mutations
export const useCreateShowMutation = () => {
  return useMutation({
    mutationFn: createShow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-shows'] });
      toast.success('Phim đã được tạo thành công!');
    },
  });
};

// Season mutations
export const useCreateSeasonMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateSeasonRequest & { showId: string }) => {
      const { showId, ...seasonData } = data;
      return addSeasonToShow(showId, seasonData);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['show-details', variables.showId] });
      queryClient.invalidateQueries({ queryKey: ['show-seasons', variables.showId] });
    },
  });
};

// Episode mutations
export const useCreateEpisodeMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateEpisodeRequest & { seasonId: string }) => {
      const { seasonId, ...episodeData } = data;
      return addEpisodeToSeason(seasonId, episodeData);
    },
  });
};

// Genre mutations
export const useCreateGenreMutation = () => {
  return useMutation({
    mutationFn: createGenre,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-genres'] });
    },
  });
};
```

### 5. UI Components (`src/pages/admin/MovieAdminPage.tsx`)

#### Cập nhật sử dụng data:
```typescript
export default function MovieAdminPage() {
  const { id } = useParams();
  const mutations = useContentMutations();
  const adminData = useMovieAdminData(id, undefined);

  const movieData = adminData.shows.data || [];
  const selectedMovie = id ? adminData.showDetails.data : null;
  const selectedMovieSeasons = id ? (adminData.showSeasons.data || []) : [];

  // Handlers với proper mapping
  const handleAddSeason = (seasonData: SeasonFormData) => {
    if (!id) return;
    mutations.createSeason.mutate({
      ...seasonData,
      showId: id,
    });
  };

  const handleAddEpisode = (episodeData: {
    name: string;
    url: string;
    duration: string;
    seasonId: string;
    description: string;
    episodeNumber: number;
  }) => {
    mutations.createEpisode.mutate({
      title: episodeData.name,
      number: episodeData.episodeNumber.toString(),
      description: episodeData.description,
      url: episodeData.url,
      releaseDate: new Date().toISOString().split('T')[0],
      duration: episodeData.duration,
      seasonId: episodeData.seasonId,
    });
  };
}
```

## Cách sử dụng

### 1. Quản lý Shows
```typescript
// Lấy danh sách shows
const { data: shows, isLoading } = useAllShows(1, 10);

// Tạo show mới
const createShowMutation = useCreateShowMutation();
createShowMutation.mutate({
  title: "New Show",
  description: "Description",
  releaseDate: "2024-01-01",
  thumbnail: "https://...",
  onGoing: true,
  isSeries: true,
  ageRating: "16+"
});
```

### 2. Quản lý Seasons
```typescript
// Lấy seasons của show
const { data: seasons } = useShowSeasons(showId);

// Thêm season mới
const createSeasonMutation = useCreateSeasonMutation();
createSeasonMutation.mutate({
  title: "Season 1",
  description: "First season",
  releaseDate: "2024-01-01",
  showId: "show-id"
});
```

### 3. Quản lý Episodes
```typescript
// Lấy episodes của season
const { data: episodes } = useSeasonEpisodes(seasonId);

// Thêm episode mới
const createEpisodeMutation = useCreateEpisodeMutation();
createEpisodeMutation.mutate({
  title: "Episode 1",
  number: "1",
  description: "First episode",
  url: "https://...",
  releaseDate: "2024-01-01",
  duration: "45 phút", // Will be converted to number
  seasonId: "season-id"
});
```

## Error Handling

Tất cả mutations đều có error handling và toast notifications:

```typescript
export const useCreateShowMutation = () => {
  return useMutation({
    mutationFn: createShow,
    onSuccess: () => {
      toast.success('Phim đã được tạo thành công!');
    },
    onError: (error: any) => {
      console.error('Lỗi khi tạo phim:', error);
      toast.error(\`Lỗi khi tạo phim: \${error.message || 'Vui lòng thử lại'}\`);
    },
  });
};
```

## Cache Management

Query invalidation được quản lý tự động:

```typescript
// Khi tạo show mới -> invalidate danh sách shows
queryClient.invalidateQueries({ queryKey: ['all-shows'] });

// Khi thêm season -> invalidate show details và seasons
queryClient.invalidateQueries({ queryKey: ['show-details', showId] });
queryClient.invalidateQueries({ queryKey: ['show-seasons', showId] });

// Khi thêm episode -> invalidate season episodes
queryClient.invalidateQueries({ queryKey: ['season-episodes', seasonId] });
```

## Testing

### 1. Test API endpoints:
```bash
# Test lấy danh sách shows
curl -X GET "http://your-api/api/shows?page=1&limit=10"

# Test tạo show mới
curl -X POST "http://your-api/api/shows" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <token>" \\
  -d '{
    "title": "Test Show",
    "description": "Test Description",
    "releaseDate": "2024-01-01",
    "thumbnail": "https://...",
    "onGoing": true,
    "isSeries": true,
    "ageRating": "16+"
  }'
```

### 2. Test UI components:
1. Vào trang admin `/admin/movies`
2. Kiểm tra danh sách phim được load
3. Click vào một phim để xem chi tiết
4. Test các chức năng thêm/sửa/xóa season và episode
5. Kiểm tra toast notifications và loading states

## Troubleshooting

### 1. CORS Issues:
- Đảm bảo backend có cấu hình CORS đúng
- Kiểm tra request headers có Authorization token

### 2. Type Errors:
- Tất cả types đã được định nghĩa trong `src/lib/types/api.ts`
- Sử dụng proper typing trong components

### 3. Query Cache Issues:
- Kiểm tra queryKey trong các hooks
- Sử dụng proper cache invalidation

### 4. API Response Format:
- Đảm bảo backend trả về đúng format như định nghĩa trong types
- Kiểm tra console log để debug response data

## Next Steps

1. **Authentication**: Thêm token management và refresh token
2. **Pagination**: Implement proper pagination cho large datasets
3. **Search**: Cải thiện search functionality
4. **File Upload**: Thêm upload hình ảnh và video
5. **Validation**: Thêm client-side validation cho forms
6. **Performance**: Implement virtual scrolling cho large lists
7. **Testing**: Thêm unit tests và integration tests
