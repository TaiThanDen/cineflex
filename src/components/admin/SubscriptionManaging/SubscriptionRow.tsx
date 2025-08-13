import { getSubscriptionOfAccount } from "@/lib/api"
import type { Account } from "@/lib/types/Account"
import { Button, Dialog, TableCell, TableRow } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import SubscriptionDialog from "./SubscriptionDialog"

interface Props {
    account: Account,
    index: number
}

const SubscriptionRow = ({ account, index }: Props) => {
    const [showModal, setShowModal] = useState(false);
    const subscriptionResult = useQuery({
        queryKey: ['subscription', account.id],
        queryFn: () => getSubscriptionOfAccount(account.id)
    })

    if (subscriptionResult.isLoading) {
        return <>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left">Loading...</TableCell>
                <TableCell align="left">Loading...</TableCell>
                <TableCell align="left">Loading...</TableCell>
                <TableCell align="left">Loading...</TableCell>
                <TableCell align="left">Loading...</TableCell>
            </TableRow>
        </>
    }

    if (subscriptionResult.isError) {
        return
    }

    return <>
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell align="left">{index}</TableCell>
            <TableCell align="left">{account.username}</TableCell>
            <TableCell align="left">{subscriptionResult.data!.startTime}</TableCell>
            <TableCell align="left">{subscriptionResult.data!.endTime}</TableCell>
            <TableCell align="left">
                <Button
                    onClick={() => {
                        setShowModal(true)
                    }}
                >
                    Chi tiết
                </Button>
            </TableCell>
        </TableRow>

        <Dialog
            maxWidth="md"
            fullWidth
            open={showModal}
            onClose={() => {
                setShowModal(false)
            }}
        >
            <SubscriptionDialog account={account} subscription={subscriptionResult.data!}></SubscriptionDialog>
        </Dialog>
    </>
}

export default SubscriptionRow