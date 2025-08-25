import { FaPlay } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { favoriteShow, getFavoriteCount, isFavorite, unfavoriteShow } from "@/lib/api";
import { Button } from "@mui/material";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";
import { useContext } from "react";
import Auth from "@/context/Auth";
import type { Show } from "@/lib/types/Show";
import StarRating from "@/components/home/StarRating";

interface HeroBannerProps {
  item: Show;
  children?: React.ReactNode;
  selectedIndex?: number;
  setSelectedIndex?: (idx: number) => void;
  isPreviewPage?: boolean;
  firstEpisodeId?: string;
}

const HeroBanner = ({ item, children, isPreviewPage = false, firstEpisodeId }: HeroBannerProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { auth } = useContext(Auth);

  // Favorite functionality
  const isFavoriteResult = useQuery({
    queryKey: ["is-show-favorite", item.id],
    queryFn: () => isFavorite(item.id)
  });

  const favoriteCountResult = useQuery({
    queryKey: ["show-favorite-count", item.id],
    queryFn: () => getFavoriteCount(item.id)
  });

  const favoriteMutation = useMutation({
    mutationFn: favoriteShow
  });

  const unfavoriteMutation = useMutation({
    mutationFn: unfavoriteShow,
  });

  const handleWatchNow = () => {
    if (isPreviewPage && firstEpisodeId) {
      navigate(`/watch/${firstEpisodeId}`);
    } else {
      navigate(`/preview/${item.id}`);
    }
  };

  const handleHeartClick = async () => {
    try {
      if (auth.trim() === "") return navigate("/login");

      if (isFavoriteResult.isError || isFavoriteResult.isLoading) return;

      if (isFavoriteResult.data) {
        await unfavoriteMutation.mutateAsync(item.id);
      } else {
        await favoriteMutation.mutateAsync(item.id);
      }
    } catch {
      toast("Vui lòng thử lại sau!");
    } finally {
      queryClient.invalidateQueries({ queryKey: ["is-show-favorite", item.id] });
      queryClient.invalidateQueries({ queryKey: ["show-favorite-count", item.id] });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    }
  };

  const handleMoreInfo = () => {
    navigate(`/preview/${item.id}`);
  };

  return (
    <div
      className="relative w-full h-max bg-cover text-white transition-all duration-500 overflow-x-hidden"
      style={{
        backgroundImage: `url('${item.thumbnail}')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#23263a] via-black/60 to-transparent" />

      {/* Banner Content */}
      <div
        className="relative w-full px-4 sm:px-8 py-10 sm:py-20 flex flex-col gap-4 sm:gap-6"
        style={{ maxHeight: "60vh" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-xs sm:text-sm uppercase tracking-wide font-semibold text-[#7f22fe] mt-10 sm:mt-20">
              CineFlex
            </div>
            <h1 className="text-2xl sm:text-5xl font-bold leading-tight break-words mb-2">
              {item.title}
            </h1>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-200 mb-2">
              <span>{(new Date(item.releaseDate)).getFullYear()}</span>
              <span>•</span>
              <span>
                {item.onGoing ? 'Đang chiếu' : 'Hoàn thành'}
              </span>
              <span className="bg-gray-700 text-white px-2 py-1 rounded text-xs">
                {item.ageRating}
              </span>
            </div>

            <p
              className="text-gray-200 max-w-full sm:max-w-xl text-xs sm:text-sm leading-relaxed overflow-y-auto scrollbar-hide "
              style={{ maxHeight: "90px" }}
            >
              {item.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2 sm:mt-4 w-full">
              <button
                onClick={handleWatchNow}
                aria-label="Xem ngay"
                className="inline-flex items-center justify-center
                h-12 w-12 sm:h-18 sm:w-18
                rounded-full bg-purple-600 text-white
                hover:bg-purple-700
                shadow-lg ring-1 ring-white/10
                transition"
              >
                <FaPlay className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              {/* Nút Tym*/}
              {!isPreviewPage && isFavoriteResult.data !== null && (
                <Button
                  disabled={favoriteMutation.isPending || unfavoriteMutation.isPending}
                  size="large"
                  className="gap-3 flex items-center bg-white/20 hover:bg-white/30 px-6 py-3 rounded"
                  onClick={async () => {
                    await handleHeartClick();
                  }}
                  sx={{
                    minWidth: 'auto',
                    textTransform: 'none',
                    color: '#ab8fd2',
                    fontSize: '1.1rem',
                    height: '56px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    }
                  }}
                >
                  <Heart
                    className="aspect-square w-7 h-7"
                    color="#ab8fd2"
                    fill={isFavoriteResult.data ? '#ab8fd2' : 'transparent'}
                  />
                  <div className="text-[#ab8fd2] font-semibold text-lg">
                    {favoriteCountResult.data ? favoriteCountResult.data : 0}
                  </div>
                </Button>
              )}
              <StarRating showId={item.id} />

              {/* Fallback More Info nếu không có dữ liệu favorite */}
              {!isPreviewPage && isFavoriteResult.data === null && (
                <button
                  className="w-full sm:w-auto bg-white/20 hover:bg-white/30 text-white font-medium px-4 sm:px-6 py-2 rounded"
                  onClick={handleMoreInfo}
                >
                  <p>More Info</p>
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nội dung phụ */}
      <div className="relative z-10 w-full px-4 sm:px-8  sm:pb-8">
        {children}
      </div>
    </div>
  );
};

export default HeroBanner;
