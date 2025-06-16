import React from "react";

interface Props {
    user: {
        id: string;
        name: string;
        role: "User" | "Admin" | "Moderator" | "UserVip";
        status: "Active" | "Banned";
        profile: string;
    };
    onClick: () => void;
}

const roleColors: Record<string, string> = {
    User: "bg-gray-100 text-gray-800",
    Admin: "bg-red-100 text-red-800",
    Moderator: "bg-blue-100 text-blue-800",
    UserVip: "bg-purple-100 text-purple-800",
};

const statusColors: Record<string, string> = {
    Active: "bg-green-100 text-green-600",
    Banned: "bg-red-100 text-red-600",
};

const UserBox: React.FC<Props> = ({ user, onClick }) => {
    return (
        <div
            className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:ring-2 hover:ring-indigo-400 cursor-pointer"
            onClick={onClick}
        >
            <img
                src={user.profile}
                alt={user.name}
                className="w-32 h-32 object-cover rounded-lg mb-3"
            />
            <h2 className="font-semibold text-lg text-center">{user.name}</h2>
            <div className="flex gap-2 mt-2">
        <span className={`px-2 py-1 rounded text-xs font-semibold ${roleColors[user.role]}`}>
          {user.role}
        </span>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[user.status]}`}>
          {user.status === "Active" ? "Hoạt động" : "Bị cấm"}
        </span>
            </div>
        </div>
    );
};

export default UserBox;
