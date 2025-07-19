import GenreDisplay from "@/examples/GenreDisplay";
import type { Episode } from "@/lib/types/Episode";
import type { Genre } from "@/lib/types/Genre";
import type { Season } from "@/lib/types/Season";
import type { Show } from "@/lib/types/Show";
import { Tab, TabGroup, TabList, TabPanels } from '@headlessui/react'
import React, { useState } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import SeasonTab from "./SeasonTab";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSeasonToShow, deleteShow, updateShow } from "@/lib/api";
import type { ShowCredentials } from "@/lib/types/ShowCredentials";
import { toast } from "react-toastify";
import ApiException from "@/lib/exceptions/ApiException";
import type { SeasonCredentials } from "@/lib/types/SeasonCredentials";
// import AddSeasonModal from "./AddSeasonModal";
// import EditSeasonModal from "./EditSeasonModal";
// import AddEpisodeModal from "./AddEpisodeModal";
// import EditEpisodeModal from "./EditEpisodeModal";
// import ConfirmDeleteModal from "@/components/admin/MovieManagerComponent/ConfirmDeleteModal.tsx";
// import EditMovieModal from "@/components/admin/MovieManagerComponent/EditMovieModal";
// import GenreDisplay from "../../../examples/GenreDisplay";
// import SeasonTabs from "./SeasonTabs";
// import { useEpisodeMutations } from "@/lib/hooks/useEpisodeMutations";
// import { useShowMutations } from "@/lib/hooks/useShowMutations";
// import { useSeasonMutations } from "@/lib/hooks/useSeasonMutations";

interface Props {
    movie: Show;
    seasons: Season[];
    episodes: Record<string, Episode[]>,
    genres: Genre[]
}

const editShowFormSchema = z.object({
    title: z.string(),
    poster: z.string().url(),
    description: z.string(),
    releaseDate: z.string(),
    ageRating: z.string(),
    isSeries: z.boolean(),
    onGoing: z.boolean()
})

const addSeasonFormSchema = z.object({
    title: z.string(),
    description: z.string(),
    releaseDate: z.string()
})

type EditShowField = z.infer<typeof editShowFormSchema>;
type AddSeasonField = z.infer<typeof addSeasonFormSchema>;

const MovieDetail: React.FC<Props> = ({
    movie,
    seasons,
    episodes,
    genres
}) => {
    const [addSeasonModalVisible, setAddSeasonModalVisible] = useState(false);
    const [editShowModalVisible, setEditShowModalVisible] = useState(false);
    const [deleteShowModalVisible, setDeleteShowModalVisible] = useState(false);

    const navigate = useNavigate()

    const queryClient = useQueryClient();

    const editShowForm = useForm<EditShowField>({
        resolver: zodResolver(editShowFormSchema),
        defaultValues: {
            title: movie.title,
            ageRating: movie.ageRating,
            description: movie.description,
            isSeries: movie.isSeries,
            onGoing: movie.onGoing,
            poster: movie.thumbnail,
            releaseDate: movie.releaseDate
        }
    })

    const addSeasonForm = useForm<AddSeasonField>({
        resolver: zodResolver(addSeasonFormSchema)
    })

    const editShowMutation =  useMutation({
        mutationFn: (data: ShowCredentials) => updateShow(movie.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["show", movie.id]
            })
        }
    })

    const addSeasonMutation = useMutation({
        mutationFn: (data: SeasonCredentials) => addSeasonToShow(movie.id, data),
        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ['seasons_of_show', movie.id],
            })
        }
    })

    const delteShowMutation = useMutation({
        mutationFn: () => deleteShow(movie.id),
        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ['show'],
            })

            navigate('/admin/movies')

        }
    })

    const onSubmitEditShow: SubmitHandler<EditShowField> = async (data) => {
        try {
            const submitData: ShowCredentials = {
                ageRating: data.ageRating,
                description: data.description,
                isSeries: data.isSeries,
                onGoing: data.onGoing,
                releaseDate: data.releaseDate,
                thumbnail: data.poster,
                title: data.title
            }

            const show = await editShowMutation.mutateAsync(submitData);

            toast(`Đã chỉnh sửa thành công ${show.title}`);
        }
        catch (e) {
            if (e instanceof ApiException) {
                toast(e.message);
                return
            }

            toast("Unexpected");
        }
        finally {
            setEditShowModalVisible(false)
        }
    }


    const onSubmitAddSeason: SubmitHandler<AddSeasonField> = async (data) => {
        try {
            const submitData: SeasonCredentials = {
                title: data.title,
                description: data.description,
                releaseDate: data.releaseDate
            }

            const season = await addSeasonMutation.mutateAsync(submitData);

            toast(`Đã chỉnh thêm season ${season.title}`);
        }
        catch (e) {
            if (e instanceof ApiException) {
                toast(e.message);
                return
            }

            toast("Unexpected");
        }
        finally {
            setAddSeasonModalVisible(false)
        }
    }

    const onSubmitDeleteShow = async () => {
        try {
            await delteShowMutation.mutateAsync()
        }
        catch (e) {
            if (e instanceof ApiException) {
                toast(e.message);
                return
            }

            toast("Unexpected");
        }
        finally {
            setAddSeasonModalVisible(false)
        }
    }
 
    return (
        <>
            <div className="container mx-auto py-8 flex h-full">
                {/* Left */}
                <div className="w-1/4 border-r p-6 flex flex-col gap-4">
                    <img
                        src={movie.thumbnail}
                        alt={movie.thumbnail}
                        className="w-70 h-auto object-cover rounded-xl mb-4"
                    />
                    <p className="text-2xl font-bold ">{movie.title}</p>
                    {/* Hiển thị genres/tags */}
                    <GenreDisplay
                        genres={genres}
                        maxDisplay={3}
                        className="mt-2 w-100"
                    />
                    <div>
                        <div className="font-bold text-sm mb-1 mt-2">Mô tả phim</div>
                        <div className="text-gray-600 text-sm">{movie.description}</div>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                        <Link
                            to="/admin/movies"
                            className="text-blue-500 hover:underline text-sm"
                        >
                            ← Quay lại
                        </Link>
                        <button
                            onClick={() => { setEditShowModalVisible(true) }}
                            className="text-sm px-2 py-1 text-gray-600 hover:text-indigo-600 border border-transparent hover:border-indigo-300 rounded transition"
                        >
                            ✏️ Chỉnh sửa
                        </button>
                    </div>
                </div>
                <div className="w-3/4 p-5">
                    <div className="w-full py-5 flex items-center justify-end">
                        <ButtonGroup color="info" variant="contained">
                            <Button
                                color="info"
                                onClick={() => { setAddSeasonModalVisible(true) }}
                            >
                                Thêm mùa
                            </Button>
                            <Button
                                onClick={() => { setDeleteShowModalVisible(true) }}
                                color="error"
                            >
                                Xóa phim
                            </Button>
                        </ButtonGroup>
                    </div>
                    <TabGroup>
                        <TabList className="flex gap-1 mb-4 border-b border-gray-300 overflow-x-auto">
                            {seasons.map((season) => (
                                <Tab key={season.id} className="border-transparent text-gray-600 hover:text-indigo-600 hover:bg-gray-50 px-4 py-2 border-b-2 font-semibold text-sm whitespace-nowrap transition-colors data-[selected]:border-indigo-600 data-[selected]:text-indigo-700 data-[selected]:bg-indigo-50">{season.title}</Tab>
                            ))}
                        </TabList>
                        <TabPanels>
                            {seasons.map((season) => (
                                <SeasonTab showId={movie.id} season={season} episodes={episodes[season.id]} />
                            ))}
                        </TabPanels>
                    </TabGroup>
                </div>
            </div>


            {/* Modal thêm mùa */}
            <Dialog
                onClose={() => { setAddSeasonModalVisible(false) }}
                open={addSeasonModalVisible}
                fullWidth
                maxWidth='lg'
            >
                <DialogTitle>
                    Thêm mùa
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <form className="space-y-6">


                            {/* Custom Title (for non-regular seasons) */}
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700">
                                    Tên tùy chỉnh
                                </label>
                                <input
                                    {...addSeasonForm.register("title")}
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="VD: Movie: Mugen Train, OVA: The Final Act"
                                />
                                {addSeasonForm.formState.errors.title && (
                                    <div className="text-red-500">{addSeasonForm.formState.errors.title.message}</div>
                                )}
                            </div>


                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700">
                                    Mô tả mùa phim
                                </label>
                                <textarea
                                    {...addSeasonForm.register("description")}
                                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                    placeholder="Mô tả nội dung, cốt truyện của mùa phim này..."
                                />
                                {addSeasonForm.formState.errors.description && (
                                    <div className="text-red-500">{addSeasonForm.formState.errors.description.message}</div>
                                )}
                            </div>

                            {/* Release Date */}
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700">
                                    Ngày phát hành
                                </label>
                                <input
                                    {...addSeasonForm.register("releaseDate")}
                                    type="date"
                                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                />
                                {addSeasonForm.formState.errors.releaseDate && (
                                    <div className="text-red-500">{addSeasonForm.formState.errors.releaseDate.message}</div>
                                )}

                            </div>


                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button
                        disabled={addSeasonForm.formState.isSubmitting}
                        onClick={() => {setAddSeasonModalVisible(false)}}
                        type="button"
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        disabled={addSeasonForm.formState.isSubmitting}
                        onClick={addSeasonForm.handleSubmit(onSubmitAddSeason)}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold disabled:opacity-50"
                    >
                        Thêm mùa
                    </button>
                </DialogActions>
            </Dialog>

            {/* Modal xóa phim */}
            <Dialog
                onClose={() => { setDeleteShowModalVisible(false) }}
                open={deleteShowModalVisible}
                fullWidth
                maxWidth='lg'
            >
                <DialogTitle>
                    Xóa phim
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Xác nhận xóa phim?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button
                        disabled={delteShowMutation.isPending}
                        onClick={() => {
                            setDeleteShowModalVisible(false)
                        }}
                        type="button"
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        onClick={onSubmitDeleteShow}
                        disabled={delteShowMutation.isPending}
                        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:opacity-50"
                    >
                        Xóa phim
                    </button>
                </DialogActions>
            </Dialog>


            {/* Modal sửa phim */}
            <Dialog
                onClose={() => { setEditShowModalVisible(false) }}
                open={editShowModalVisible}
                fullWidth
                maxWidth='lg'
            >
                <DialogTitle>
                    Chỉnh sửa phim
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <form className="space-y-6">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700">
                                    Tên phim *
                                </label>
                                <input
                                    {...editShowForm.register("title")}
                                    type="text"
                                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 border-gray-300 focus:ring-indigo-500`}
                                    placeholder="Nhập tên phim..."
                                />
                                {editShowForm.formState.errors.title && (
                                    <div className="text-red-500">{editShowForm.formState.errors.title.message}</div>
                                )}
                            </div>

                            {/* Thumbnail */}
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700">
                                    URL Poster *
                                </label>
                                <input
                                    {...editShowForm.register("poster")}
                                    type="url"
                                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 border-gray-300 focus:ring-indigo-500`}
                                    placeholder="https://example.com/poster.jpg"
                                />
                                {editShowForm.formState.errors.poster && (
                                    <div className="text-red-500">{editShowForm.formState.errors.poster.message}</div>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700">
                                    Mô tả phim *
                                </label>
                                <textarea
                                    {...editShowForm.register("description")}
                                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 border-gray-300 focus:ring-indigo-500`}
                                    rows={4}
                                    placeholder="Mô tả nội dung, cốt truyện của phim..."
                                />
                                {editShowForm.formState.errors.description && (
                                    <div className="text-red-500">{editShowForm.formState.errors.description.message}</div>
                                )}
                                <p className="text-gray-500 text-sm mt-1">
                                    0/500 ký tự
                                </p>
                            </div>

                            {/* Release Date */}
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700">
                                    Ngày phát hành *
                                </label>
                                <input
                                    {...editShowForm.register("releaseDate")}
                                    type="date"
                                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 border-gray-300 focus:ring-indigo-500`}
                                />
                                {editShowForm.formState.errors.releaseDate && (
                                    <div className="text-red-500">{editShowForm.formState.errors.releaseDate.message}</div>
                                )}
                            </div>

                            {/* Age Rating */}
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700">
                                    Độ tuổi
                                </label>
                                <select
                                    {...editShowForm.register("ageRating")}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2  focus:ring-indigo-500"
                                >
                                    <option value="G">G - Phù hợp với mọi lứa tuổi</option>
                                    <option value="PG">PG - Cần sự hướng dẫn của cha mẹ</option>
                                    <option value="13+">13+ - Trên 13 tuổi</option>
                                    <option value="16+">16+ - Trên 16 tuổi</option>
                                    <option value="18+">18+ - Người lớn</option>
                                </select>
                                {editShowForm.formState.errors.ageRating && (
                                    <div className="text-red-500">{editShowForm.formState.errors.ageRating.message}</div>
                                )}
                            </div>

                            {/* Checkboxes */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-3">
                                    <input
                                        {...editShowForm.register("isSeries")}
                                        type="checkbox"
                                        id="isSeries"
                                    />
                                    <label htmlFor="isSeries" className="text-sm font-medium text-gray-700">
                                        Là series (có nhiều tập)
                                    </label>
                                    {editShowForm.formState.errors.isSeries && (
                                        <div className="text-red-500">{editShowForm.formState.errors.isSeries.message}</div>
                                    )}
                                </div>

                                <div className="flex items-center space-x-3">
                                    <input
                                        {...editShowForm.register("onGoing")}
                                        type="checkbox"
                                        id="onGoing"
                                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    />
                                    <label htmlFor="onGoing" className="text-sm font-medium text-gray-700">
                                        Đang phát sóng
                                    </label>
                                    {editShowForm.formState.errors.onGoing && (
                                        <div className="text-red-500">{editShowForm.formState.errors.onGoing.message}</div>
                                    )}
                                </div>
                            </div>



                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={() => {
                            setEditShowModalVisible(false);
                            editShowForm.reset();
                        }}
                        disabled={editShowForm.formState.isSubmitting}
                        type="button"
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        disabled={editShowForm.formState.isSubmitting}
                        onClick={editShowForm.handleSubmit(onSubmitEditShow)}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold disabled:opacity-50"
                    >
                        Sửa phim
                    </button>
                </DialogActions>
            </Dialog>

        </>
    );
};

export default MovieDetail;
