import MovieBox from "@/components/admin/MovieManagerComponent/MovieBox";
import { addShow, getAllShows } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { FaSearch } from "react-icons/fa";
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from "react";
import z from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ShowCredentials } from "@/lib/types/ShowCredentials";
import { toast } from "react-toastify";
import ApiException from "@/lib/exceptions/ApiException";
import Pagination from '@mui/material/Pagination';

const schema = z.object({
    title: z.string(),
    poster: z.string().url(),
    description: z.string(),
    releaseDate: z.string(),
    ageRating: z.string(),
    isSeries: z.boolean(),
    onGoing: z.boolean()
});

type FormFields = z.infer<typeof schema>;

const ShowAdminPage = () => {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    
    const queryClient = useQueryClient();


    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const showResult = useQuery({
        queryKey: ["show", page],
        queryFn: () => getAllShows(page - 1, 8),
        staleTime: Infinity
    })


    useEffect(() => {
        setTotalPage((showResult.data?.totalPage ?? 0) + 1)
    }, [showResult])

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            const submitData: ShowCredentials = {
                title: data.title,
                thumbnail: data.poster,
                ageRating: data.ageRating,
                description: data.description,
                isSeries: data.isSeries,
                onGoing: data.onGoing,
                releaseDate: data.releaseDate.toString()
            }
            const show = await showSubmit(submitData)

            toast(`Add show ${show.title} succesfully`)
            setOpen(false)
        }
        catch (e) {
            if (e instanceof ApiException) {
                toast(e.message);
                return
            }

            toast("Unexpected");
        }
    }

    const { mutateAsync: showSubmit } = useMutation({
        mutationFn: addShow,
        onSuccess: () => {
            setTotalPage((showResult.data?.totalPage ?? 0) + 1)
            queryClient.invalidateQueries({queryKey: ["show"]});
        }
    });

    if (showResult.isLoading) {
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
    if (showResult.isError) {
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
        <div className="container mx-auto p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h1 className="text-3xl font-bold">Quản lý phim</h1>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    {/* Tìm kiếm */}
                    {/* <div className="relative w-full max-w-md flex-1">
                        <input
                            type="text"
                            className="w-full bg-transparent placeholder:text-slate-400 text-black text-sm border border-slate-400 rounded-full pl-4 pr-12 py-2 transition duration-300 focus:outline-none focus:border-indigo-400 hover:border-indigo-300 shadow-sm focus:shadow-lg"
                            placeholder="Tìm phim bạn chỉnh sửa..."
                        />
                        <button
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-indigo-600 hover:bg-indigo-700 transition px-3 py-1 rounded-full text-sm shadow"
                        >
                            <FaSearch />
                        </button>
                    </div> */}

                    {/* Nút thêm phim */}
                    <button
                        onClick={handleClickOpen}
                        className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 font-semibold whitespace-nowrap"
                    >
                        + Thêm phim
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                {showResult!.data?.data.map((show, index) => {
                    return (
                        <MovieBox
                            key={index}
                            movie={show}
                            onClick={() => { }}
                        />
                    )
                })}
            </div>
            <Pagination 
                className="flex items-center justify-center" 
                count={totalPage}
                page={page}
                onChange={(_, p) => {
                    setPage(p);
                }}
            />


            <Dialog
                open={open}
                fullWidth
                maxWidth='lg'
                onClose={handleClose}
            >
                <DialogTitle>
                    Thêm phim
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
                                    {...register("title")}
                                    type="text"
                                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 border-gray-300 focus:ring-indigo-500`}
                                    placeholder="Nhập tên phim..."
                                />
                                {errors.title && (
                                    <div className="text-red-500">{errors.title.message}</div>
                                )}
                            </div>

                            {/* Thumbnail */}
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700">
                                    URL Poster *
                                </label>
                                <input
                                    {...register("poster")}
                                    type="url"
                                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 border-gray-300 focus:ring-indigo-500`}
                                    placeholder="https://example.com/poster.jpg"
                                />
                                {errors.poster && (
                                    <div className="text-red-500">{errors.poster.message}</div>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700">
                                    Mô tả phim *
                                </label>
                                <textarea
                                    {...register("description")}
                                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 border-gray-300 focus:ring-indigo-500`}
                                    rows={4}
                                    placeholder="Mô tả nội dung, cốt truyện của phim..."
                                />
                                {errors.description && (
                                    <div className="text-red-500">{errors.description.message}</div>
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
                                    {...register("releaseDate")}
                                    type="date"
                                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 border-gray-300 focus:ring-indigo-500`}
                                />
                                {errors.releaseDate && (
                                    <div className="text-red-500">{errors.releaseDate.message}</div>
                                )}
                            </div>

                            {/* Age Rating */}
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700">
                                    Độ tuổi
                                </label>
                                <select
                                    {...register("ageRating")}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2  focus:ring-indigo-500"
                                >
                                    <option value="G">G - Phù hợp với mọi lứa tuổi</option>
                                    <option value="PG">PG - Cần sự hướng dẫn của cha mẹ</option>
                                    <option value="13+">13+ - Trên 13 tuổi</option>
                                    <option value="16+">16+ - Trên 16 tuổi</option>
                                    <option value="18+">18+ - Người lớn</option>
                                </select>
                                {errors.ageRating && (
                                    <div className="text-red-500">{errors.ageRating.message}</div>
                                )}
                            </div>

                            {/* Checkboxes */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-3">
                                    <input
                                        {...register("isSeries")}
                                        type="checkbox"
                                        id="isSeries"
                                    />
                                    <label htmlFor="isSeries" className="text-sm font-medium text-gray-700">
                                        Là series (có nhiều tập)
                                    </label>
                                    {errors.isSeries && (
                                        <div className="text-red-500">{errors.isSeries.message}</div>
                                    )}
                                </div>

                                <div className="flex items-center space-x-3">
                                    <input
                                        {...register("onGoing")}
                                        type="checkbox"
                                        id="onGoing"
                                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    />
                                    <label htmlFor="onGoing" className="text-sm font-medium text-gray-700">
                                        Đang phát sóng
                                    </label>
                                    {errors.onGoing && (
                                        <div className="text-red-500">{errors.onGoing.message}</div>
                                    )}
                                </div>
                            </div>



                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={handleClose}
                        disabled={isSubmitting}
                        type="button"
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold disabled:opacity-50"
                    >
                        Thêm phim
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ShowAdminPage;