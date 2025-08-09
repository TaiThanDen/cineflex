import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCommentBySection } from "@/lib/api";
import CommentRow from "@/components/moderator/AllCommentManagement/CommentRow";
import { useParams } from "react-router";


const SingleCommentSection = () => {
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const { id } = useParams()

    const commentsResult = useQuery({
        queryKey: ["comments", page],
        queryFn: () => getCommentBySection(id!, page - 1, 5, true),
        enabled: !!id
    })

    useEffect(() => {
        setTotalPage(commentsResult.data?.totalPage ?? 0)
    }, [commentsResult])

    if (commentsResult.isLoading) {
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
    if (commentsResult.isError) {
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
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Tất cả bình luận</h1>
            <TableContainer className="overflow-x-auto">
                <Table className="w-max">
                    <TableHead>
                        <TableRow className="bg-gray-50">
                            <TableCell>#</TableCell>
                            <TableCell>Tài khoản</TableCell>
                            <TableCell>Nội dung bình luận</TableCell>
                            <TableCell>Mục comment</TableCell>
                            <TableCell>Thời gian</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="w-max">
                        {commentsResult.data!.data.map((comment, index) => {
                            return <CommentRow key={comment.id} comment={comment} index={index}></CommentRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Pagination 
                className="flex items-center justify-center" 
                count={totalPage + 1}
                page={page}
                onChange={(_, p) => {
                    setPage(p);
                }}
            />
        </div>
    )
}

export default SingleCommentSection