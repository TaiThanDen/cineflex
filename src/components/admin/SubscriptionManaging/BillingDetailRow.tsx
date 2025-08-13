import type { BillingDetail } from "@/lib/types/BillingDetail"
import { TableRow, TableCell } from "@mui/material"

interface Props {
    billingDetail: BillingDetail,
    index: number
}

const BillingDetailRow = ({ billingDetail, index } : Props) => {
                                //     <TableCell align="left">#</TableCell>
                                // <TableCell align="left">Số tiền đã thanh toán</TableCell>
                                // <TableCell align="left">Thời gian khởi tạo</TableCell>
                                // <TableCell align="left">Thời gian trả</TableCell>
                                // <TableCell align="left">Mã giao dịch</TableCell>
    return <>
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell align="left">{index}</TableCell>
            <TableCell align="left">{billingDetail.amount}</TableCell>
            <TableCell align="left">{billingDetail.createdTime}</TableCell>
            <TableCell align="left">{billingDetail.paidTime}</TableCell>
            <TableCell align="left">{billingDetail.transactionCode}</TableCell>
        </TableRow>
    </>
}

export default BillingDetailRow