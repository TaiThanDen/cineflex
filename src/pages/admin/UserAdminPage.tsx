import { useQuery } from "@tanstack/react-query";
import UserGrid from "../../components/admin/UserManagermentComponent/UserGrid";
import { getAccountPaginated } from "@/lib/api";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";


// const initialUserData: Account[] = [
//     {
//         id: "u1",
//         username: "Hà Huỳnh Huy Tuấn",
//         role: 0,
//         email: "tuanhhhts00576@fpt.edu.vn",
//         verify: true,
//         createdAt: '',
//         activate: true
//     }
// ];


export default function UserAdminPage() {
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const usersResult = useQuery({
        queryKey: ["users", page],
        queryFn: () => getAccountPaginated(page - 1, 8)
    })

    useEffect(() => {
        setTotalPage((usersResult.data?.totalPage ?? 0))
    }, [usersResult])

    if (usersResult.isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-lg text-gray-600">
                        Đang tải
                    </p>
                </div>
            </div>
        )
    }

    // Xử lý trạng thái lỗi
    if (usersResult.isError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-red-600 mb-2">
                        Lỗi tải dữ liệu
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Không thể tải dữ liệu phim. Vui lòng thử lại.
                    </p>
                    <button
                        onClick={() => {
                        }}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <UserGrid
                users={usersResult.data!.data}
            />
            <Pagination 
                className="flex items-center justify-center" 
                count={totalPage}
                page={page}
                onChange={(_, p) => {
                    setPage(p);
                }}
            />
        </div>
    );
}
