import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { me } from "@/lib/api";

const Profile = () => {

  const { data: account, isLoading, isError } = useQuery({
    queryFn: me,
    queryKey: ["me"]
  });

  const [editing, setEditing] = useState(false);

  if (isLoading) {
    return <>Đang tải dữ liệu</>
  }

  if (isError) {
    return <>Tải dữ liệu thất bại vui lòng refresh trang</>
  }

  return (
    <div className="min-h-screen bg-[#23263a] text-white py-10 px-6 flex justify-center">
      <div className="w-screen rounded-xl  p-8">
        <div className="flex items-center gap-6 mb-8">
          <img
            src="https://i.pravatar.cc/100"
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover "
          />
          <div>
            <h2 className="text-2xl font-bold">{account?.username}</h2>
            <p className="text-sm text-gray-400">{account?.email}</p>
          </div>
        </div>

        <hr className="border-gray-600 mb-6" />

        <h3 className="text-lg font-semibold mb-4">Thông tin cá nhân</h3>

        <div className="space-y-4">
          <div>
            <label className="text-sm">Username</label>
            <input
              disabled={!editing}
              name="username"
              className="w-full px-4 py-2 bg-[#2f3147] rounded text-white mt-1 disabled:opacity-60"
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <input
              disabled={!editing}
              name="email"
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
              Lưu thay đổi
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
      </div>
    </div>
  );
};

export default Profile;
