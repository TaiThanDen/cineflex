import type { Hirer } from "@/lib/types/Hirer"
import Button from "@mui/material/Button"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"

interface Props {
    hirer: Hirer,
    index: number
}


const HirerRow = ({ hirer, index } : Props) => {
    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell align="left">{index}</TableCell>
            <TableCell align="left">{hirer.alias}</TableCell>
            <TableCell align="left">{hirer.phone}</TableCell>
            <TableCell align="left">{hirer.email}</TableCell>
            <TableCell align="left"><Button>Chi tiết</Button></TableCell>
        </TableRow>
    )
} 

export default HirerRow