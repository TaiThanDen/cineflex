import { approveReport, declineReport, getCommentById, getUserById } from "@/lib/api"
import type { ReportComment } from "@/lib/types/ReportComment"
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, TableCell, TableRow } from "@mui/material"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

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

    if (accountResult.isLoading) return <>Loading...</>;
    if (accountResult.isError) return <>Error loading account</>;

    return (
        <div className="flex justify-start items-center gap-3">
            <img
                src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${accountResult.data!.id}`}
                alt={accountResult.data!.username}
                className="w-9 h-9 rounded-full mt-1"
            />
            <span>{accountResult.data?.username}</span>
        </div>
    )
}

const ReportRow = ({ report, index }: Props) => {
    const [showModal, setShowModal] = useState(false)
    const queryClient = useQueryClient()

    const commentResult = useQuery({
        queryKey: ["comment", report.comment],
        queryFn: () => getCommentById(report.comment)
    });

    const deleteCommentMutation = useMutation({
        mutationFn: () => approveReport(report.id),
        onSuccess: () => {
            toast("Đã xử lý");
            setShowModal(false);
            queryClient.invalidateQueries({
                queryKey: ["report-comments"]
            })
        }
    })

    const declineReportMutation = useMutation({
        mutationFn: () => declineReport(report.id),
        onSuccess: () => {
            toast("Đã xử lý");
            setShowModal(false);
            queryClient.invalidateQueries({
                queryKey: ["report-comments"]
            })
        }
    })

    useEffect(() => {
        console.log("Comment: ", commentResult.data, commentResult.data?.account)
    }, [commentResult])

    if (commentResult.isLoading) return <TableRow><TableCell colSpan={5}>Loading...</TableCell></TableRow>
    if (commentResult.isError) return <TableRow><TableCell colSpan={5}>Error loading comment</TableCell></TableRow>



    return (
        <>
            <TableRow key={report.id} className="border-b border-gray-200">
                <TableCell className="py-2 px-3">{index + 1}</TableCell>
                <TableCell className="py-2 px-3">
                    <AccountCell id={commentResult.data!.account} />
                </TableCell>
                <TableCell className="py-2 px-3">{commentResult.data?.content}</TableCell>
                <TableCell className="py-2 px-3">{report.createdTime}</TableCell>
                <TableCell className="py-2 px-3">
                    {commentResult.data!.isDeleted &&
                        <Chip label="Đã xóa comment" color="error"></Chip>
                    }
                    {!commentResult.data!.isDeleted && report.status != 0 &&
                        <Chip label="Đã bỏ qua"></Chip>
                    }
                    {report.status == 0 && !commentResult.data!.isDeleted &&
                        <Chip label="Chưa xử lý"></Chip>
                    }
                </TableCell>
                <TableCell className="py-2 px-3 space-x-2">
                    <Button
                        onClick={() => {
                            setShowModal(true)
                        }}
                        variant="text"
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
                <DialogTitle>
                    Comment
                </DialogTitle>
                <DialogContent>



                <div className="grid grid-cols-2 grid-rows-2 gap-4">
                    <div><div className="font-bold">Nội dung comment: </div> {commentResult.data!.content} </div>
                    <div><div className="font-bold">Nội dung: </div> {report.content} </div>
                    <div className="row-start-2"><div className="font-bold">Người comment: </div><AccountCell id={commentResult.data!.account} /></div>
                    <div className="row-start-2"><div className="font-bold">Người report: </div><AccountCell id={report.account} /></div>
                    <div className="row-start-3"><div className="font-bold">Ngày khởi tạo: </div> {report.createdTime}</div>
                    <div className="row-start-3"><div className="font-bold">Trạng thái: </div>
                    {commentResult.data!.isDeleted &&
                        <Chip label="Đã xóa comment" color="error"></Chip>
                    }
                    {!commentResult.data!.isDeleted && report.status != 0 &&
                        <Chip label="Đã bỏ qua"></Chip>
                    }
                    {report.status == 0 && !commentResult.data!.isDeleted &&
                        <Chip label="Chưa xử lý"></Chip>
                    }
                    </div>
                </div>
    
    

                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setShowModal(false)
                        }}
                    >
                        Đóng
                    </Button>
                        {commentResult.data!.isDeleted &&
                            <Button
                            disabled
                            color="error"
                            variant="contained">
                                Đã xóa
                            </Button>
                        }
                        {!commentResult.data!.isDeleted && report.status != 0 &&
                            <>
                            <Button
                            disabled
                            color="error"
                            variant="contained">
                                Đã bỏ qua
                            </Button>
                            </>
                        }
                        {report.status == 0 && !commentResult.data!.isDeleted &&
                            <>
                                <Button
                                color="info"
                                onClick={async () => {
                                    await declineReportMutation.mutateAsync()
                                }}
                                variant="contained">
                                    Bỏ qua
                                </Button>
                                <Button
                                color="error"
                                onClick={async () => {
                                    await deleteCommentMutation.mutateAsync()
                                }}
                                variant="contained">
                                    Xóa
                                </Button>
                            </>
                        }

                </DialogActions>
            </Dialog>
        </>
    )
}

export default ReportRow