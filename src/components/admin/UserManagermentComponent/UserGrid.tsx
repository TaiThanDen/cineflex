import UserBox from "./UserBox";
import type { Account } from "@/lib/types/Account";

interface Props {
    users: Account[];
}

const UserGrid = ({ users } : Props) => {

    return (
        <div className="container mx-auto p-8">
            {/* Header và thanh tìm kiếm */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h1 className="text-3xl font-bold">Quản lý người dùng</h1>
{/* 
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative w-full max-w-md flex-1">
                        <input
                            type="text"
                            className="w-full bg-transparent placeholder:text-slate-400 text-black text-sm border border-slate-400 rounded-full pl-4 pr-12 py-2 transition duration-300 focus:outline-none focus:border-indigo-400 hover:border-indigo-300 shadow-sm focus:shadow-lg"
                            placeholder="Tìm người dùng..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-indigo-600 hover:bg-indigo-700 transition px-3 py-1 rounded-full text-sm shadow"
                            onClick={() => {}}
                        >
                            <FaSearch />
                        </button>
                    </div>

                </div> */}
            </div>

            {/* Grid danh sách người dùng */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                    {users.map((user) => (
                    <UserBox
                        key={user.id}
                        user={user}
                    />
                ))}
            </div>

        </div>
    );
};

export default UserGrid;
