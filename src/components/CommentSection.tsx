import { useState } from "react";
import { PiPaperPlaneRightFill } from "react-icons/pi";

const mockComments = [
  {
    id: 1,
    username: "Trang Le",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    time: "12 giờ trước",
    content: "Cảm cúm rồi 😷",
  },
  {
    id: 2,
    username: "NPT",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    time: "13 giờ trước",
    content: "Phim hay dã man luôn",
  },
  {
    id: 3,
    username: "Anh Thow",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    time: "14 giờ trước",
    content: "Tập này hay quá mọi người ơi",
  },
];

const CommentSection = () => {
  const [comment, setComment] = useState("");
  const [comments] = useState(mockComments);

  return (
    <div className="w-full bg-[#23263a] lg:w-2/3 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Bình luận</h2>
      <textarea
        className="w-full p-3 rounded bg-[#2f3147] text-white border-none focus:outline-none"
        placeholder="Viết bình luận..."
        rows={4}
        maxLength={1000}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="flex justify-between mt-2 items-center">
        <span className="text-gray-400 text-sm">{comment.length} / 1000</span>
        <div className="flex items-center gap-1 text-[#EAC76F] cursor-pointer hover:opacity-80">
          <span className="font-semibold">Gửi</span>
          <PiPaperPlaneRightFill className="text-[#EAC76F] size-6" />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {comments.map((c) => (
          <div key={c.id} className="flex items-start gap-3">
            <img
              src={c.avatar}
              alt={c.username}
              className="w-9 h-9 rounded-full mt-1"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">{c.username}</span>
                <span className="text-xs text-gray-400">{c.time}</span>
              </div>
              <div className="text-gray-200 text-sm mt-1">{c.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
