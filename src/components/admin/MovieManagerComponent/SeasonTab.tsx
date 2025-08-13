import type { Episode } from "@/lib/types/Episode";
import type { Season } from "@/lib/types/Season";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EpisodeRow from "./EpisodeRow";
import { TabPanel } from '@headlessui/react';
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEpisodeToSeason, deleteSeason, updateSeason } from "@/lib/api";
import type { EpisodeCredentials } from "@/lib/types/EpisodeCredentials";
import ApiException from "@/lib/exceptions/ApiException";
import { toast } from "react-toastify";
import type { SeasonCredentials } from "@/lib/types/SeasonCredentials";

interface Props {
    season: Season,
    episodes: Episode[]
}

const editSeasonFormSchema = z.object({
    title: z.string(),
    description: z.string(),
    releaseDate: z.string()
})


const addEpisodeFormSchema = z.object({
    number: z.string().regex(/^\d+(\.\d)?$/, "Số tập phim phải là số"),
    title: z.string(),
    url: z.string(),
    duration: z.string().regex(/^\d+?$/, "Thời lượng phim phải là số"),
    releaseDate: z.string(),
    description: z.string(),
    openingEnd: z.string().regex(/^\d+?$/, "Thời lượng phim phải là số")
})

type EditSeasonField = z.infer<typeof editSeasonFormSchema>;
type AddEpisodeField = z.infer<typeof addEpisodeFormSchema>;

const SeasonTab = ({ season, episodes }: Props) => {
    const [editSeasonModalVisible, setEditSeasonModalVisible] = useState(false);
    const [addEpisodeModalVisible, setAddEpisodeModalVisible] = useState(false);
    const [deleteSeasonModalVisible, setDeleteSeasonModalVisible] = useState(false);

    const queryClient = useQueryClient();

    const editSeasonForm = useForm<EditSeasonField>({
        resolver: zodResolver(editSeasonFormSchema),
        defaultValues: {
            description: season.description,
            title: season.title,
            releaseDate: season.releaseDate
        }
    });

    const addEpisodeForm = useForm<AddEpisodeField>({
        resolver: zodResolver(addEpisodeFormSchema)
    })

    const editSeasonMutation = useMutation({
        mutationFn: (data: SeasonCredentials) => updateSeason(season.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['seasons_of_show', season.show]
            })
        }
    });

    const addEpisodeMutation = useMutation({
        mutationFn: (data: EpisodeCredentials) => addEpisodeToSeason(season.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['episodes_of_season', season.id]
            })
        }
    })

    const deleteSeasonMutation = useMutation({
        mutationFn: () => deleteSeason(season.id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['seasons_of_show', season.show]
            })
        }

    })

    const onSubmitDeleteSeason = async () => {
        try {
            await deleteSeasonMutation.mutateAsync()
        }
        catch (e) {
            if (e instanceof ApiException) {
                toast(e.message);
                return
            }

            toast("Unexpected");
        }
        finally {
            setDeleteSeasonModalVisible(false)
        }
    }

    const onEditEpisodeSubmit: SubmitHandler<EditSeasonField> = async (data) => {
        console.log(data);
        try {
            const submitData: SeasonCredentials = {
                description: data.description,
                releaseDate: data.releaseDate,
                title: data.title
            } 

            const season = await editSeasonMutation.mutateAsync(submitData)

            toast(`Đã sửa mùa thành công: ${season.title}`)
        }
        catch (e) {
            if (e instanceof ApiException) {
                toast(e.message)
            }
            toast("Unxpected")
        }
        finally {
            setEditSeasonModalVisible(false);
            editSeasonForm.reset();
        }
    }

    const onAddEpisodeSubmit: SubmitHandler<AddEpisodeField> = async (data) => {
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


            const episode = await addEpisodeMutation.mutateAsync(submitData);

            toast(`Đã thêm tập phim thành công: ${episode.title}`)
        }
        catch (e) {
            if (e instanceof ApiException) {
                toast(e.message)
            }
            toast("Unxpected")
        }
        finally {
            setAddEpisodeModalVisible(false);
            addEpisodeForm.reset();
        }
    }


    return (
        <>
            <TabPanel>
                <div className="flex w-full">
                    <div className="w-full">
                        <div className="font-bold text-2xl">{season.title}</div>
                        <div className="line-clamp-3 text-gray-600">{season.description}</div>
                        <div className="text-sm text-gray-400">Phát hành {season.releaseDate}</div>
                    </div>
                    <div className="w-full items-end justify-end flex">
                        <ButtonGroup color="info" variant="contained" orientation="vertical">
                            <Button onClick={() => { setEditSeasonModalVisible(true) }} color="warning">chỉnh sửa</Button>
                            <Button onClick={() => { setAddEpisodeModalVisible(true) }} color="info">Thêm tập</Button>
                            <Button onClick={() => { setDeleteSeasonModalVisible(true) }} color="error">Xóa</Button>
                        </ButtonGroup>
                    </div>
                </div>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">#</TableCell>
                                <TableCell align="left">Tên tập</TableCell>
                                <TableCell align="left">URL</TableCell>
                                <TableCell align="left">Thời lượng</TableCell>
                                <TableCell align="left">Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {episodes.map((e, index) => (
                                <EpisodeRow episode={e} index={index} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>

            {/* Modal sửa mùa */}
            <Dialog
                onClose={() => { setEditSeasonModalVisible(false) }}
                open={editSeasonModalVisible}
                fullWidth
                maxWidth='lg'
            >
                <DialogTitle>
                    Sửa mùa
                </DialogTitle>
                <DialogContent>
                    <form className="space-y-6">


                        {/* Custom Title (for non-regular seasons) */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700">
                                Tên tùy chỉnh
                            </label>
                            <input
                                {...editSeasonForm.register('title')}
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="VD: Movie: Mugen Train, OVA: The Final Act"
                            />
                            {editSeasonForm.formState.errors.title && (
                                <div className="text-red-500">{editSeasonForm.formState.errors.title.message}</div>
                            )}
                        </div>


                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700">
                                Mô tả mùa phim
                            </label>
                            <textarea
                                {...editSeasonForm.register('description')}
                                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                placeholder="Mô tả nội dung, cốt truyện của mùa phim này..."
                            />
                            {editSeasonForm.formState.errors.description && (
                                <div className="text-red-500">{editSeasonForm.formState.errors.description.message}</div>
                            )}
                        </div>

                        {/* Release Date */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700">
                                Ngày phát hành
                            </label>
                            <input
                                {...editSeasonForm.register('releaseDate')}
                                type="date"
                                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                            />
                            {editSeasonForm.formState.errors.releaseDate && (
                                <div className="text-red-500">{editSeasonForm.formState.errors.releaseDate.message}</div>
                            )}
                        </div>


                    </form>
                </DialogContent>
                <DialogActions>
                    <button
                        type="button"
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        disabled={editSeasonForm.formState.isSubmitting}
                        onClick={editSeasonForm.handleSubmit(onEditEpisodeSubmit)}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold disabled:opacity-50"
                    >
                        Xác nhận
                    </button>
                </DialogActions>
            </Dialog>

            {/* Modal thêm tập phim */}
            <Dialog
                open={addEpisodeModalVisible}
                onClose={() => { setAddEpisodeModalVisible(false) }}
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
                                {...addEpisodeForm.register('number')}
                                type="text"
                                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
                                placeholder="Số tập trong mùa"
                            />
                            {addEpisodeForm.formState.errors.number && (
                                <div className="text-red-500">{addEpisodeForm.formState.errors.number.message}</div>
                            )}
                        </div>

                        {/* Episode Name */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700">
                                Tên tập
                            </label>
                            <input
                                {...addEpisodeForm.register('title')}
                                type="text"
                                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
                                placeholder="VD: Pilot, The Beginning, Final Episode"
                            />
                            {addEpisodeForm.formState.errors.title && (
                                <div className="text-red-500">{addEpisodeForm.formState.errors.title.message}</div>
                            )}
                        </div>

                        {/* Video ID */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700">
                                ID Video
                            </label>
                            <input
                                {...addEpisodeForm.register('url')}
                                type="text"
                                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
                                placeholder="VD: abc123, video-id-456, episode-001"
                            />
                            {addEpisodeForm.formState.errors.url && (
                                <div className="text-red-500">{addEpisodeForm.formState.errors.url.message}</div>
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
                                {...addEpisodeForm.register('duration')}
                                type="text"
                                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                            {addEpisodeForm.formState.errors.duration && (
                                <div className="text-red-500">{addEpisodeForm.formState.errors.duration.message}</div>
                            )}
                            <p className="text-gray-500 text-sm mt-1">
                                Tính theo giây
                            </p>
                        </div>

                        {/* Duration */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700">
                                Kết thúc intro
                            </label>
                            <input
                                {...addEpisodeForm.register('openingEnd')}
                                type="text"
                                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                            {addEpisodeForm.formState.errors.openingEnd && (
                                <div className="text-red-500">{addEpisodeForm.formState.errors.openingEnd.message}</div>
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
                                {...addEpisodeForm.register('description')}
                                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
                                rows={4}
                                placeholder="Mô tả nội dung, cốt truyện của tập phim này..."
                            />
                            {addEpisodeForm.formState.errors.description && (
                                <div className="text-red-500">{addEpisodeForm.formState.errors.description.message}</div>
                            )}
                        </div>

                        {/* Release Date */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700">
                                Ngày phát hành *
                            </label>
                            <input
                                {...addEpisodeForm.register("releaseDate")}
                                type="date"
                                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 border-gray-300 focus:ring-indigo-500`}
                            />
                            {addEpisodeForm.formState.errors.releaseDate && (
                                <div className="text-red-500">{addEpisodeForm.formState.errors.releaseDate.message}</div>
                            )}
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={() => { setAddEpisodeModalVisible(false) }}
                        type="button"
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        onClick={addEpisodeForm.handleSubmit(onAddEpisodeSubmit, (data) => {
                            console.log(data);
                        })}
                        type="button"
                        className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold disabled:opacity-50"
                    >
                        Xác nhận
                    </button>
                </DialogActions>
            </Dialog>


            {/* Modal xóa mùa */}
            <Dialog
                open={deleteSeasonModalVisible}
                onClose={() => { setDeleteSeasonModalVisible(false) }}
                fullWidth
                maxWidth='lg'
            >
                <DialogTitle>
                    Xóa mùa
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Xác nhận xóa mùa?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button
                        disabled={deleteSeasonMutation.isPending}
                        onClick={() => {setDeleteSeasonModalVisible(false)}}
                        type="button"
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        disabled={deleteSeasonMutation.isPending}
                        onClick={onSubmitDeleteSeason}
                        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:opacity-50"
                    >
                        Xác nhận
                    </button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default SeasonTab;