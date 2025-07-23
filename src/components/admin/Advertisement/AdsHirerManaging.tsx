import { createHirer, getAllHirers } from "@/lib/api"
import Button from "@mui/material/Button"
import Pagination from "@mui/material/Pagination"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import HirerRow from "./HirerRow"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import { z } from "zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { HirerCredentials } from "@/lib/types/HirerCredentials"
import ApiException from "@/lib/exceptions/ApiException"
import { toast } from "react-toastify"

const addHirerSchema = z.object({
    alias: z.string(),
    email: z.string().email("email không hợp lệ"),
    phone: z.string()
})

type AddHirerFormField = z.infer<typeof addHirerSchema>

const AdsHirerManaging = () => {
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0);
    const [addHirerOpen, setAddHirerOpen] = useState(false)

    const queryClient = useQueryClient();

    const hirerResult = useQuery({
        queryKey: ["hirers", page],
        queryFn: () => getAllHirers(page - 1, 5)
    })

    useEffect(() => {
        setTotalPage((hirerResult.data?.totalPage ?? 0))
    }, [hirerResult])

    const addHirerForm = useForm<AddHirerFormField>({
        resolver: zodResolver(addHirerSchema)
    })

    const addHirerMutation = useMutation({
        mutationFn: createHirer,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["hirers"]
            })
        }  
    })

    const onAddHirerSubmit: SubmitHandler<AddHirerFormField> = async (data) => {
        console.log(data)
        try {
            const submitData: HirerCredentials = {
                alias: data.alias,
                email: data.email,
                phone: data.phone
            }

            const h = await addHirerMutation.mutateAsync(submitData);

            toast(`Thêm đơn vị thuê quảng cáo thành công ${h.alias}`)
        }
        catch (e) {
            if (e instanceof ApiException) {
                toast(e.message);
                return
            }

            toast("Unexpected");
        }
        finally {
            setAddHirerOpen(false)
        }
    } 


    if (hirerResult.isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-lg text-gray-600">
                        Đang tải
                    </p>
                </div>
            </div>
        )
    }

    // Xử lý trạng thái lỗi
    if (hirerResult.isError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-red-600 mb-2">
                        Lỗi tải dữ liệu
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Không thể tải dữ liệu phim. Vui lòng thử lại.
                    </p>
                    <button
                        onClick={() => {
                        }}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Button onClick={() => {setAddHirerOpen(true)}} variant="contained">Thêm mới</Button>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">#</TableCell>
                            <TableCell align="left">Tên đơn vị</TableCell>
                            <TableCell align="left">Số điện thoại</TableCell>
                            <TableCell align="left">email</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {hirerResult.data!.data.map((hirer, index) => (
                            <HirerRow index={index} hirer={hirer} key={hirer.id} />  
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination 
                className="flex items-center justify-center" 
                count={totalPage + 1}
                page={page}
                onChange={(_, p) => {
                    setPage(p)
                }}
            />

            <Dialog
                open={addHirerOpen}
                onClose={() => { setAddHirerOpen(false) }}
                fullWidth
                maxWidth='lg'
            >
                <DialogTitle>
                    Thêm đơn vị cung cấp
                </DialogTitle>
                <DialogContent>
                    <form className="space-y-6">

                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700">
                                Tên đơn vị
                            </label>
                            <input
                                {...addHirerForm.register("alias")}
                                type="text"
                                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                            {addHirerForm.formState.errors.alias && (
                                <div className="text-red-500">{addHirerForm.formState.errors.alias.message}</div>
                            )}
                        </div>

                        {/* Episode Name */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700">
                                Số điện thoại
                            </label>
                            <input
                                {...addHirerForm.register("phone")}
                                type="text"
                                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                            {addHirerForm.formState.errors.phone && (
                                <div className="text-red-500">{addHirerForm.formState.errors.phone.message}</div>
                            )}
                        </div>

                        {/* Video ID */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700">
                                Email
                            </label>
                            <input
                                {...addHirerForm.register("email")}
                                type="text"
                                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                            {addHirerForm.formState.errors.email && (
                                <div className="text-red-500">{addHirerForm.formState.errors.email.message}</div>
                            )}
                        </div>

                    </form>
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={() => { setAddHirerOpen(false) }}
                        type="button"
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        onClick={addHirerForm.handleSubmit(onAddHirerSubmit)}
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

export default AdsHirerManaging