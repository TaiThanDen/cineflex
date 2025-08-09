import SectionRow from "@/components/moderator/CommentsBySections/SectionRow";
import { getCommentSections } from "@/lib/api";
import { TableContainer, TableHead, TableRow, TableCell, TableBody, Table, Pagination, Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function CommentModeratorPage() {
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const commentSectionsResult = useQuery({
        queryKey: ["premium-account", page],
        queryFn: () => getCommentSections(page - 1, 6)
    })

    useEffect(() => {
        setTotalPage((commentSectionsResult.data?.totalPage ?? 0))
    }, [commentSectionsResult])

    if (commentSectionsResult.isLoading) {
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
    if (commentSectionsResult.isError) {
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
        <>
            <h1 className="text-2xl font-semibold mb-6">Tố cáo bình luận</h1>
            <div className="overflow-x-auto">
                <TableContainer>
                    <Table className="min-w-full text-left text-sm">
                        <TableHead>
                            <TableRow className="bg-gray-50">
                                <TableCell className="py-2 px-3 font-bold">#</TableCell>
                                <TableCell className="py-2 px-3 font-bold">Id</TableCell>
                                <TableCell className="py-2 px-3 font-bold">Tên gợi nhớ</TableCell>
                                <TableCell className="py-2 px-3 font-bold"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {commentSectionsResult.data!.data.map((section, idx) => (
                                <SectionRow section={section} index={idx + 1 + (page - 1) * 6} key={idx}></SectionRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>


            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination count={totalPage + 1} page={page} onChange={(_, page) => {
                    setPage(page)
                }} />
            </Box>
        </>
    );
}
