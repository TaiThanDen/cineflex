import { deleteComment, getCommentSection, getUserById } from "@/lib/api"
import ApiException from "@/lib/exceptions/ApiException"
import type { Comment } from "@/lib/types/Comment"
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, TableCell, TableRow } from "@mui/material"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "react-toastify"

interface Props {
    comment: Comment,
    index: number
}

const CommentRow = ({ comment, index }: Props) => {
    const [showModal, setShowModal] = useState(false)
    const queryClient = useQueryClient();

    const accountResult = useQuery({
        queryKey: ["users", comment.account],
        queryFn: () => getUserById(comment.account)
    })

    const commentSectionResult = useQuery({
        queryKey: ["comment-section", comment.section],
        queryFn: () => getCommentSection(comment.section)
    })

    const deleteCommentMutation = useMutation({
        mutationFn: () => deleteComment(comment.id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["comments"]
            })
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
            setShowModal(false)
        }
    }


    return (
        <>
            <TableRow>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{
                    ((!accountResult.isLoading || accountResult.isError)) && (
                        accountResult.data!.username
                    )
                }
                </TableCell>
                <TableCell className="line-clamp-3">{comment.content}</TableCell>
                <TableCell>{
                    ((!commentSectionResult.isLoading || commentSectionResult.isError)) &&
                    (

                        commentSectionResult.data!.alias
                    )
                }</TableCell>
                <TableCell>{comment.createdTime}</TableCell>
                <TableCell>{comment.isDeleted ? <Chip color="error" label="Ẩn"></Chip> : <Chip color="info" label="Hiện"></Chip>}</TableCell>
                <TableCell>
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
                <DialogTitle>
                    Comment
                </DialogTitle>
                <DialogContent>
                    <div className="grid grid-cols-2 grid-rows-2 gap-4">
                        <div className="col-start-2 row-start-1">
                            Người dùng comment: {
                                ((!accountResult.isLoading || accountResult.isError)) && (
                                    accountResult.data!.username
                                )
                            }
                        </div>
                        <div className="col-start-1 row-start-1">
                            Mục comment: {
                                ((!commentSectionResult.isLoading || commentSectionResult.isError)) &&
                                (
                                    commentSectionResult.data!.alias
                                )
                            }
                        </div>
                        <div className="row-start-2 col-span-2">
                            Ngày bắt đầu: {comment.createdTime}
                        </div>
                        <div className="row-start-3">
                            Nội dung bình luận: 
                        </div>
                        <div className="row-start-4 col-span-2">
                            {comment.content}
                        </div>
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button
                    >
                        Đóng
                    </Button>
                    <Button
                        disabled={comment.isDeleted || deleteCommentMutation.isPending}
                        color="error"
                        variant="contained"
                        onClick={() => {
                            onDeleteCommentSubmit()
                        }}
                    >
                        {comment.isDeleted? "Đã xóa":"Xóa"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default CommentRow