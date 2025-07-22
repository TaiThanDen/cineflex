import { sendVerificationEmail } from "@/lib/api";
import ApiException from "@/lib/exceptions/ApiException";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import { z } from "zod";

const SendEmailVerificationSchema = z.object({
  email: z.string().email("Email không hợp lệ")
})

type SendEmailVerificationFormField = z.infer<typeof SendEmailVerificationSchema>

const MailVerify = () => {
  const searchParam = new URLSearchParams(useLocation().search);
  const email = searchParam.get("email")

  const sendEmailVerificationForm = useForm<SendEmailVerificationFormField>({
    defaultValues: {
      email: email ?? ''
    },
    resolver: zodResolver(SendEmailVerificationSchema)
  })

  const sendEmailMutation = useMutation({
    mutationFn: sendVerificationEmail
  })

  const onSubmit: SubmitHandler<SendEmailVerificationFormField> = async (data) => {
    try {
      await sendEmailMutation.mutateAsync(data.email)

      toast(`Đã gửi email xác nhận cho ${data.email}`)
    }
    catch (e) {
      if (e instanceof ApiException) {
          toast(e.message);
          return
      }

      toast("Unexpected");
    }
  }


  return (
  <div className="min-h-screen flex items-center justify-center bg-[#23263a]">
    <div className="flex w-[900px] h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-black/40 bg-[#23263a]">
      {/* Background poster bên trái */}
      <div
        className="w-1/2 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/flat-design-cinema-festival-invitation_23-2149949279.jpg?t=st=1749549507~exp=1749553107~hmac=2971ffc6523d933ad567e9502286696bf30cbfe011d9ab2f2035c7ebb8f1d6e4&w=1380')",
        }}
      >
        <div className="absolute inset-0 "></div>
      </div>
      {/* Form đăng nhập bên phải */}
      <div className="w-1/2 bg-[#2f3147] flex flex-col justify-center px-12 py-10">
        <h2 className="text-3xl font-bold text-white mb-2">Xác thực Email</h2>
        <form onSubmit={sendEmailVerificationForm.handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-white mb-1">Email</label>
            <input
              {...sendEmailVerificationForm.register('email')}
              type="email"
              placeholder="Enter your email here"
              className="w-full px-4 py-3 rounded-lg bg-[#3a3d4d] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            {sendEmailVerificationForm.formState.errors.email && (
              <div className="text-red-500">{sendEmailVerificationForm.formState.errors.email.message}</div>
            )}
          </div>
        
          <button
            disabled={sendEmailVerificationForm.formState.isSubmitting}
            type="submit"
            className="w-full mt-4 bg-purple-400 hover:bg-purple-500 text-[#23263a] font-semibold py-3 rounded-lg transition"
          >
            {sendEmailVerificationForm.formState.isSubmitting ? 'Đang xử lý':'Gửi mã xác thực'}
          </button>
        </form>
      </div>
    </div>
  </div>
  )
};

export default MailVerify;
