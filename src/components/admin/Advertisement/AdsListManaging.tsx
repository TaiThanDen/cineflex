import { useEffect, useState } from 'react'
import AdsModal from "@/components/admin/Advertisement/AdsModal.tsx";
import { Button, Box, Pagination } from '@mui/material'
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { useQuery } from '@tanstack/react-query';
import { getAllAds } from '@/lib/api';
import AdsRow from './AdsRow';

const AdsListManaging = () => {
    const [openModal, setOpenModal] = useState(false);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const advertisementResult = useQuery({
        queryKey: ["advertisements", page],
        queryFn: () => getAllAds(page - 1, 5)
    });

    useEffect(() => {
        setCount(advertisementResult.data?.totalPage ?? 0)
    }, [advertisementResult])


    if (advertisementResult.isLoading) {
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
    if (advertisementResult.isError) {
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
            <Box sx={{ display: 'flex', justifyContent: 'flex-begin', mb: 2 }}>
                <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
                    Thêm quảng cáo
                </Button>
            </Box>

            <AdsModal open={openModal} onClose={() => setOpenModal(false)} />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">#</TableCell>
                            <TableCell align="left">Link</TableCell>
                            <TableCell align="left">Đơn vị thuê</TableCell>
                            <TableCell align="left">Trạng thái</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {advertisementResult.data!.data.map((ad, index) => {
                            return (
                                <AdsRow advertisement={ad} index={index} key={ad.id} />
                            )
                        })}

                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination count={count} page={page} onChange={(_, page) => {
                    setPage(page)
                }} />
            </Box>
        </>
    )
}

export default AdsListManaging