import React from "react";
import { Link } from "react-router-dom";
import { Shield, ArrowLeft, Home, User } from "lucide-react";

const UnauthorizedAccess: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4">
            <div className="text-center max-w-2xl mx-auto">
                {/* Shield Icon */}
                <div className="relative mb-8">
                    <div className="inline-flex items-center justify-center w-32 h-32 bg-red-500/20 rounded-full mb-4">
                        <Shield size={64} className="text-red-400" />
                    </div>
                    <div className="absolute inset-0 bg-red-500 opacity-20 blur-3xl"></div>
                </div>

                {/* Error Message */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Truy cập bị từ chối
                    </h1>
                    <p className="text-gray-300 text-lg mb-2">
                        Bạn không có quyền truy cập vào khu vực này.
                    </p>
                    <p className="text-gray-400">
                        Vui lòng đăng nhập với tài khoản có quyền hạn phù hợp hoặc liên hệ quản trị viên.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                    <Link
                        to="/login"
                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 min-w-[160px] justify-center"
                    >
                        <User size={20} />
                        Đăng nhập
                    </Link>

                    <Link
                        to="/home"
                        className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 min-w-[160px] justify-center"
                    >
                        <Home size={20} />
                        Về trang chủ
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 min-w-[160px] justify-center"
                    >
                        <ArrowLeft size={20} />
                        Quay lại
                    </button>
                </div>

                {/* Additional Info */}
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 max-w-md mx-auto">
                    <h3 className="text-red-400 font-semibold mb-2">Lưu ý:</h3>
                    <ul className="text-gray-300 text-sm space-y-1 text-left">
                        <li>• Khu vực Admin chỉ dành cho quản trị viên</li>
                        <li>• Khu vực Moderator chỉ dành cho kiểm duyệt viên</li>
                        <li>• Vui lòng đăng nhập với tài khoản phù hợp</li>
                    </ul>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-1/4 left-10 w-20 h-20 bg-red-500 rounded-full opacity-10 blur-xl"></div>
                <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-red-500 rounded-full opacity-10 blur-xl"></div>
            </div>
        </div>
    );
};

export default UnauthorizedAccess;
