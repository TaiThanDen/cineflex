import { getUserById } from "@/lib/api"
import type { Comment } from "@/lib/types/Comment"
import { Button, TableCell, TableRow } from "@mui/material"
import { useQuery } from "@tanstack/react-query"

interface Props {
    comment: Comment,
    index: number
}

const CommentRow = ({ comment, index }: Props) => {
    const accountResult = useQuery({
        queryKey: ["users", comment.account],
        queryFn: () => getUserById(comment.account)
    })

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
                <TableCell>{comment.section}</TableCell>
                <TableCell>{comment.createdTime}</TableCell>
                <TableCell>{!comment.isDeleted ? 'Ẩn' : 'Hiện'}</TableCell>
                <TableCell>
                    <Button>Chi tiết</Button>
                </TableCell>
            </TableRow>
        </>
    )
}

export default CommentRow