import { useState } from "react";
import {
  // PlusIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";


const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    username: "Shilly",
    email: "shilly@example.com",
    avatar: "https://i.pravatar.cc/100",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#23263a] text-white py-10 px-6 pt-10 ">
      <div className="flex w-full max-w-7xl gap-8 pt-5">
        {/* Main Content */}
        <main className="flex-6 bg-[#23263a] rounded-xl p-8 max-w-full">
          <div className="flex items-center gap-6 mb-8">
            <img
              src={profile.avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold">{profile.username}</h2>
              <p className="text-sm text-gray-400">{profile.email}</p>
            </div>
          </div>
          <hr className="border-gray-600 mb-6" />
          <h3 className="text-lg font-semibold mb-4">Thông tin cá nhân</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm">Tên hiển thị</label>
              <input
                disabled={!editing}
                name="username"
                value={profile.username}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#2f3147] rounded text-white mt-1 disabled:opacity-60"
              />
            </div>
            <div>
              <label className="text-sm">Email</label>
              <input
                disabled
                name="email"
                value={profile.email}
                className="w-full px-4 py-2 bg-[#2f3147] rounded text-white mt-1 disabled:opacity-60"
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            {editing ? (
              <button
                onClick={() => setEditing(false)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Cập nhật
              </button>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="bg-[#7008e7] hover:bg-violet-600 text-white px-4 py-2 rounded"
              >
                Chỉnh sửa
              </button>
            )}
            
          </div>
            <p className="text-gray-300">
              Đổi mật khẩu, nhấn vào{" "}
              <a href="/change-password" className="text-[#7008e7] hover:text-yellow-500">
                đây
              </a>
            </p>
            <div className="mt-10">
            <Link
              to="/logout"
              className="flex items-center gap-2 text-white hover:text-[#7008e7] mt-4"
            >
              <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
              <span>Thoát</span>
            </Link>
          </div> 
           
        </main>
      </div>
    </div>
  );
};

export default Profile;
