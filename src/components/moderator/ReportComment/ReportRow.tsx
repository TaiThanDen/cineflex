import { getCommentById, getUserById } from "@/lib/api"
import type { ReportComment } from "@/lib/types/ReportComment"
import { Button, TableCell, TableRow } from "@mui/material"
import { useQuery } from "@tanstack/react-query"

interface Props {
    report: ReportComment,
    index: number
}

interface AccountProps {
    id: string
}

const AccountCell = ({ id }: AccountProps) => {
    const accountResult = useQuery({
        queryKey: ["users", id],
        queryFn: () => getUserById(id)
    })

    return (
        <TableCell className="py-2 px-3">
            <div className="flex justify-start items-center gap-3">
                <img
                    src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${accountResult.data!.id}`}
                    alt={accountResult.data!.username}
                    className="w-9 h-9 rounded-full mt-1"
                />
                <span>{accountResult.data?.username}</span>
            </div>
        </TableCell>
    )
}

const ReportRow = ({ report, index } : Props) => {
    const commentResult = useQuery({
        queryKey: ["comment", report.comment],
        queryFn: () => getCommentById(report.comment)
    });

    return (
        <>
            <TableRow key={report.id} className="border-b border-gray-200">
                <TableCell className="py-2 px-3">{index + 1}</TableCell>
                <AccountCell id={commentResult.data!.account} />
                <TableCell className="py-2 px-3">{commentResult.data?.content}</TableCell>
                <TableCell className="py-2 px-3">{report.createdTime}</TableCell>
                <TableCell className="py-2 px-3">
                    <span
                        className={`px-3 py-1 rounded text-sm font-semibold ${
                            report.status !== 0
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                        {(report.status !== 0)?"Đã xử lý":"Chưa xử lý"}
                    </span>
                </TableCell>
                <TableCell className="py-2 px-3 space-x-2">
                    <Button variant="text">Chi tiết</Button>
                </TableCell>
            </TableRow>
        </>
    )
}

export default ReportRow