import { getBillingDetailsOfAccount } from "@/lib/api"
import type { Account } from "@/lib/types/Account"
import type { Subscription } from "@/lib/types/Subscription"
import { DialogContent, DialogTitle, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import BillingDetailRow from "./BillingDetailRow"

interface Props {
    account: Account,
    subscription: Subscription
}

const SubscriptionDialog = ({ account, subscription }: Props) => {
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const accountsBillingResult = useQuery({
        queryKey: ["account-billings", page, account.id],
        queryFn: () => getBillingDetailsOfAccount(account.id, page - 1, 6)
    })

    useEffect(() => {
        setTotalPage((accountsBillingResult.data?.totalPage ?? 0))
    }, [accountsBillingResult])
    return (
        <>
            <DialogTitle>
                Người dùng: {account.username}
            </DialogTitle>
            <DialogContent>
                <div className="grid grid-cols-2 grid-rows-2 gap-4">
                    <div className="col-start-2 row-start-1">
                        Tên người dùng: {account.username}
                    </div>
                    <div className="col-start-1 row-start-1">
                        Email: {account.email}
                    </div>
                    <div className="row-start-2">
                        Ngày bắt đầu: {subscription.startTime}
                    </div>
                    <div className="row-start-2">
                        Ngày kết thúc: {subscription.endTime}
                    </div>
                </div>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">#</TableCell>
                                <TableCell align="left">Số tiền đã thanh toán</TableCell>
                                <TableCell align="left">Thời gian khởi tạo</TableCell>
                                <TableCell align="left">Thời gian thanh toán</TableCell>
                                <TableCell align="left">Mã giao dịch</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {accountsBillingResult.data ? 
                                accountsBillingResult.data.data.map((b, i) => 
                                    <> 
                                        <BillingDetailRow billingDetail={b} index={i} />
                                    </>
                                )
                            
                            : 
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="left">Loading...</TableCell>
                                    <TableCell align="left">Loading...</TableCell>
                                    <TableCell align="left">Loading...</TableCell>
                                    <TableCell align="left">Loading...</TableCell>
                                    <TableCell align="left">Loading...</TableCell>
                                </TableRow>
                            }
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
            </DialogContent>
        </>
    )
}

export default SubscriptionDialog