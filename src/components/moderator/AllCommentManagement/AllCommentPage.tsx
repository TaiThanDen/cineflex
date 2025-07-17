import React, { useState } from "react";
import ConfirmDeleteModal from "./ConfirmDeleteModal"; // Đảm bảo đúng path

const mockComments = [
    {
        id: 1,
        user: "nguyenvana",
        content: "Phim rất hay, mong có phần 2!",
        episode: "Breaking Bad - Mùa 1 - Tập 1 - Pilot",
        time: "2025-07-14 10:15",
        status: "Hiển thị",
    },
    {
        id: 2,
        user: "tranthib",
        content: "Cảnh hành động hơi gượng.",
        episode: "Breaking Bad - Mùa 1 - Tập 2 - Cat's in the Bag",
        time: "2025-07-13 18:47",
        status: "Ẩn",
    },
    {
        id: 3,
        user: "lehoang",
        content: "Lồng tiếng chưa khớp lắm.",
        episode: "The Witcher - Mùa 1 - Tập 3 - Betrayer Moon",
        time: "2025-07-13 09:22",
        status: "Hiển thị",
    },
    {
        id: 4,
        user: "maianh",
        content: "Nam chính đỉnh thực sự!",
        episode: "The Witcher - Mùa 1 - Tập 1 - The End's Beginning",
        time: "2025-07-12 20:55",
        status: "Hiển thị",
    },
    {
        id: 5,
        user: "phamtuan",
        content: "Không hiểu đoạn cuối lắm.",
        episode: "Stranger Things - Mùa 2 - Tập 8 - The Mind Flayer",
        time: "2025-07-12 14:18",
        status: "Ẩn",
    },
    {
        id: 6,
        user: "ngocthao",
        content: "Kỹ xảo đẹp mắt!",
        episode: "Stranger Things - Mùa 1 - Tập 1 - The Vanishing of Will Byers",
        time: "2025-07-11 19:07",
        status: "Hiển thị",
    },
    {
        id: 7,
        user: "huynhphuc",
        content: "Cốt truyện hấp dẫn, giữ được nhịp phim.",
        episode: "Loki - Mùa 1 - Tập 4 - The Nexus Event",
        time: "2025-07-11 11:30",
        status: "Hiển thị",
    },
    {
        id: 8,
        user: "ngochuong",
        content: "Phim dễ đoán, không hấp dẫn như kỳ vọng.",
        episode: "Moon Knight - Mùa 1 - Tập 2 - Summon the Suit",
        time: "2025-07-10 22:10",
        status: "Ẩn",
    },
    {
        id: 9,
        user: "dangtrung",
        content: "Nhạc nền quá tuyệt vời.",
        episode: "Dark - Mùa 1 - Tập 1 - Secrets",
        time: "2025-07-10 16:42",
        status: "Hiển thị",
    },
    {
        id: 10,
        user: "tramy",
        content: "Quá rối, cần xem lại lần 2.",
        episode: "Dark - Mùa 2 - Tập 3 - Ghosts",
        time: "2025-07-10 09:35",
        status: "Hiển thị",
    },
];

const AllCommentsPage: React.FC = () => {
    const [comments, setComments] = useState(mockComments);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);

    const handleHideToggle = (id: number) => {
        setComments(prev =>
            prev.map(cmt =>
                cmt.id === id
                    ? {
                        ...cmt,
                        status: cmt.status === "Hiển thị" ? "Ẩn" : "Hiển thị",
                    }
                    : cmt
            )
        );
    };

    const handleDeleteClick = (id: number) => {
        setSelectedCommentId(id);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        setComments(prev => prev.filter(c => c.id !== selectedCommentId));
        setShowDeleteModal(false);
        setSelectedCommentId(null);
    };

    const handleCloseModal = () => {
        setShowDeleteModal(false);
        setSelectedCommentId(null);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Tất cả bình luận</h1>
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
                    {comments.map((comment, idx) => (
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
            comment.status === "Hiển thị"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
        }`}
    >
        {comment.status}
    </span>
                            </td>
                            <td className="py-2 px-3 space-x-2">
                                <button
                                    className={`${
                                        comment.status === "Hiển thị"
                                            ? "bg-blue-500 hover:bg-blue-600"
                                            : "bg-green-500 hover:bg-green-600"
                                    } text-white rounded px-3 py-1 text-sm font-semibold`}
                                    onClick={() => handleHideToggle(comment.id)}
                                >
                                    {comment.status === "Hiển thị" ? "Ẩn" : "Hiện"}
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white rounded px-3 py-1 text-sm font-semibold"
                                    onClick={() => handleDeleteClick(comment.id)}
                                >
                                    Xoá
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {showDeleteModal && (
                <ConfirmDeleteModal
                    title="Xoá bình luận"
                    message="Bạn có chắc muốn xoá bình luận này không? Thao tác này không thể hoàn tác."
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </div>
    );
};

export default AllCommentsPage;
