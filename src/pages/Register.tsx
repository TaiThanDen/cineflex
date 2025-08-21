import { Link } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ApiException from "@/lib/exceptions/ApiException";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { register as registerAPI } from "@/lib/api";

const schema = z.object({
  username: z.string().min(5, 'Username phải có tối thiểu 5 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(8, 'Mật khẩu phải có tối thiểu 8 ký tự'),
  passwordConfirm: z.string()
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Mật khẩu không trùng khớp'
})

type FormFields = z.infer<typeof schema>;

const Register = () => {
  const navigate = useNavigate();
  const { mutateAsync: registerUser } = useMutation({
    mutationFn: registerAPI
  })

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<FormFields>({
    resolver: zodResolver(schema)
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const email = await registerUser({
        email: data.email,
        username: data.username,
        password: data.password
      });

      navigate(`/verify?email=${email}`);
      toast(`Đã tạo tài khoản cho email: ${email}`);
    }
    catch (e) {
      if (!(e instanceof ApiException)) {
        setError('root', { message: 'caught an unknown error' })
      }
      try {
        const err = e as ApiException;
        const errorObject = JSON.parse(err.message);

        setError('root', { message: errorObject.detail })
      } catch {
        setError('root', { message: 'unknown error format' });
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#23263a] p-4">
      {/* Container responsive */}
      <div className="flex flex-col lg:flex-row w-full max-w-5xl h-auto lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl shadow-black/40 bg-[#23263a]">

        {/* Background poster - Ẩn trên mobile, hiển thị từ lg trở lên */}
        <div
          className="hidden lg:block lg:w-1/2 bg-cover bg-center relative min-h-[250px] lg:min-h-full"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-vector/flat-design-cinema-festival-invitation_23-2149949279.jpg?t=st=1749549507~exp=1749553107~hmac=2971ffc6523d933ad567e9502286696bf30cbfe011d9ab2f2035c7ebb8f1d6e4&w=1380')",
          }}
        >
          <div className="absolute inset-0"></div>
        </div>

        {/* Form đăng ký */}
        <div className="w-full lg:w-1/2 bg-[#2f3147] flex flex-col justify-center px-6 sm:px-8 md:px-12 py-6 sm:py-8 lg:py-10">

          {/* Logo/Brand cho mobile */}
          <div className="text-center mb-4 lg:hidden">
            <h1 className="text-2xl font-bold text-purple-400">CINEFLEX</h1>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center lg:text-left">
            ĐĂNG KÝ
          </h2>

          <p className="text-gray-300 mb-4 text-center lg:text-left text-sm sm:text-base">
            Nếu bạn đã có tài khoản,{" "}
            <Link to="/login" className="text-purple-400 hover:text-purple-300 transition-colors">
              đăng nhập ngay
            </Link>
          </p>

          {errors.root && (
            <div className="text-red-400 mb-4 text-xs sm:text-sm text-center lg:text-left p-2 sm:p-3 bg-red-900/20 rounded-lg border border-red-800">
              {errors.root.message}
            </div>
          )}

          <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-white mb-1 text-sm sm:text-base">
                Username
              </label>
              <input
                {...register('username')}
                type="text"
                placeholder="Enter your desired username here"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-[#3a3d4d] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all text-sm sm:text-base"
              />
              {errors.username && (
                <div className="text-red-400 text-xs sm:text-sm mt-1">
                  {errors.username.message}
                </div>
              )}
            </div>

            <div>
              <label className="block text-white mb-1 text-sm sm:text-base">
                Email
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="Enter your email here"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-[#3a3d4d] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all text-sm sm:text-base"
              />
              {errors.email && (
                <div className="text-red-400 text-xs sm:text-sm mt-1">
                  {errors.email.message}
                </div>
              )}
            </div>

            <div>
              <label className="block text-white mb-1 text-sm sm:text-base">
                Password
              </label>
              <input
                {...register('password')}
                type="password"
                placeholder="Enter your password here"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-[#3a3d4d] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all text-sm sm:text-base"
              />
              {errors.password && (
                <div className="text-red-400 text-xs sm:text-sm mt-1">
                  {errors.password.message}
                </div>
              )}
            </div>

            <div>
              <label className="block text-white mb-1 text-sm sm:text-base">
                Confirm Password
              </label>
              <input
                {...register('passwordConfirm')}
                type="password"
                placeholder="Confirm your password here"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-[#3a3d4d] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all text-sm sm:text-base"
              />
              {errors.passwordConfirm && (
                <div className="text-red-400 text-xs sm:text-sm mt-1">
                  {errors.passwordConfirm.message}
                </div>
              )}
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full mt-4 sm:mt-6 bg-purple-400 hover:bg-purple-500 disabled:bg-purple-600 disabled:cursor-not-allowed text-[#23263a] font-semibold py-2 sm:py-3 rounded-lg transition-all text-sm sm:text-base"
            >
              {isSubmitting ? 'Đang đăng ký...' : 'Đăng ký'}
            </button>
          </form>

          {/* Terms & Conditions */}
          <p className="text-gray-400 mt-3 sm:mt-4 text-center lg:text-left text-xs sm:text-sm">
            Bằng việc đăng ký, bạn đồng ý với{" "}
            <Link to="/terms" className="text-purple-400 hover:text-purple-300 transition-colors">
              Điều khoản dịch vụ
            </Link>
            {" "}và{" "}
            <Link to="/privacy" className="text-purple-400 hover:text-purple-300 transition-colors">
              Chính sách bảo mật
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
