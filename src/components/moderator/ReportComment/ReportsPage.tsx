import React, { useState } from "react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const mockReports = [
    {
        id: 1,
        user: "baduser01",
        content: "Phim này dở ẹc, ai coi cũng ngu!",
        episode: "Breaking Bad - Mùa 1 - Tập 1 - Pilot",
        time: "2025-07-14 10:15",
        status: "Chờ xử lý",
    },
    {
        id: 2,
        user: "trollking",
        content: "Haha lũ loser xem phim này đi :))",
        episode: "Breaking Bad - Mùa 1 - Tập 2 - Cat's in the Bag...",
        time: "2025-07-13 18:47",
        status: "Đã xử lý",
    },
    {
        id: 3,
        user: "spammer999",
        content: "Xem phim tại phimfake.com nha!",
        episode: "The Witcher - Mùa 1 - Tập 3 - Betrayer Moon",
        time: "2025-07-13 09:22",
        status: "Chờ xử lý",
    },
    {
        id: 4,
        user: "toxico",
        content: "Đạo diễn này nên nghỉ làm phim đi!",
        episode: "The Witcher - Mùa 1 - Tập 1 - The End's Beginning",
        time: "2025-07-12 20:55",
        status: "Đã xử lý",
    },
    {
        id: 5,
        user: "hacker123",
        content: "<script>alert('Hacked!')</script>",
        episode: "Stranger Things - Mùa 2 - Tập 8 - The Mind Flayer",
        time: "2025-07-12 14:18",
        status: "Chờ xử lý",
    },
    {
        id: 6,
        user: "clickbaiter",
        content: "Click link này để nhận quà: fakegift.com",
        episode: "Stranger Things - Mùa 1 - Tập 1 - The Vanishing",
        time: "2025-07-11 19:07",
        status: "Chờ xử lý",
    },
    {
        id: 7,
        user: "angryfan",
        content: "Phim tệ đến mức muốn đập TV!",
        episode: "Loki - Mùa 1 - Tập 4 - The Nexus Event",
        time: "2025-07-11 11:30",
        status: "Đã xử lý",
    },
    {
        id: 8,
        user: "flamer",
        content: "Mấy đứa fan phim này toàn dở hơi!",
        episode: "Moon Knight - Mùa 1 - Tập 2 - Summon the Suit",
        time: "2025-07-10 22:10",
        status: "Chờ xử lý",
    },
    {
        id: 9,
        user: "vulgaruser",
        content: "Cái tập này như cái quần què!",
        episode: "Dark - Mùa 1 - Tập 1 - Secrets",
        time: "2025-07-10 16:42",
        status: "Chờ xử lý",
    },
    {
        id: 10,
        user: "insulter",
        content: "Ai xem phim này chắc IQ thấp!",
        episode: "Dark - Mùa 2 - Tập 3 - Ghosts",
        time: "2025-07-10 09:35",
        status: "Đã xử lý",
    },
];

const ReportPage: React.FC = () => {
    const [reports, setReports] = useState(mockReports);
    const [showModal, setShowModal] = useState(false);
    const [selectedReportId, setSelectedReportId] = useState<number | null>(null);

    const handleDeleteClick = (id: number) => {
        setSelectedReportId(id);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        setReports(prev => prev.filter(r => r.id !== selectedReportId));
        setShowModal(false);
        setSelectedReportId(null);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedReportId(null);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Tố cáo bình luận</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                    <thead>
                    <tr className="bg-gray-50">
                        <th className="py-2 px-3 font-bold">#</th>
                        <th className="py-2 px-3 font-bold">Tài khoản</th>
                        <th className="py-2 px-3 font-bold">Nội dung bình luận</th>
                        <th className="py-2 px-3 font-bold w-[180px]">Tập phim</th>
                        <th className="py-2 px-3 font-bold">Thời gian</th>
                        <th className="py-2 px-3 font-bold w-[140px]">Trạng thái</th>
                        <th className="py-2 px-3 font-bold w-[160px]">Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reports.map((comment, idx) => (
                        <tr key={comment.id} className="border-b border-gray-200">
                            <td className="py-2 px-3">{idx + 1}</td>
                            <td className="py-2 px-3">{comment.user}</td>
                            <td className="py-2 px-3">{comment.content}</td>
                            <td className="py-2 px-3 max-w-[220px] whitespace-normal break-words">
                                {comment.episode}
                            </td>
                            <td className="py-2 px-3">{comment.time}</td>
                            <td className="py-2 px-3">
                                <span
                                    className={`px-3 py-1 rounded text-sm font-semibold ${
                                        comment.status === "Đã xử lý"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-800"
                                    }`}
                                >
                                    {comment.status}
                                </span>
                            </td>
                            <td className="py-2 px-3 space-x-2">
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white rounded px-3 py-1 text-sm font-semibold"
                                >
                                    Duyệt
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(comment.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white rounded px-3 py-1 text-sm font-semibold"
                                >
                                    Xoá
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <ConfirmDeleteModal
                    title="Xoá báo cáo"
                    message="Bạn có chắc muốn xoá báo cáo này không? Thao tác này không thể hoàn tác."
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </div>
    );
};

export default ReportPage;
