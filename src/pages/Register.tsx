import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen min-w-full flex items-center justify-center">
      <div className="flex w-full h-full min-h-screen min-w-full">
        <div
          className="hidden md:block w-1/2 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://static.nutscdn.com/vimg/0-0/7aac45ead7eba60727e620d50e45ff5b.jpg')",
            filter: "brightness(0.6)",
          }}
        ></div>
        <div className="w-full md:w-1/2 bg-[#23263a] text-white flex flex-col justify-center px-8 md:px-24 py-12">
          <h2 className="text-xl font-bold uppercase mb-2">Đăng ký</h2>
          <p className="text-sm mb-4">
            Nếu bạn đã có tài khoản,{" "}
            <Link to="/login" className="text-[#fcaf3c] hover:underline">
              đăng nhập ngay
            </Link>
          </p>
          <label className="text-sm">Username</label>
          <input
            type="text"
            placeholder="Enter your desired username here"
            className="w-full px-4 py-2 mb-4 rounded bg-[#3a4060] focus:outline-none"
          />
          <label className="text-sm">Email</label>
          <input
            type="email"
            placeholder="Enter your email here"
            className="w-full px-4 py-2 mb-4 rounded bg-[#3a4060] focus:outline-none"
          />
          <label className="text-sm">Password</label>
          <input
            type="password"
            placeholder="Enter your password here"
            className="w-full px-4 py-2 mb-4 rounded bg-[#3a4060] focus:outline-none"
          />
          <button className="bg-[#da9d59] text-black w-full py-2 rounded hover:opacity-90">
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
