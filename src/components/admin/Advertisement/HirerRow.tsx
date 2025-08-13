import { updateHirer } from "@/lib/api"
import ApiException from "@/lib/exceptions/ApiException"
import type { Hirer } from "@/lib/types/Hirer"
import type { HirerCredentials } from "@/lib/types/HirerCredentials"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import Button from "@mui/material/Button"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { toast } from "react-toastify"
import z from "zod"

interface Props {
    hirer: Hirer,
    index: number
}

const editHirerSchema = z.object({
    alias: z.string(),
    email: z.string().email("email không hợp lệ"),
    phone: z.string()
})

type EditHirerFormField = z.infer<typeof editHirerSchema>

const HirerRow = ({ hirer, index } : Props) => {
    const queryClient = useQueryClient();

    const [editHirerOpen, setEditHirerOpen] = useState(false);

    const editHirerForm = useForm<EditHirerFormField>({
        resolver: zodResolver(editHirerSchema),
        defaultValues: {
            alias: hirer.alias,
            email: hirer.email,
            phone: hirer.phone
        }
    })

    const editHirerMutate = useMutation({
        mutationFn: (data: HirerCredentials) => updateHirer(hirer.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['hirers']
            })
        }
    })

    //onEditEpisodeSubmit
    const onEditHirerSubmit: SubmitHandler<EditHirerFormField> = async (data) => {
        try {
            const submitData: HirerCredentials = {
                alias: data.alias,
                phone: data.phone,
                email: data.email
            }


            const hirer = await editHirerMutate.mutateAsync(submitData);

            toast(`Đã sửa đơn vị cung cấp quảng cáo thành công: ${hirer.alias}`)
        }
        catch (e) {
            if (e instanceof ApiException) {
                toast(e.message)
                return
            }
            toast("Unxpected")
        }
        finally {
            setEditHirerOpen(false);
            editHirerForm.reset();
        }
    }

    return (
        <>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left">{index}</TableCell>
                <TableCell align="left">{hirer.alias}</TableCell>
                <TableCell align="left">{hirer.phone}</TableCell>
                <TableCell align="left">{hirer.email}</TableCell>
                <TableCell align="left">
                    <Button
                        onClick={() => {
                            setEditHirerOpen(true)
                        }}
                    >
                        Chi tiết
                    </Button>
                </TableCell>
            </TableRow>
        
            <Dialog
                open={editHirerOpen}
                onClose={() => { setEditHirerOpen(false) }}
                fullWidth
                maxWidth='lg'
            >
                <DialogTitle>
                    Cập nhật đơn vị cung cấp
                </DialogTitle>
                <DialogContent>
                    <form className="space-y-6">

                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700">
                                Tên đơn vị
                            </label>
                            <input
                                {...editHirerForm.register("alias")}
                                type="text"
                                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                            {editHirerForm.formState.errors.alias && (
                                <div className="text-red-500">{editHirerForm.formState.errors.alias.message}</div>
                            )}
                        </div>

                        {/* Episode Name */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700">
                                Số điện thoại
                            </label>
                            <input
                                {...editHirerForm.register("phone")}
                                type="text"
                                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                            {editHirerForm.formState.errors.phone && (
                                <div className="text-red-500">{editHirerForm.formState.errors.phone.message}</div>
                            )}
                        </div>

                        {/* Video ID */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700">
                                Email
                            </label>
                            <input
                                {...editHirerForm.register("email")}
                                type="text"
                                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                            {editHirerForm.formState.errors.email && (
                                <div className="text-red-500">{editHirerForm.formState.errors.email.message}</div>
                            )}
                        </div>

                    </form>
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={() => { setEditHirerOpen(false) }}
                        disabled={editHirerForm.formState.isSubmitting}
                        type="button"
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        onClick={editHirerForm.handleSubmit(onEditHirerSubmit)}
                        disabled={editHirerForm.formState.isSubmitting}
                        type="button"
                        className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold disabled:opacity-50"
                    >
                        Xác nhận
                    </button>
                </DialogActions>
            </Dialog>
        </>
    )
} 

export default HirerRow