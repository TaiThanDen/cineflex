import React, { useEffect, useState } from "react";
import { Box, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getPaginatedReportComments } from "@/lib/api";
import ReportRow from "./ReportRow";

const ReportPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);

    const reportCommentResult = useQuery({
        queryKey: ["report-comments", page],
        queryFn: () => getPaginatedReportComments(page - 1, 5)
    })

    useEffect(() => {
        setCount(reportCommentResult.data?.totalPage ?? 0)
        console.log(reportCommentResult.data?.data)
    }, [reportCommentResult])

    if (reportCommentResult.isLoading) {
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
    if (reportCommentResult.isError) {
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
            <h1 className="text-2xl font-semibold mb-6">Tố cáo bình luận</h1>
            <div className="overflow-x-auto">
                <TableContainer>
                    <Table className="min-w-full text-left text-sm">
                        <TableHead>
                        <TableRow className="bg-gray-50">
                            <TableCell className="py-2 px-3 font-bold">#</TableCell>
                            <TableCell className="py-2 px-3 font-bold">Tài khoản bình luận</TableCell>
                            <TableCell className="py-2 px-3 font-bold">Nội dung bình luận</TableCell>
                            <TableCell className="py-2 px-3 font-bold">Thời gian</TableCell>
                            <TableCell className="py-2 px-3 font-bold w-[140px]">Trạng thái</TableCell>
                            <TableCell className="py-2 px-3 font-bold w-[160px]"></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {reportCommentResult.data!.data.map((report, idx) => (
                            <ReportRow index={idx} report={report} key={report.id} />
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination count={count + 1} page={page} onChange={(_, page) => {
                    setPage(page)
                }} />
            </Box>

        </div>
    );
};

export default ReportPage;
