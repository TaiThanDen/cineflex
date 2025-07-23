import { useState } from 'react'
import AdsModal from "@/components/admin/Advertisement/AdsModal.tsx";
import { Button, Box } from '@mui/material'
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"


const AdsListManaging = () => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
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
                            <TableCell align="left">Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="left">0</TableCell>
                            <TableCell align="left">1</TableCell>
                            <TableCell align="left">2</TableCell>
                            <TableCell align="left">3</TableCell>
                            <TableCell align="left">4</TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="left">0</TableCell>
                            <TableCell align="left">1</TableCell>
                            <TableCell align="left">2</TableCell>
                            <TableCell align="left">3</TableCell>
                            <TableCell align="left">4</TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="left">0</TableCell>
                            <TableCell align="left">1</TableCell>
                            <TableCell align="left">2</TableCell>
                            <TableCell align="left">3</TableCell>
                            <TableCell align="left">4</TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="left">0</TableCell>
                            <TableCell align="left">1</TableCell>
                            <TableCell align="left">2</TableCell>
                            <TableCell align="left">3</TableCell>
                            <TableCell align="left">4</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default AdsListManaging