import { Link } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Auth from "@/context/Auth";
import { useContext } from "react";
import ApiException from "@/lib/exceptions/ApiException";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/lib/api";
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';

const schema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(8, 'Mật khẩu phải có tối thiểu 8 ký tự')
})

type FormFields = z.infer<typeof schema>;

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(Auth);

  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<FormFields>({
    resolver: zodResolver(schema) 
  });

  const comment = await postAComment(data.content, id);


  const { mutateAsync: logTheUserIn } = useMutation({
    mutationFn: login
  });
  
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const token = await logTheUserIn(data);
      
      setAuth(token);
      toast(`Chào mừng quay trở lại!`);
      navigate('/');
    }
    catch (e) {
      if ((e instanceof ApiException)){
        if (e.status === 401) {
          setError('root', {message: 'Email hoặc mật khẩu không hợp lệ'});
          return;
        }
        if (e.status === 403) {
          setError('email', {message: 'Vui lòng xác minh tài khoản'});
          return;
        }
        setError('root', {message:'Vui lòng thử lại sau'});
        return;
      }
      setError('root', {message: 'unknow error'})
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
          <h2 className="text-3xl font-bold text-white mb-2">ĐĂNG NHẬP</h2>
          <p className="text-gray-300 mb-6">
            Nếu bạn chưa có tài khoản,{" "}
            <Link to="/register" className="text-purple-400 ">
              đăng ký ngay
            </Link>
          </p>
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
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
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full mt-4 bg-purple-400 hover:bg-purple-500 text-[#23263a] font-semibold py-3 rounded-lg transition"
            >
              {!isSubmitting?'Đăng nhập':'Đang đăng nhập'}
            </button>
            {errors.root && (
              <div className="text-red-500">{errors.root.message}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
