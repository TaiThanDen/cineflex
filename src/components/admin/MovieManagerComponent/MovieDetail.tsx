import React, { useState } from "react";
import AddSeasonModal from "./AddSeasonModal";
import EditSeasonModal from "./EditSeasonModal";
import AddEpisodeModal from "./AddEpisodeModal";
import EditEpisodeModal from "./EditEpisodeModal";
import ConfirmDeleteModal from "@/components/admin/MovieManagerComponent/ConfirmDeleteModal.tsx";
import EditMovieModal from "@/components/admin/MovieManagerComponent/EditMovieModal";
import GenreDisplay from "../../../examples/GenreDisplay";
import SeasonTabs from "./SeasonTabs";
import { useEpisodeMutations } from "@/lib/hooks/useEpisodeMutations";
import { useShowMutations } from "@/lib/hooks/useShowMutations";
import { useSeasonMutations } from "@/lib/hooks/useSeasonMutations";

interface Props {
  movie: any;
  onBack: () => void;
  onEditEpisode: (
    movieId: string,
    seasonIdx: number,
    episodeIdx: number
  ) => void;
  onDeleteMovie: (movieId: string) => void;
  onAddSeason?: () => void;
  onAddEpisode?: () => void;
}

const MovieDetail: React.FC<Props> = ({
  movie,
  onBack,
  onAddSeason,
  onAddEpisode,
}) => {
  const [seasonIdx, setSeasonIdx] = useState(0);
  const [showAddSeason, setShowAddSeason] = useState(false);
  const [showEditSeason, setShowEditSeason] = useState(false);
  const [selectedSeasonToEdit, setSelectedSeasonToEdit] = useState<any>(null);
  const [selectedSeasonToDelete, setSelectedSeasonToDelete] =
    useState<any>(null);
  const [showDeleteSeasonModal, setShowDeleteSeasonModal] = useState(false);
  const [showAddEpisode, setShowAddEpisode] = useState(false);
  const [showDeleteMovieModal, setShowDeleteMovieModal] = useState(false);
  const [selectedEpisodeToDelete, setSelectedEpisodeToDelete] =
    useState<any>(null);
  const [showDeleteEpisodeModal, setShowDeleteEpisodeModal] = useState(false);
  const [showEditMovieModal, setShowEditMovieModal] = useState(false);
  const [showEditEpisodeModal, setShowEditEpisodeModal] = useState(false);
  const [selectedEpisodeToEdit, setSelectedEpisodeToEdit] = useState<any>(null);
  const [viewingComment, setViewingComment] = useState<{
    seasonIdx: number;
    episodeIdx: number;
  } | null>(null);

  // Hook để xử lý episode mutations
  const {
    deleteEpisodeAsync,
    updateEpisodeAsync,
    isDeletingEpisode,
    isUpdatingEpisode,
  } = useEpisodeMutations();

  // Hook để xử lý show mutations
  const { deleteShowAsync, isDeletingShow } = useShowMutations();

  // Hook để xử lý season mutations
  const {
    isAddingSeason,
    updateSeasonAsync,
    isUpdatingSeason,
    deleteSeasonAsync,
    isDeletingSeason,
  } = useSeasonMutations();

  // Function xử lý xóa episode
  const handleDeleteEpisode = async () => {
    if (!selectedEpisodeToDelete) return;

    try {
      // Log để debug
      console.log("Deleting episode:", selectedEpisodeToDelete);
      console.log("Current movie:", movie);
      console.log("Season index:", seasonIdx);

      // Lấy season hiện tại
      const currentSeason = movie.seasons?.[seasonIdx];
      if (!currentSeason) {
        throw new Error("Không tìm thấy season hiện tại");
      }

      console.log("Current season:", currentSeason);

      // Sử dụng mutation từ hook để auto update cache
      await deleteEpisodeAsync({
        episodeId: selectedEpisodeToDelete.id,
        seasonId: currentSeason.id,
      });

      alert("Xóa tập phim thành công!");
      setSelectedEpisodeToDelete(null);
      setShowDeleteEpisodeModal(false);

      // UI sẽ tự động cập nhật thông qua React Query cache invalidation
      // Không cần reload page nữa
    } catch (error) {
      console.error("Lỗi khi xóa episode:", error);
      console.error("Error details:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      alert(`Có lỗi xảy ra khi xóa tập phim: ${errorMessage}`);
    }
  };

  // Function xử lý edit episode
  const handleEditEpisode = (episode: any) => {
    setSelectedEpisodeToEdit(episode);
    setShowEditEpisodeModal(true);
  };

  // Function xử lý update episode
  const handleUpdateEpisode = async (episodeData: any) => {
    if (!selectedEpisodeToEdit) return;

    try {
      await updateEpisodeAsync({
        episodeId: selectedEpisodeToEdit.id,
        data: episodeData,
      });

      alert("Cập nhật tập phim thành công!");
      setSelectedEpisodeToEdit(null);
      setShowEditEpisodeModal(false);

      // UI sẽ tự động cập nhật thông qua React Query cache invalidation
      // Không cần reload page nữa
    } catch (error) {
      console.error("Lỗi khi cập nhật episode:", error);
      alert("Có lỗi xảy ra khi cập nhật tập phim!");
    }
  };

  // Function xử lý xóa movie
  const handleDeleteMovie = async () => {
    if (!movie.id) {
      alert("Không tìm thấy ID phim để xóa");
      return;
    }

    try {
      // Chiến lược 1: Thử xóa trực tiếp phim (backend sẽ xử lý cascade)
      await deleteShowAsync(movie.id);
      alert("Xóa phim thành công!");
      onBack(); // Quay lại danh sách
      
    } catch (error) {
      console.error("Lỗi khi xóa phim:", error);
      
      // Parse error message từ API response
      let errorMessage = "Có lỗi xảy ra khi xóa phim!";
      let shouldRetryWithCascade = false;
      
      if (error instanceof Error) {
        try {
          // Thử parse JSON error message từ backend
          const errorData = JSON.parse(error.message);
          if (errorData.detail) {
            errorMessage = errorData.detail;
            // Kiểm tra nếu lỗi do foreign key constraints
            if (errorData.detail.includes("Cannot delete") || errorData.detail.includes("foreign key")) {
              shouldRetryWithCascade = true;
            }
          } else if (errorData.title) {
            errorMessage = errorData.title;
          }
        } catch (parseError) {
          // Nếu không parse được JSON, sử dụng message gốc
          errorMessage = error.message;
          // Kiểm tra một số lỗi phổ biến
          if (error.message.includes("500") || error.message.includes("Cannot delete")) {
            shouldRetryWithCascade = true;
          }
        }
      }

      // Hiển thị lỗi chi tiết với gợi ý giải pháp
      if (shouldRetryWithCascade) {
        const retryMessage = `Lỗi: ${errorMessage}\n\nLỗi này thường xảy ra khi phim có dữ liệu liên quan (seasons/episodes).\n\nGợi ý giải pháp:\n1. Xóa tất cả tập phim trong phim trước\n2. Xóa tất cả mùa phim trước\n3. Sau đó mới xóa phim\n\nHoặc liên hệ admin để xử lý cascade delete trên backend.`;
        alert(retryMessage);
      } else {
        alert(`Lỗi: ${errorMessage}\n\nVui lòng thử lại hoặc liên hệ admin.`);
      }
    }
  };

  // Function xử lý update movie
  const handleUpdateMovie = async (updatedMovie: any) => {
    try {
      console.log("Phim đã cập nhật:", updatedMovie);
      setShowEditMovieModal(false);
      // UI sẽ tự động cập nhật thông qua React Query cache invalidation
    } catch (error) {
      console.error("Lỗi khi cập nhật phim:", error);
    }
  };

  // Function xử lý thêm season
  const handleAddSeason = async (seasonData: any) => {
    try {
      console.log("Thêm mùa mới:", seasonData);
      setShowAddSeason(false);

      // Chuyển đến season mới (season cuối cùng)
      // Số lượng season sau khi thêm sẽ là độ dài hiện tại + 1
      // Index của season mới sẽ là độ dài hiện tại (vì index bắt đầu từ 0)
      const newSeasonIndex = movie.seasons?.length || 0;
      setTimeout(() => {
        setSeasonIdx(newSeasonIndex);
      }, 100); // Delay nhỏ để đảm bảo cache đã được cập nhật

      // API mutation sẽ tự động invalidate cache và UI sẽ tự động cập nhật
    } catch (error) {
      console.error("Lỗi khi thêm season:", error);
    }
  };

  // Function xử lý edit season
  const handleEditSeason = (season: any) => {
    setSelectedSeasonToEdit(season);
    setShowEditSeason(true);
  };

  // Function xử lý update season
  const handleUpdateSeason = async (seasonData: any) => {
    if (!selectedSeasonToEdit) return;

    try {
      await updateSeasonAsync({
        seasonId: selectedSeasonToEdit.id,
        data: seasonData,
      });

      alert("Cập nhật mùa phim thành công!");
      setSelectedSeasonToEdit(null);
      setShowEditSeason(false);

      // UI sẽ tự động cập nhật thông qua React Query cache invalidation
    } catch (error) {
      console.error("Lỗi khi cập nhật season:", error);
      alert("Có lỗi xảy ra khi cập nhật mùa phim!");
    }
  };

  // Function xử lý xóa season
  const handleDeleteSeason = async () => {
    if (!selectedSeasonToDelete) return;

    try {
      await deleteSeasonAsync(selectedSeasonToDelete.id);

      alert("Xóa mùa phim thành công!");
      setSelectedSeasonToDelete(null);
      setShowDeleteSeasonModal(false);

      // Nếu đang xem season bị xóa, chuyển về season đầu tiên
      if (seasonIdx >= movie.seasons?.length - 1) {
        setSeasonIdx(0);
      }

      // UI sẽ tự động cập nhật thông qua React Query cache invalidation
    } catch (error) {
      console.error("Lỗi khi xóa season:", error);
      alert("Có lỗi xảy ra khi xóa mùa phim!");
    }
  };

  const currentEpisode = viewingComment
    ? movie.seasons[viewingComment.seasonIdx].episodes[
    viewingComment.episodeIdx
    ]
    : null;

  return (
    <div className="container mx-auto py-8 flex gap-8">
      {/* Left */}
      <div className="w-1/4 border-r p-6 flex flex-col gap-4">
        <img
          src={movie.thumbnail}
          alt="Poster"
          className="w-70 h-auto object-cover rounded-xl mb-4"
        />
        <p className="text-2xl font-bold ">{movie.title}</p>
        {/* Hiển thị genres/tags */}
        <GenreDisplay
          genres={movie.genres}
          tags={movie.tags}
          maxDisplay={3}
          className="mt-2 w-100"
        />
        <div>
          <div className="font-bold text-sm mb-1 mt-2">Mô tả phim</div>
          <div className="text-gray-600 text-sm">{movie.description}</div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={onBack}
            className="text-blue-500 hover:underline text-sm"
          >
            ← Quay lại
          </button>
          <button
            onClick={() => setShowEditMovieModal(true)}
            className="text-sm px-2 py-1 text-gray-600 hover:text-indigo-600 border border-transparent hover:border-indigo-300 rounded transition"
          >
            ✏️ Chỉnh sửa
          </button>
        </div>
      </div>

      {/* Right */}
      <div className="w-3/4 p-6 relative">
        {viewingComment ? (
          <div>
            <button
              onClick={() => setViewingComment(null)}
              className="text-blue-500 mb-4 hover:underline"
            >
              ← Quay lại danh sách tập
            </button>
            <h2 className="text-xl font-bold mb-4">
              Bình luận - Tập: {currentEpisode?.name}
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-2 px-3 font-bold">#</th>
                    <th className="py-2 px-3 font-bold">Tên người dùng</th>
                    <th className="py-2 px-3 font-bold">Nội dung</th>
                    <th className="py-2 px-3 font-bold">Thời gian</th>
                    <th className="py-2 px-3 font-bold">Trạng thái</th>
                    <th className="py-2 px-3 font-bold">Hành động</th>
                  </tr>
                </thead>

                <tbody>
                  {(currentEpisode?.comments ?? []).map(
                    (cmt: any, idx: number) => (
                      <tr key={idx} className="border-b border-gray-400">
                        <td className="py-2 px-3">{idx + 1}</td>
                        <td className="py-2 px-3">{cmt.user}</td>
                        <td className="py-2 px-3">{cmt.content}</td>
                        <td className="py-2 px-3">{cmt.time ?? "—"}</td>

                        {/* Trạng thái */}
                        <td className="py-2 px-3">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${cmt.status === "hiện"
                                ? "bg-green-100 text-green-600"
                                : "bg-gray-200 text-gray-600"
                              }`}
                          >
                            {cmt.status === "hiện" ? "Hiện" : "Ẩn"}
                          </span>
                        </td>

                        {/* Hành động */}
                        <td className="py-2 px-3 flex gap-2">
                          {cmt.status === "hiện" ? (
                            <button className="bg-yellow-400 hover:bg-yellow-500 text-white rounded px-2 py-1 text-xs font-semibold">
                              Ẩn
                            </button>
                          ) : (
                            <button className="bg-green-500 hover:bg-green-600 text-white rounded px-2 py-1 text-xs font-semibold">
                              Hiện
                            </button>
                          )}

                          <button className="bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1 text-xs font-semibold">
                            Xóa
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            {currentEpisode?.comments?.length === 0 && (
              <p className="text-gray-500 mt-4">Chưa có bình luận nào.</p>
            )}
          </div>
        ) : (
          <>
            {/* Nút thêm */}
            <div className="flex justify-end gap-2 mb-4">
              <button
                className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 text-sm font-semibold flex items-center gap-1 disabled:opacity-50"
                onClick={onAddSeason || (() => setShowAddSeason(true))}
                disabled={isAddingSeason}
              >
                {isAddingSeason ? "+ Đang thêm..." : "+ Thêm mùa phim"}
              </button>
              <button
                className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 text-sm font-semibold flex items-center gap-1"
                onClick={onAddEpisode || (() => setShowAddEpisode(true))}
              >
                + Thêm tập phim
              </button>
              <button
                className="bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-700 text-sm font-semibold disabled:opacity-50"
                onClick={() => setShowDeleteMovieModal(true)}
                disabled={isDeletingShow}
              >
                {isDeletingShow ? "🗑 Đang xóa..." : "🗑 Xóa phim"}
              </button>
            </div>

            {/* Season Tabs */}
            <SeasonTabs
              seasons={movie.seasons || []}
              activeSeason={seasonIdx}
              onSeasonChange={setSeasonIdx}
              episodes={movie.seasons?.[seasonIdx]?.episodes || []}
              className="mb-4"
              onEditSeason={handleEditSeason}
              onDeleteSeason={(season) => {
                setSelectedSeasonToDelete(season);
                setShowDeleteSeasonModal(true);
              }}
              isUpdating={isUpdatingSeason}
              isDeleting={isDeletingSeason}
            />

            {/* Table episode */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-2 px-3 font-bold">#</th>
                    <th className="py-2 px-3 font-bold">Tên tập</th>
                    <th className="py-2 px-3 font-bold">URL</th>
                    <th className="py-2 px-3 font-bold">Thời lượng</th>
                    <th className="py-2 px-3 font-bold">Hành động</th>
                  </tr>
                </thead>{" "}
                <tbody>
                  {movie.seasons &&
                    movie.seasons[seasonIdx] &&
                    movie.seasons[seasonIdx].episodes &&
                    movie.seasons[seasonIdx].episodes.length > 0 ? (
                    movie.seasons[seasonIdx].episodes.map(
                      (ep: any, epIdx: number) => (
                        <tr className="border-b border-gray-400" key={ep.id}>
                          <td className="py-2 px-3">{epIdx + 1}</td>
                          <td className="py-2 px-3">{ep.name || ep.title}</td>
                          <td className="py-2 px-3">{ep.url}</td>
                          <td className="py-2 px-3">
                            {typeof ep.duration === "number"
                              ? `${ep.duration} phút`
                              : ep.duration}
                          </td>
                          <td className="py-2 px-3 flex gap-2">
                            <button
                              className="bg-yellow-400 hover:bg-yellow-500 text-white rounded px-2 py-1 text-xs font-semibold disabled:opacity-50"
                              onClick={() => handleEditEpisode(ep)}
                              disabled={isUpdatingEpisode}
                            >
                              {isUpdatingEpisode ? "..." : "Edit"}
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1 text-xs font-semibold disabled:opacity-50"
                              onClick={() => {
                                setSelectedEpisodeToDelete(ep);
                                setShowDeleteEpisodeModal(true);
                              }}
                              disabled={isDeletingEpisode}
                            >
                              {isDeletingEpisode ? "..." : "Xóa"}
                            </button>
                            <button
                              className="bg-blue-500 hover:bg-blue-600 text-white rounded px-2 py-1 text-xs font-semibold"
                              onClick={() =>
                                setViewingComment({
                                  seasonIdx,
                                  episodeIdx: epIdx,
                                })
                              }
                            >
                              Bình luận
                            </button>
                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-4 px-3 text-center text-gray-500"
                      >
                        Không có tập phim nào trong mùa này
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Các modal */}
        {showAddSeason && (
          <AddSeasonModal
            movieId={movie.id}
            existingSeasons={movie.seasons || []}
            onClose={() => setShowAddSeason(false)}
            onAdd={handleAddSeason}
          />
        )}
        {showAddEpisode && (
          <AddEpisodeModal
            seasons={movie.seasons || []}
            onClose={() => setShowAddEpisode(false)}
            onAdd={(episodeData) => {
              console.log("Thêm tập mới:", episodeData);
              // Modal sẽ tự handle việc thêm episode và invalidate cache
              setShowAddEpisode(false);
            }}
          />
        )}
        {showDeleteMovieModal && (
          <ConfirmDeleteModal
            title="Xóa phim"
            message={(() => {
              const hasSeasons = movie.seasons && movie.seasons.length > 0;
              const totalEpisodes = movie.seasons?.reduce((total: number, season: any) => 
                total + (season.episodes?.length || 0), 0) || 0;
              
              let message = `Bạn có chắc chắn muốn xóa phim "${movie.title}" không?`;
              
              if (hasSeasons) {
                message += `\n\nPhim này có:\n• ${movie.seasons.length} mùa phim\n• ${totalEpisodes} tập phim`;
                message += `\n\nTất cả dữ liệu liên quan sẽ bị xóa vĩnh viễn.`;
              }
              
              message += `\n\nThao tác này không thể hoàn tác.`;
              
              return message;
            })()}
            onClose={() => setShowDeleteMovieModal(false)}
            onConfirm={async () => {
              await handleDeleteMovie();
              setShowDeleteMovieModal(false);
            }}
          />
        )}
        {showDeleteEpisodeModal && selectedEpisodeToDelete && (
          <ConfirmDeleteModal
            title="Xóa tập phim"
            onClose={() => {
              setShowDeleteEpisodeModal(false);
              setSelectedEpisodeToDelete(null);
            }}
            onConfirm={handleDeleteEpisode}
          />
        )}
        {showEditMovieModal && (
          <EditMovieModal
            movie={movie}
            onClose={() => setShowEditMovieModal(false)}
            onSave={handleUpdateMovie}
          />
        )}

        {/* Edit Episode Modal */}
        {showEditEpisodeModal && selectedEpisodeToEdit && (
          <EditEpisodeModal
            episode={selectedEpisodeToEdit}
            seasons={movie.seasons || []}
            onClose={() => {
              setShowEditEpisodeModal(false);
              setSelectedEpisodeToEdit(null);
            }}
            onUpdate={handleUpdateEpisode}
          />
        )}

        {/* Edit Season Modal */}
        {showEditSeason && selectedSeasonToEdit && (
          <EditSeasonModal
            season={selectedSeasonToEdit}
            onClose={() => {
              setShowEditSeason(false);
              setSelectedSeasonToEdit(null);
            }}
            onUpdate={handleUpdateSeason}
            isLoading={isUpdatingSeason}
          />
        )}

        {/* Delete Season Modal */}
        {showDeleteSeasonModal && selectedSeasonToDelete && (
          <ConfirmDeleteModal
            title="Xóa mùa phim"
            message={`Bạn có chắc chắn muốn xóa mùa "${selectedSeasonToDelete.title}"? Tất cả tập phim trong mùa này cũng sẽ bị xóa.`}
            onClose={() => {
              setShowDeleteSeasonModal(false);
              setSelectedSeasonToDelete(null);
            }}
            onConfirm={handleDeleteSeason}
          />
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
