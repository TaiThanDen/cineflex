import { type ReactNode } from "react";
import { Navigate } from "react-router";
import ApiException from "../exceptions/ApiException";
import { useAuthAndRole } from "../hooks/use-auth";

interface props {
    children: ReactNode,
    allowed: (0 | 1 | 2)[],
    fallBack?: ReactNode
}

const AdminGuard = ({ children, allowed, fallBack = <Navigate to="/login" /> }: props) => {
    const { isLoggedIn, role, isLoadingRole, isErrorRole, roleError } = useAuthAndRole();

    // Kiểm tra đăng nhập trước - nếu chưa đăng nhập thì chuyển ngay về login
    if (!isLoggedIn) {
        return fallBack;
    }

    if (isLoadingRole) return (
        <div className="min-h-screen bg-[#23263a] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
    )

    if (isErrorRole) {
        if (roleError instanceof ApiException && roleError.status === 401) {
            // Token hết hạn hoặc không hợp lệ -> chuyển về login
            return fallBack
        }
        // Lỗi khác -> về trang chủ
        return <Navigate to="/home" />
    }

    // Kiểm tra quyền truy cập
    if (role !== undefined && allowed.includes(role as 0 | 1 | 2)) {
        return children
    }

    // Người dùng đã đăng nhập nhưng không đủ quyền -> trang unauthorized
    return <Navigate to="/unauthorized" />
}

export default AdminGuard