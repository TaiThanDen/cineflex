import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSeasonsByShowId, getEpisodesBySeasonId } from "@/lib/api";
import { useEpisodeMutations } from "@/lib/hooks/useEpisodeMutations";
import AddEpisodeModal from "@/components/admin/MovieManagerComponent/AddEpisodeModal";

// Component ví dụ về cách sử dụng AddEpisodeModal với API
const EpisodeManagementExample: React.FC<{ showId: string }> = ({ showId }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSeasonId, setSelectedSeasonId] = useState<string>("");

  // Lấy danh sách seasons của show
  const { data: seasons = [], isLoading: seasonsLoading } = useQuery({
    queryKey: ["seasons", showId],
    queryFn: () => getSeasonsByShowId(showId),
  });

  // Lấy danh sách episodes của season được chọn
  const { data: episodes = [], isLoading: episodesLoading } = useQuery({
    queryKey: ["episodes", selectedSeasonId],
    queryFn: () => getEpisodesBySeasonId(selectedSeasonId),
    enabled: !!selectedSeasonId,
  });

  const { deleteEpisode, isDeletingEpisode } = useEpisodeMutations();

  const handleDeleteEpisode = async (episodeId: string) => {
    if (window.confirm("Bạn có chắc muốn xóa tập phim này?")) {
      try {
        await deleteEpisode({ episodeId, seasonId: selectedSeasonId });
        alert("Xóa tập phim thành công!");
      } catch (error) {
        alert("Có lỗi xảy ra khi xóa tập phim!");
      }
    }
  };

  if (seasonsLoading) {
    return <div className="p-4">Đang tải seasons...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quản lý Episodes</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          disabled={seasons.length === 0}
        >
          Thêm Episode
        </button>
      </div>

      {/* Season Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Chọn Season:</label>
        <select
          value={selectedSeasonId}
          onChange={(e) => setSelectedSeasonId(e.target.value)}
          className="border rounded-lg px-3 py-2 w-64"
        >
          <option value="">-- Chọn Season --</option>
          {seasons.map((season) => (
            <option key={season.id} value={season.id}>
              {season.title}
            </option>
          ))}
        </select>
      </div>

      {/* Episodes List */}
      {selectedSeasonId && (
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Danh sách Episodes
            {episodesLoading && " (Đang tải...)"}
          </h3>

          {episodes.length === 0 ? (
            <p className="text-gray-500">
              Chưa có episode nào trong season này.
            </p>
          ) : (
            <div className="grid gap-4">
              {episodes.map((episode) => (
                <div
                  key={episode.id}
                  className="border rounded-lg p-4 flex justify-between items-start"
                >
                  <div className="flex-1">
                    <h4 className="font-medium">
                      Tập {episode.number}: {episode.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {episode.description}
                    </p>
                    <div className="text-xs text-gray-500 mt-2">
                      <span>Thời lượng: {episode.duration}s</span>
                      <span className="ml-4">ID: {episode.url}</span>
                      <span className="ml-4">
                        Phát hành:{" "}
                        {new Date(episode.releaseDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleDeleteEpisode(episode.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                      disabled={isDeletingEpisode}
                    >
                      {isDeletingEpisode ? "Đang xóa..." : "Xóa"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Episode Modal */}
      {showAddModal && (
        <AddEpisodeModal
          seasons={seasons}
          onClose={() => setShowAddModal(false)}
          onAdd={(episodeData) => {
            console.log("Episode added:", episodeData);
            // Modal sẽ tự động cập nhật cache và đóng
          }}
        />
      )}
    </div>
  );
};

export default EpisodeManagementExample;
