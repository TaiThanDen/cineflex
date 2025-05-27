import { FaHome, FaHeart, FaUser, FaPlay, FaRedo } from "react-icons/fa";
import { Link } from "react-router-dom";

const MobileBottomSidebar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#2f3147] z-50 px-4 py-2 flex justify-between items-center shadow-t rounded-t-3xl sm:hidden">
      <button className="flex flex-col items-center text-[#7f22fe]">
        <FaHome className="text-lg mb-1" />
        <span className="text-xs">Home</span>
      </button>
      <button className="flex flex-col items-center text-white">
        <FaPlay className="text-lg mb-1" />
        <span className="text-xs">Play</span>
      </button>
      <Link to="/continue" className="flex flex-col items-center text-white">
        <FaRedo className="text-lg mb-1" />
        <span className="text-xs">Continue</span>
      </Link>
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
