import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4">
            <div className="text-center max-w-2xl mx-auto">
                {/* 404 Animation */}
                <div className="relative mb-8">
                    <h1 className="text-[120px] md:text-[180px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 leading-none">
                        404
                    </h1>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-600 opacity-20 blur-3xl"></div>
                </div>

                {/* Error Message */}
                <div className="mb-8">
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                        Oops! Trang không tồn tại
                    </h2>
                    <p className="text-gray-300 text-lg mb-2">
                        Trang bạn đang tìm kiếm có thể đã bị di chuyển, xóa hoặc không bao giờ tồn tại.
                    </p>
                    <p className="text-gray-400">
                        Đừng lo lắng, hãy thử một trong những tùy chọn dưới đây:
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                    <Link
                        to="/home"
                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 min-w-[160px] justify-center"
                    >
                        <Home size={20} />
                        Về trang chủ
                    </Link>

                    <button
                        onClick={handleGoBack}
                        className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 min-w-[160px] justify-center"
                    >
                        <ArrowLeft size={20} />
                        Quay lại
                    </button>

                    <Link
                        to="/search"
                        className="flex items-center gap-2 border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 min-w-[160px] justify-center"
                    >
                        <Search size={20} />
                        Tìm kiếm
                    </Link>
                </div>

                {/* Popular Links */}
                <div className="text-center">
                    <p className="text-gray-400 mb-4">Hoặc thử những liên kết phổ biến:</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            to="/favorite"
                            className="text-purple-400 hover:text-purple-300 hover:underline transition-colors"
                        >
                            Phim yêu thích
                        </Link>
                        <Link
                            to="/continue"
                            className="text-purple-400 hover:text-purple-300 hover:underline transition-colors"
                        >
                            Tiếp tục xem
                        </Link>
                        <Link
                            to="/profile"
                            className="text-purple-400 hover:text-purple-300 hover:underline transition-colors"
                        >
                            Hồ sơ cá nhân
                        </Link>
                        <Link
                            to="/subscription"
                            className="text-purple-400 hover:text-purple-300 hover:underline transition-colors"
                        >
                            Gói đăng ký
                        </Link>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-1/4 left-10 w-20 h-20 bg-purple-500 rounded-full opacity-10 blur-xl"></div>
                <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-pink-500 rounded-full opacity-10 blur-xl"></div>
            </div>
        </div>
    );
};

export default NotFound;
