import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen min-w-full flex items-center justify-center">
      <div className="flex w-full h-full min-h-screen min-w-full">
        <div
          className="hidden md:block w-1/2 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://static.nutscdn.com/vimg/0-0/6ac4c22c54d138af06162a3d080612a2.jpg')",
            filter: "brightness(0.6)",
          }}
        ></div>
        <div className="w-full md:w-1/2 bg-[#23263a] text-white flex flex-col justify-center px-8 md:px-24 py-12">
          <h2 className="text-2xl font-bold uppercase mb-2 tracking-wide">
            Đăng nhập
          </h2>
          <p className="text-base mb-6 text-gray-300">
            Nếu bạn chưa có tài khoản,{" "}
            <Link
              to="/register"
              className="text-[#FCAF3C] font-medium hover:underline"
            >
              đăng ký ngay
            </Link>
          </p>
          <label className="text-base mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email here"
            className="w-full px-4 py-2 mb-4 rounded bg-[#3a4060] text-white placeholder-gray-300 focus:outline-none"
          />
          <label className="text-base mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password here"
            className="w-full px-4 py-2 mb-6 rounded bg-[#3a4060] text-white placeholder-gray-300 focus:outline-none"
          />
          <button className="bg-[#da9d59] text-[#23263a] w-full py-2 rounded font-semibold text-base hover:opacity-90 transition mb-2">
            Đăng nhập
          </button>
          <p className="text-xl text-center mt-1 text-gray-200 hover:underline cursor-pointer">
            Quên mật khẩu?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
