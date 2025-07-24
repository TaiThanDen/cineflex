import { deleteComment, getUserById, reportComment } from "@/lib/api";
import ApiException from "@/lib/exceptions/ApiException";
import AdminGuard from "@/lib/route-guard/AdminGuard";
import AuthGuard from "@/lib/route-guard/AuthGuard";
import type { Comment } from "@/lib/types/Comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, DialogActions, DialogContent, Skeleton, TextField } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface Props {
    comment: Comment
}

const reportCommentSchema = z.object({
    content: z.string()
})

type ReportCommentFormField = z.infer<typeof reportCommentSchema>

const CommentSingle = ({ comment }: Props) => {
    const reportCommentForm = useForm<ReportCommentFormField>({
        resolver: zodResolver(reportCommentSchema)
    })

    const [commentActionDialog, setCommentActionDialog] = useState(false);
    const [commentReportDialg, setCommentReportDialog] = useState(false);
    const accountResult = useQuery({
        queryKey: ['users', comment.account],
        queryFn: () => getUserById(comment.account),
    })

    const reportCommentMutation = useMutation({
        mutationFn: (data: string) => reportComment(comment.id, data),
        onSuccess: () => {
            toast("Đã gửi phiếu report");
        }
    })

    const onRepotCommentSubmit: SubmitHandler<ReportCommentFormField> = async (data) => {
        try {
            await reportCommentMutation.mutateAsync(data.content);
        }
        catch (e) {
            if (e instanceof ApiException) {
                toast(e.message);
                return
            }

            toast("Unexpected");
        }
        finally {
            setCommentReportDialog(false);
        }
    }

    const deleteCommentMutation = useMutation({
        mutationFn: () => deleteComment(comment.id),
        onSuccess: () => {
            toast("Đã xóa comment thành công");
        }
    });

    const onDeleteCommentSubmit = async () => {
        try {
            await deleteCommentMutation.mutateAsync()
        }
        catch (e) {
            if (e instanceof ApiException) {
                toast(e.message);
                return
            }

            toast("Unexpected");
        }
        finally {
            reportCommentForm.reset();
            setCommentActionDialog(false)
        }
    }

    return (
        <>
            <div key={comment.id} className="flex items-start gap-3">
                {(accountResult.isError || accountResult.isLoading) ? (
                    <Skeleton variant="rectangular" className="size-9" />
                ) : (
                    <img
                        src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${accountResult.data!.id}`}
                        alt={accountResult.data!.username}
                        className="w-9 h-9 rounded-full mt-1"
                    />
                )}
                <div className="w-full">
                    <div className="flex items-center gap-2">
                        {(accountResult.isError || accountResult.isLoading) ? (
                            <Skeleton variant="rectangular" className="w-20 h-5" />
                        ) : (
                            <span className="font-semibold text-white">{accountResult.data!.username}</span>
                        )}
                        <span className="text-xs text-gray-400">{`${(new Date(comment.createdTime).getFullYear())} - ${(new Date(comment.createdTime).getMonth())} - ${(new Date(comment.createdTime).getDate())}`}</span>
                    </div>
                    <div className="text-gray-200 text-sm mt-1">{comment.content}</div>
                </div>
                <Button
                    size="small" aria-label="add"
                    onClick={() => {
                        setCommentActionDialog(true)
                    }}
                >
                    <Menu className="text-indigo-700" />
                </Button>
            </div>
            <Dialog
                fullWidth
                maxWidth='xs'
                open={commentActionDialog}
                onClose={() => {
                    setCommentActionDialog(false)
                }}
            >
                <DialogContent className="flex flex-col bg-[#2f3147]">
                    <AdminGuard allowed={[1, 2]} fallBack={(
                        <></>
                    )}>
                        <Button onClick={() => {
                            onDeleteCommentSubmit()
                        }} variant="text" color="error">Xóa</Button>
                    </AdminGuard>
                    <Button variant="text" color="primary">Sao chép</Button>
                    <AuthGuard fallBackRequired={(
                        <></>
                    )} type="required">
                        <Button onClick={() => {
                            setCommentReportDialog(true)
                            setCommentActionDialog(false)
                        }}
                            variant="text" color="error">Báo cáo</Button>
                    </AuthGuard>

                </DialogContent>
            </Dialog>

            <Dialog
                fullWidth
                maxWidth='md'
                open={commentReportDialg}
                onClose={() => {
                    setCommentReportDialog(false)
                }}
            >
                <DialogContent className="flex flex-col bg-[#2f3147]">
                    <form>
                        <TextField
                            label="Lý do:"
                            fullWidth
                            {...reportCommentForm.register('content')}
                            error={!!reportCommentForm.formState.errors.content}
                            helperText={reportCommentForm.formState.errors.content?.message}
                        />

                    </form>
                </DialogContent>
                <DialogActions className="bg-[#2f3147]">
                    <Button variant="text">Hủy</Button>
                    <Button
                        onClick={reportCommentForm.handleSubmit(onRepotCommentSubmit)} 
                        variant="contained"
                    >
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default CommentSingle;