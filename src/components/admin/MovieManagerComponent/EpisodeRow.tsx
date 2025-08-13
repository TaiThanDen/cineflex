import { updateEpisode } from "@/lib/api"
import ApiException from "@/lib/exceptions/ApiException"
import type { Episode } from "@/lib/types/Episode"
import type { EpisodeCredentials } from "@/lib/types/EpisodeCredentials"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { toast } from "react-toastify"
import z from "zod"
import {deleteEpisode} from "@/lib/api";

interface props {
    episode: Episode
    index: number
}

const editEpisodeFormSchema = z.object({
    number: z.string().regex(/^\d+(\.\d)?$/, "Số tập phim phải là số"),
    title: z.string(),
    url: z.string(),
    duration: z.string().regex(/^\d+?$/, "Thời lượng phim phải là số"),
    releaseDate: z.string(),
    description: z.string(),
    openingEnd: z.string().regex(/^\d+?$/, "Thời lượng phim phải là số")
})

type EditEpisodeField = z.infer<typeof editEpisodeFormSchema>;

const EpisodeRow = ({ episode, index }: props) => {
    const [editEpisodeModalVisible, setEditEpisodeModalVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const queryClient = useQueryClient();

    const editEpisodeForm = useForm<EditEpisodeField>({
        resolver: zodResolver(editEpisodeFormSchema),
        defaultValues: {
            description: episode.description,
            duration: episode.duration.toString(),
            number: episode.number,
            releaseDate: episode.releaseDate,
            title: episode.title,
            url: episode.url,
            openingEnd: episode.openingEnd.toString()
        }
    })


    const editEpisodeMutate = useMutation({
        mutationFn: (data: EpisodeCredentials) => updateEpisode(episode.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['episodes_of_season', episode.season]
            })
        }
    })

    const deleteEpisodeMutate = useMutation({
        mutationFn: () => deleteEpisode(episode.id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['episodes_of_season', episode.season]
            })
        }
    })
    //onEditEpisodeSubmit
    const onEditEpisodeSubmit: SubmitHandler<EditEpisodeField> = async (data) => {
        try {
            const submitData: EpisodeCredentials = {
                description: data.description,
                duration: +data.duration,
                releaseDate: data.releaseDate,
                number: data.number,
                title: data.title,
                url: data.url,
                openingEnd: +data.openingEnd,
                openingStart: 0
            }


            const episode = await editEpisodeMutate.mutateAsync(submitData);

            toast(`Đã sửa tập phim thành công: ${episode.title}`)
        }
        catch (e) {
            if (e instanceof ApiException) {
                toast(e.message)
            }
            toast("Unxpected")
        }
        finally {
            setEditEpisodeModalVisible(false);
            editEpisodeForm.reset();
        }
    }

    const handleDelete = async () => {
        try {
            await deleteEpisodeMutate.mutateAsync();
            toast("Đã xóa tập phim thành công");
        } catch (e) {
            if (e instanceof ApiException) {
                toast(e.message)
            }
            toast("Unxpected")
        } finally {
            setShowModal(false);
        }
    };


    return (
        <>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell align="left">{episode.title}</TableCell>
                <TableCell align="left">{episode.url}</TableCell>
                <TableCell align="left">{episode.duration}</TableCell>
                <TableCell align="left">
                    <ButtonGroup color="warning" variant="contained" aria-label="Basic button group">
                        <Button
                            onClick={() => {setEditEpisodeModalVisible(true)}}
                            color="warning">Sửa
                        </Button>
                        <Button onClick={() => setShowModal(true)} color="error">Xóa</Button>
                    </ButtonGroup>
                </TableCell>
            </TableRow>

            <Dialog
                open={showModal}
                onClose={()=> setShowModal(false)}
                fullWidth
                maxWidth='lg'
            >
                <DialogTitle>
                    Xóa tập
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Xác nhận xóa tập?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button
                        type="button"
                        onClick={()=> setShowModal(false)}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:opacity-50"
                    >
                        Xác nhận
                    </button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={editEpisodeModalVisible}
                onClose={() => { setEditEpisodeModalVisible(false) }}
                fullWidth
                maxWidth='lg'
            >
                <DialogTitle>
                    Thêm tập
                </DialogTitle>
                <DialogContent>
                    <form className="space-y-6">


                        {/* Episode Number */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700">
                                Số tập
                            </label>
                            <input
                                {...editEpisodeForm.register('number')}
                                type="text"
                                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
                                placeholder="Số tập trong mùa"
                            />
                            {editEpisodeForm.formState.errors.number && (
                                <div className="text-red-500">{editEpisodeForm.formState.errors.number.message}</div>
                            )}
                        </div>

                        {/* Episode Name */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700">
                                Tên tập
                            </label>
                            <input
                                {...editEpisodeForm.register('title')}
                                type="text"
                                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
                                placeholder="VD: Pilot, The Beginning, Final Episode"
                            />
                            {editEpisodeForm.formState.errors.title && (
                                <div className="text-red-500">{editEpisodeForm.formState.errors.title.message}</div>
                            )}
                        </div>

                        {/* Video ID */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700">
                                ID Video
                            </label>
                            <input
                                {...editEpisodeForm.register('url')}
                                type="text"
                                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
                                placeholder="VD: abc123, video-id-456, episode-001"
                            />
                            {editEpisodeForm.formState.errors.url && (
                                <div className="text-red-500">{editEpisodeForm.formState.errors.url.message}</div>
                            )}
                            <p className="text-gray-500 text-sm mt-1">
                                Nhập ID hoặc mã định danh của video
                            </p>
                        </div>

                        {/* Duration */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700">
                                Thời lượng
                            </label>
                            <input
                                {...editEpisodeForm.register('duration')}
                                type="text"
                                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                            {editEpisodeForm.formState.errors.duration && (
                                <div className="text-red-500">{editEpisodeForm.formState.errors.duration.message}</div>
                            )}
                            <p className="text-gray-500 text-sm mt-1">
                                Tính theo giây
                            </p>
                        </div>

                        {/* Opening end */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700">
                                Kết thúc intro
                            </label>
                            <input
                                {...editEpisodeForm.register('openingEnd')}
                                type="text"
                                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                            {editEpisodeForm.formState.errors.openingEnd && (
                                <div className="text-red-500">{editEpisodeForm.formState.errors.openingEnd.message}</div>
                            )}
                            <p className="text-gray-500 text-sm mt-1">
                                Tính theo giây
                            </p>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700">
                                Mô tả tập phim
                            </label>
                            <textarea
                                {...editEpisodeForm.register('description')}
                                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
                                rows={4}
                                placeholder="Mô tả nội dung, cốt truyện của tập phim này..."
                            />
                            {editEpisodeForm.formState.errors.description && (
                                <div className="text-red-500">{editEpisodeForm.formState.errors.description.message}</div>
                            )}
                        </div>

                        {/* Release Date */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700">
                                Ngày phát hành *
                            </label>
                            <input
                                {...editEpisodeForm.register("releaseDate")}
                                type="date"
                                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 border-gray-300 focus:ring-indigo-500`}
                            />
                            {editEpisodeForm.formState.errors.releaseDate && (
                                <div className="text-red-500">{editEpisodeForm.formState.errors.releaseDate.message}</div>
                            )}
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={() => { setEditEpisodeModalVisible(false) }}
                        type="button"
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        onClick={editEpisodeForm.handleSubmit(onEditEpisodeSubmit, (data) => {
                            console.log(data);
                        })}
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

export default EpisodeRow