import { getCommentByEpisodes, getUserById, postComment } from "@/lib/api";
import ApiException from "@/lib/exceptions/ApiException";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { string, z } from "zod";
import { toast } from 'react-toastify';

interface props {
  id?: string,
}

const schema = z.object({
  content: string().min(1).max(1000)
});

type FormFields = z.infer<typeof schema>;

// const schema = z.object({
//   email: z.string().email('Email không hợp lệ'),
//   password: z.string().min(8, 'Mật khẩu phải có tối thiểu 8 ký tự')
// })

// type FormFields = z.infer<typeof schema>;

const CommentSection = ({ id } : props) => {
  const commentResult = useQuery({
    queryKey: ['comments_of_episode', id],
    queryFn: () => getCommentByEpisodes(id!),
    enabled: !!id
  })

  const {mutateAsync: postCommentMutate} = useMutation({
    mutationFn: (data: {content: string, episode: string}) => postComment(data.content, data.episode),
    onSuccess: (data) => {
      if (!commentResult.data) return;


      commentResult.data.unshift(data);
      // queryClient.invalidateQueries({
      //   predicate: (query) => query.queryKey[0] === "comments_of_episode" && query.queryKey[1] === id
      // })
    }
  })

  const accountResult = useQueries({
    queries: [...(commentResult.data?commentResult.data:[]).map((c) => ({
        queryKey: ['user_of_comment', c.id],
        queryFn: () => getUserById(c.account),
        enabled: !!c.id
      }))]
  })

  const accountLoading = accountResult.some((a) => a.isLoading);
  const accountError = accountResult.some((a) => a.isError);

  const {register, watch, formState: {isSubmitting}, handleSubmit, setValue} = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      content: ''
    }
  });




  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      if (id === undefined) {return};
      const body = {
        content: data.content,
        episode: id
      }
      const comment = await postCommentMutate(body);

      return comment;
    }
    catch (e) {
      if (!(e instanceof ApiException)) {
        return;
      }

      if (e.status === 401) {
        toast('Vui lòng đăng nhập để comment');
      }
    }
    setValue("content", "");
  }

  if (commentResult.isLoading || accountLoading) {
    return <>Loading</>
  }

  if (commentResult.isError || accountError) {
    return <>Error</>
  }





  return (
    <div className="w-full pl-0 bg-[#23263a] p-6 rounded-lg">
      {isSubmitting ? <>Submitting</>:
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


      <div className="mt-6 space-y-4">
        {(id?commentResult.data!:[]).map((c, i) => (
          <div key={c.id} className="flex items-start gap-3">
            <img
              src={`https://i.pravatar.cc/100`}
              alt={accountResult[i].data!.username}
              className="w-9 h-9 rounded-full mt-1"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">{accountResult[i].data!.username}</span>
                <span className="text-xs text-gray-400">{`${(new Date(c.createdTime).getFullYear())} - ${(new Date(c.createdTime).getMonth())} - ${(new Date(c.createdTime).getDate())}`}</span>
              </div>
              <div className="text-gray-200 text-sm mt-1">{c.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
