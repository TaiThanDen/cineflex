import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";


const SubscriptionManagingPage = () => {
    return (
        <div className="w-full h-full p-8">
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
        </div>
    )
}

export default SubscriptionManagingPage;