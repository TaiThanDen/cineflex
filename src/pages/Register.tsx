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
    formState: {errors, isSubmitting}
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
      if (!(e instanceof ApiException)){
        setError('root', {message: 'caught an unknown error'})
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
    <div className="min-h-screen flex items-center justify-center bg-[#23263a]">
      <div className="flex w-[900px] h-[570px] mt-3 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 bg-[#23263a]">
        {/* Background poster bên trái */}
        <div
          className="w-1/2 bg-cover bg-center relative bg-shadow-lg"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-vector/flat-design-cinema-festival-invitation_23-2149949279.jpg?t=st=1749549507~exp=1749553107~hmac=2971ffc6523d933ad567e9502286696bf30cbfe011d9ab2f2035c7ebb8f1d6e4&w=1380')",
          }}
        >
          <div className="absolute inset-0 "></div>
        </div>
        {/* Form đăng ký bên phải */}
        <div className="w-1/2 bg-[#2f3147] flex flex-col justify-center px-12 py-10">
          <h2 className="text-3xl font-bold text-white mb-2">ĐĂNG KÝ</h2>
          <p className="text-gray-300">
            Nếu bạn đã có tài khoản,{" "}
            <Link to="/login" className="text-purple-400  ">
              đăng nhập ngay
            </Link>
          </p>
          {errors.root && (
            <div className="text-red-500 mb-6">{errors.root.message}</div>
          )}
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-white mb-1">Username</label>
              <input
                {...register('username')}
                type="text"
                placeholder="Enter your desired username here"
                className="w-full px-4 py-3 rounded-lg bg-[#3a3d4d] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {errors.username && (
                <div className="text-red-500">{errors.username.message}</div>
              )}
            </div>
            <div>
              <label className="block text-white mb-1">Email</label>
              <input
                {...register('email')}
                type="email"
                placeholder="Enter your email here"
                className="w-full px-4 py-3 rounded-lg bg-[#3a3d4d] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {errors.email && (
                <div className="text-red-500">{errors.email.message}</div>
              )}
            </div>
            <div>
              <label className="block text-white mb-1">Password</label>
              <input
                {...register('password')}
                type="password"
                placeholder="Enter your password here"
                className="w-full px-4 py-3 rounded-lg bg-[#3a3d4d] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {errors.password && (
                <div className="text-red-500">{errors.password.message}</div>
              )}
            </div>
            <div>
              <label className="block text-white mb-1">Confirm Password</label>
              <input
                {...register('passwordConfirm')}
                type="password"
                placeholder="Enter your password here"
                className="w-full px-4 py-3 rounded-lg bg-[#3a3d4d] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {errors.passwordConfirm && (
                <div className="text-red-500">{errors.passwordConfirm.message}</div>
              )}
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full mt-4 bg-purple-500 hover:bg-purple-700 text-[#23263a] font-semibold py-3 rounded-lg transition"
            >
              {isSubmitting ? 'Đang đăng ký' : 'Đăng ký'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;
