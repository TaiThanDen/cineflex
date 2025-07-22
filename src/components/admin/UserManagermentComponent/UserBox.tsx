import { roles } from "@/lib/roles";
import type { Account } from "@/lib/types/Account";
import { useState } from "react";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { banAccount, unbanAccount, updateAccount } from "@/lib/api";
import type { UpdateAccountCredentials } from "@/lib/types/UpdateAccountCredentials";
import { toast } from "react-toastify";
import ApiException from "@/lib/exceptions/ApiException";

interface Props {
    user: Account;
}

const roleColors: Record<number, string> = {
    0: "bg-gray-100 text-gray-800",
    1: "bg-blue-100 text-blue-800",
    2: "bg-red-100 text-red-800",
};

const editUserSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    role: z.string(),
    status: z.string()
})

type EditUserFormField = z.infer<typeof editUserSchema>


const UserBox = ({ user }: Props) => {
    const queryClient = useQueryClient();
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const editUserForm = useForm<EditUserFormField>({
        defaultValues: {
            username: user.username,
            email: user.email,
            role: user.role.toString(),
            status: user.activate ? "1" : "0"
        },
        resolver: zodResolver(editUserSchema)
    })

    const editUserMutation = useMutation({
        mutationFn: (data: UpdateAccountCredentials) => updateAccount(data, user.id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"]
            })
        }
    })

    const banUserMutation = useMutation({
        mutationFn: () => banAccount(user.id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"]
            })
        }
    })

    const unbanUserMutation = useMutation({
        mutationFn: () => unbanAccount(user.id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"]
            })
        }
    })

    const onUnbanUser = async () => {
        try {
            await unbanUserMutation.mutateAsync();
            toast(`Đã bỏ lệnh cấm người dùng: ${user.username}`);
        }
        catch (e) {
            if (e instanceof ApiException) {
                toast(e.message);
                return
            }

            toast("Unexpected");
        }
        finally {
            setOpenEditDialog(false);
        }
    }

    const onBanUser = async () => {
        try {
            await banUserMutation.mutateAsync();
            toast(`Đã cấm người dùng: ${user.username}`);
        }
        catch (e) {
            if (e instanceof ApiException) {
                toast(e.message);
                return
            }

            toast("Unexpected");
        }
        finally {
            setOpenEditDialog(false);
        }
    }


    const onEditUserSubmit: SubmitHandler<EditUserFormField> = async (data) => {
        try {
            const submitData: UpdateAccountCredentials = {
                email: data.email,
                role: data.role,
                username: data.username
            }
            const updated = await editUserMutation.mutateAsync(submitData);

            toast(`Đã chỉnh sửa thành công ${updated.username}`);
        }
        catch (e) {
            if (e instanceof ApiException) {
                toast(e.message);
                return
            }

            toast("Unexpected");
        }
        finally {
            setOpenEditDialog(false);
        }
    }


    return (
        <>
            <div
                onClick={() => {
                    setOpenEditDialog(true)
                }}
                className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:ring-2 hover:ring-indigo-400 cursor-pointer"
            >
                <img
                    src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${user.id}`}
                    alt={user.username}
                    className="w-32 h-32 object-cover rounded-lg mb-3"
                />
                <h2 className="font-semibold text-lg text-center">{user.username}</h2>
                <div className="flex gap-2 mt-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${roleColors[user.role]}`}>
                        {roles[user.role]}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${user.activate ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {user.activate ? "Đang hoạt động" : "Đã bị cấm"}
                    </span>
                </div>
            </div>
            <Dialog
                fullWidth
                maxWidth='lg'
                onClose={() => { setOpenEditDialog(false) }}
                open={openEditDialog}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    User: {user.id}
                </DialogTitle>
                <DialogContent dividers>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold mb-1">Username</label>
                            <input
                                {...editUserForm.register("username")}
                                type="text"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1">Email</label>
                            <input
                                {...editUserForm.register("email")}
                                type="email"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <div className="flex gap-4">
                            {user.role !== 2 && 
                            <div className="flex-1">
                                <label className="block text-sm font-semibold mb-1">Vai trò</label>
                                <select
                                    {...editUserForm.register("role")}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                >
                                    <option value="0">User</option>
                                    <option value="1">Moderator</option>
                                </select>
                            </div>}
                            <div className="flex-1">
                                <label className="block text-sm font-semibold mb-1">Trạng thái</label>
                                <select
                                    {...editUserForm.register("status")}
                                    disabled
                                    className="w-full border border-gray-300 disabled:text-gray-400 rounded px-3 py-2"
                                >
                                    <option value="1">Hoạt động</option>
                                    <option value="0">Bị cấm</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <button type="button" onClick={() => {
                        setOpenEditDialog(false)
                    }} className="bg-gray-200 px-4 py-2 rounded">
                        Hủy
                    </button >

                    {user.role !== 2 && (
                        <>
                            {user.activate ? (
                            <button onClick={onBanUser} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                                Cấm
                            </button>
                            ): (
                            <button onClick={onUnbanUser} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                                Bỏ lệnh cấm
                            </button>
                            )}
                            <button onClick={editUserForm.handleSubmit(onEditUserSubmit)} type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                                Lưu
                            </button>
                        </>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UserBox;
