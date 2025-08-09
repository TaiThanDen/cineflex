import { resetPassword, sendOtp } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { MuiOtpInput } from 'mui-one-time-password-input'
import { useEffect, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import z from 'zod';

const resetPasswordSchema = z.object({
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(8, "Mật khẩu phải có tối thiểu 8 ký tự"),
    otp: z.string().length(6, "Vui lòng nhập otp")
});

type ResetPasswordFormFields = z.infer<typeof resetPasswordSchema>;


const ResetPasswordPage = () => {
    const resetPasswordForm = useForm<ResetPasswordFormFields>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const navigate = useNavigate();

    const sendOtpMutation = useMutation({
        mutationFn: sendOtp,
        onSuccess: () => {
            toast('Đã gửi mã xác thực thành công')
        },
        onError: () => {
            toast('Không thể tìm thấy email, vui lòng thử lại sau')
        }
    })

    const resetPasswordMutation = useMutation({
        mutationFn: resetPassword,
        onSuccess: () => {
            navigate('/login')
        }
    })

    const onResetPasswordSubmit: SubmitHandler<ResetPasswordFormFields> = async (data) => {
        try {
            await resetPasswordMutation.mutateAsync(data);
            toast('Đã đổi mật khẩu thành công');
        }
        catch {
            resetPasswordForm.setError("root", {
                message: `Vui lòng thử lại sau`
            })
        }
    }

    const [otp, setOtp] = useState('')

    useEffect(() => {
        resetPasswordForm.setValue("otp", otp)
    }, [otp, resetPasswordForm]);

    const handleChange = (newValue: string) => {
        setOtp(newValue)
    }
    return (
        <>
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
                        <h2 className="text-3xl font-bold text-white mb-2">ĐĂNG NHẬP</h2>

                        <form onSubmit={resetPasswordForm.handleSubmit(onResetPasswordSubmit)} className="space-y-5">
                            <div>
                                <label className="block text-white mb-1">Email</label>
                                <div className="w-full h-13 flex gap-8">
                                    <input
                                        type="email"
                                        placeholder="Enter your email here"
                                        className="flex-8/12 px-4 py-3 rounded-lg bg-[#3a3d4d] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                        {...resetPasswordForm.register("email")}
                                    />
                                    <button
                                        onClick={() => {
                                            sendOtpMutation.mutate(resetPasswordForm.getValues("email"));
                                        }}
                                        disabled={sendOtpMutation.isPending}
                                        type="button"
                                        className="flex-4/12 bg-purple-400 hover:bg-purple-500 text-[#23263a] font-semibold py-3 rounded-lg transition"
                                    >
                                        {sendOtpMutation.isPending? 'Đang gửi': 'Gửi mã'}
                                    </button>                                    
                                </div>

                            </div>

                            <div>
                                <label className="block text-white mb-1">OTP</label>
                                <MuiOtpInput length={6} onChange={handleChange} value={otp}/>
                            </div>

                            <div>
                                <label className="block text-white mb-1">Password</label>
                                <input
                                    {...resetPasswordForm.register('password')}
                                    type="password"
                                    placeholder="Enter your password here"
                                    className="w-full px-4 py-3 rounded-lg bg-[#3a3d4d] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                />
                            </div>
                            {resetPasswordForm.formState.errors.root && (
                                <div className="text-red-500">{resetPasswordForm.formState.errors.root.message}</div>
                            )}

                            <button
                                disabled={resetPasswordForm.formState.isSubmitting}
                                type="submit"
                                className="w-full mt-4 bg-purple-400 hover:bg-purple-500 text-[#23263a] font-semibold py-3 rounded-lg transition"
                            >
                                Reset pasword
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPasswordPage;