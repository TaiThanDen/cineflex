import { FaHome, FaHeart, FaUser, FaPlay } from "react-icons/fa";

const MobileBottomSidebar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1c1c1e] z-50 px-4 py-2 flex justify-between items-center shadow-t rounded-t-3xl sm:hidden">
      <button className="flex flex-col items-center text-red-400">
        <FaHome className="text-lg mb-1" />
        <span className="text-xs">Home</span>
      </button>
      <button className="flex flex-col items-center text-white">
        <FaPlay className="text-lg mb-1" />
        <span className="text-xs">Play</span>
      </button>
      <button className="flex flex-col items-center text-white">
        <FaHeart className="text-lg mb-1" />
        <span className="text-xs">Like</span>
      </button>
      <button className="flex flex-col items-center text-white">
        <FaUser className="text-lg mb-1" />
        <span className="text-xs">User</span>
      </button>
    </div>
  );
};

export default MobileBottomSidebar;
