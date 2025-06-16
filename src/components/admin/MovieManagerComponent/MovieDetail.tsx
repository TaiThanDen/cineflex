import React, { useState } from "react";
import AddSeasonModal from "./AddSeasonModal";
import AddEpisodeModal from "./AddEpisodeModal";
import ConfirmDeleteModal from "@/components/admin/MovieManagerComponent/ConfirmDeleteModal.tsx";
import EditMovieModal from "@/components/admin/MovieManagerComponent/EditMovieModal";

interface Props {
  movie: any;
  onBack: () => void;
  onEditEpisode: (
      movieId: string,
      seasonIdx: number,
      episodeIdx: number
  ) => void;
  onDeleteMovie: (movieId: string) => void;
}

const MovieDetail: React.FC<Props> = ({ movie, onBack, onEditEpisode }) => {
  const [seasonIdx, setSeasonIdx] = useState(0);
  const [showAddSeason, setShowAddSeason] = useState(false);
  const [showAddEpisode, setShowAddEpisode] = useState(false);
  const [showDeleteMovieModal, setShowDeleteMovieModal] = useState(false);
  const [selectedEpisodeToDelete, setSelectedEpisodeToDelete] = useState<any>(null);
  const [showDeleteEpisodeModal, setShowDeleteEpisodeModal] = useState(false);
  const [showEditMovieModal, setShowEditMovieModal] = useState(false);
  const [viewingComment, setViewingComment] = useState<{
    seasonIdx: number;
    episodeIdx: number;
  } | null>(null);

  const currentEpisode = viewingComment
      ? movie.seasons[viewingComment.seasonIdx].episodes[viewingComment.episodeIdx]
      : null;

  return (
      <div className="container mx-auto py-8 flex gap-8">
        {/* Left */}
        <div className="w-1/4 border-r p-6 flex flex-col gap-4">
          <img
              src={movie.poster}
              alt="Poster"
              className="w-70 h-auto object-cover rounded-xl mb-4"
          />
          <div className="flex flex-wrap gap-2">
            {movie.tags.map((tag: string) => (
                <span
                    key={tag}
                    className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded text-xs"
                >
              {tag}
            </span>
            ))}
          </div>
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
                    {(currentEpisode?.comments ?? []).map((cmt: any, idx: number) => (
                        <tr key={idx} className="border-b border-gray-400">
                          <td className="py-2 px-3">{idx + 1}</td>
                          <td className="py-2 px-3">{cmt.user}</td>
                          <td className="py-2 px-3">{cmt.content}</td>
                          <td className="py-2 px-3">{cmt.time ?? "—"}</td>

                          {/* Trạng thái */}
                          <td className="py-2 px-3">
            <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                    cmt.status === "hiện"
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
                                <button
                                    className="bg-yellow-400 hover:bg-yellow-500 text-white rounded px-2 py-1 text-xs font-semibold"
                                >
                                  Ẩn
                                </button>
                            ) : (
                                <button
                                    className="bg-green-500 hover:bg-green-600 text-white rounded px-2 py-1 text-xs font-semibold"
                                >
                                  Hiện
                                </button>
                            )}

                            <button
                                className="bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1 text-xs font-semibold"
                            >
                              Xóa
                            </button>
                          </td>
                        </tr>
                    ))}
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
                      className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 text-sm font-semibold flex items-center gap-1"
                      onClick={() => setShowAddSeason(true)}
                  >
                    + Thêm mùa phim
                  </button>
                  <button
                      className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 text-sm font-semibold flex items-center gap-1"
                      onClick={() => setShowAddEpisode(true)}
                  >
                    + Thêm tập phim
                  </button>
                  <button
                      className="bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-700 text-sm font-semibold"
                      onClick={() => setShowDeleteMovieModal(true)}
                  >
                    🗑 Xóa phim
                  </button>
                </div>

                {/* Tabs season */}
                <div className="mb-2">
                  <ul className="flex border-b border-gray-400 text-sm gap-1">
                    {movie.seasons.map((s: any, idx: number) => (
                        <li key={s.seasonNumber}>
                          <button
                              className={`px-4 py-2 border-b-2 font-semibold ${
                                  seasonIdx === idx
                                      ? "border-indigo-600 text-indigo-700"
                                      : "border-transparent text-gray-600 hover:text-indigo-600"
                              }`}
                              onClick={() => setSeasonIdx(idx)}
                          >
                            Mùa {s.seasonNumber}
                          </button>
                        </li>
                    ))}
                  </ul>
                </div>

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
                    </thead>
                    <tbody>
                    {movie.seasons[seasonIdx].episodes.map((ep: any, epIdx: number) => (
                        <tr className="border-b border-gray-400" key={ep.id}>
                          <td className="py-2 px-3">{epIdx + 1}</td>
                          <td className="py-2 px-3">{ep.name}</td>
                          <td className="py-2 px-3">{ep.url}</td>
                          <td className="py-2 px-3">{ep.duration}</td>
                          <td className="py-2 px-3 flex gap-2">
                            <button
                                className="bg-yellow-400 hover:bg-yellow-500 text-white rounded px-2 py-1 text-xs font-semibold"
                                onClick={() => onEditEpisode(movie.id, seasonIdx, epIdx)}
                            >
                              ✏ Edit
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1 text-xs font-semibold"
                                onClick={() => {
                                  setSelectedEpisodeToDelete(ep);
                                  setShowDeleteEpisodeModal(true);
                                }}
                            >
                              🗑 Xóa
                            </button>
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white rounded px-2 py-1 text-xs font-semibold"
                                onClick={() => setViewingComment({ seasonIdx, episodeIdx: epIdx })}
                            >
                              💬 Bình luận
                            </button>
                          </td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </>
          )}

          {/* Các modal */}
          {showAddSeason && (
              <AddSeasonModal
                  onClose={() => setShowAddSeason(false)}
                  onAdd={() => setShowAddSeason(false)}
              />
          )}
          {showAddEpisode && (
              <AddEpisodeModal
                  onClose={() => setShowAddEpisode(false)}
                  onAdd={() => setShowAddEpisode(false)}
              />
          )}
          {showDeleteMovieModal && (
              <ConfirmDeleteModal
                  title="Xóa phim"
                  message={`Bạn có chắc chắn muốn xóa phim "${movie.title}" không? Thao tác này không thể hoàn tác.`}
                  onClose={() => setShowDeleteMovieModal(false)}
                  onConfirm={() => {
                    setShowDeleteMovieModal(false);
                    onBack();
                  }}
              />
          )}
          {showDeleteEpisodeModal && selectedEpisodeToDelete && (
              <ConfirmDeleteModal
                  title="Xóa tập phim"
                  message={`Bạn có chắc chắn muốn xóa tập "${selectedEpisodeToDelete.name}" không?`}
                  onClose={() => {
                    setShowDeleteEpisodeModal(false);
                    setSelectedEpisodeToDelete(null);
                  }}
                  onConfirm={() => {
                    movie.seasons[seasonIdx].episodes = movie.seasons[seasonIdx].episodes.filter(
                        (ep: any) => ep.id !== selectedEpisodeToDelete.id
                    );
                    setShowDeleteEpisodeModal(false);
                    setSelectedEpisodeToDelete(null);
                  }}
              />
          )}
          {showEditMovieModal && (
              <EditMovieModal
                  movie={movie}
                  onClose={() => setShowEditMovieModal(false)}
                  onSave={(updatedMovie) => {
                    console.log("Phim đã cập nhật:", updatedMovie);
                    setShowEditMovieModal(false);
                  }}
              />
          )}
        </div>
      </div>
  );
};

export default MovieDetail;
