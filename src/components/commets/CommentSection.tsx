import { getCommentBySection, postComment } from "@/lib/api";
import ApiException from "@/lib/exceptions/ApiException";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { string, z } from "zod";
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import { Box, Pagination } from "@mui/material";
import CommentSingle from "./CommentSingle";

interface props {
    id: string,
}

const schema = z.object({
    content: string().min(1).max(1000)
});

type FormFields = z.infer<typeof schema>;


const CommentSection = ({ id }: props) => {
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);

    const commentResult = useQuery({
        queryKey: ['comment-section', id, page],
        queryFn: () => getCommentBySection(id!, page - 1, 12),
        enabled: !!id
    })

    useEffect(() => {
        setCount(commentResult.data?.totalPage ?? 0)
    }, [commentResult])

    const { mutateAsync: postCommentMutate } = useMutation({
        mutationFn: (data: string) => postComment(data, id!),
        onSuccess: (data) => {
            reset();
            if (!commentResult.data) return;


            commentResult.data.data.unshift(data);

        }
    })

    const { register, watch, formState: { isSubmitting }, handleSubmit, reset } = useForm<FormFields>({
        resolver: zodResolver(schema),
        defaultValues: {
            content: ''
        },
    });




    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            if (id === undefined) { return };
            const comment = await postCommentMutate(data.content);

            return comment;
        }
        catch (e) {
            if (!(e instanceof ApiException)) {
                return;
            }

            if (e.status === 403) {
                toast('Vui lòng đăng nhập để comment');
            }
        }
    }






    return (
        <div className="w-full pl-0 bg-[#23263a] p-6 rounded-lg">
            {isSubmitting ? <>Submitting</> :
                <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="text-2xl font-bold mb-4">Bình luận</h2>
                    <textarea
                        className="w-full p-3 rounded bg-[#2f3147] text-white border-none focus:outline-none"
                        placeholder="Viết bình luận..."
                        rows={4}
                        maxLength={1000}
                        {...register('content')}
                    />
                    <button type="submit" className="flex justify-between mt-2 items-center">
                        <span className="text-gray-400 text-sm">{watch('content').length} / 1000</span>
                        <div className="flex items-center gap-1 text-[#EAC76F] cursor-pointer hover:opacity-80">
                            <span className="font-semibold">Gửi</span>
                            <PiPaperPlaneRightFill className="text-[#EAC76F] size-6" />
                        </div>
                    </button>
                </form>
            }

            {
                (!commentResult.isLoading && !commentResult.isError) && (
                    <div className="mt-6 space-y-4">
                        {commentResult.data!.data.map((c, i) => (
                            <CommentSingle comment={c} key={i} />
                        ))}
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <Pagination count={count + 1} page={page} onChange={(_, page) => {
                                setPage(page)
                            }} />
                        </Box>

                    </div>
                )
            }

        </div>
    );
};

export default CommentSection;
