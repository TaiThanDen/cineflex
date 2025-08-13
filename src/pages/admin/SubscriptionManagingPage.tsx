import SubscriptionRow from "@/components/admin/SubscriptionManaging/SubscriptionRow";
import { getAccountsPremium } from "@/lib/api";
import { Pagination } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";


const SubscriptionManagingPage = () => {
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const accountsPremiumResult = useQuery({
        queryKey: ["premium-account", page],
        queryFn: () => getAccountsPremium(page - 1, 6)
    })

    useEffect(() => {
        setTotalPage((accountsPremiumResult.data?.totalPage ?? 0))
    }, [accountsPremiumResult])

    if (accountsPremiumResult.isLoading) {
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

    return (
        <div className="w-full h-full p-8">
            <div className="text-2xl">
                Danh sách người dùng vip
            </div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">#</TableCell>
                            <TableCell align="left">Người dùng</TableCell>
                            <TableCell align="left">Ngày bắt đầu</TableCell>
                            <TableCell align="left">Ngày kết thúc</TableCell>
                            <TableCell align="left">Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accountsPremiumResult.data!.data.map((a, index) => {
                            return <>
                                <SubscriptionRow account={a} index={index} />
                            </>
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

export default SubscriptionManagingPage;