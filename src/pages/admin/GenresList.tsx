import { addGenre, getAllGenres } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

const addGenreSchema = z.object({
    name: z.string().min(5, "Tên thể loại phải có ít nhất 5 chữ")
})

type AddGenreFormField = z.infer<typeof addGenreSchema>

const GenresList = () => {
    const queryClient = useQueryClient();

    const addGenreForm = useForm<AddGenreFormField>({
        resolver: zodResolver(addGenreSchema)
    })

    const addGerneMutation = useMutation({
        mutationFn: addGenre,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["genres"]
            })
        }
    })

    const onAddGenreSubmit: SubmitHandler<AddGenreFormField> = async (data) => {
        try {
            await addGerneMutation.mutateAsync(data.name);
        }
        catch {
            toast("Vui lòng thử lại sau", {
                position: "bottom-center"
            });
        }
        finally {
            setOpen(false);
            toast("Thêm mới thành công", {
                position: "bottom-center"
            });
        }
    }

    const [open, setOpen] = useState(false);

    const allGenresResult = useQuery({
        queryKey: ["genres"],
        queryFn: () => getAllGenres()
    })

    if (allGenresResult.isLoading) {
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
    
    return <>
        <div className="w-full p-8">
            <div className="flex">
                <div className="text-2xl w-full">
                    Danh sách người dùng vip
                </div>
                <Button 
                    onClick={() => {
                        setOpen(true)
                    }}
                    className="w-50"
                >
                    Thêm thể loại
                </Button>
            </div>
            <div className="max-h-120 overflow-y-auto">
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">#</TableCell>
                                <TableCell align="left">Id</TableCell>
                                <TableCell align="left">Tên</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allGenresResult.data!.map((g, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell align="left">{index}</TableCell>
                                        <TableCell align="left">{g.id}</TableCell>
                                        <TableCell align="left">{g.name}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
        <Dialog 
            open={open}
            fullWidth
            maxWidth='lg'
            onClose={() => {
                setOpen(false)
            }}
        >
            <DialogTitle>Thêm thể loại phim</DialogTitle>
            <DialogContent>
                <form className="space-y-6 py-5">
                        <div>
                            <TextField
                                label="Tên thể loại"
                                fullWidth
                                {...addGenreForm.register('name')}
                                error={!!addGenreForm.formState.errors.name}
                                helperText={addGenreForm.formState.errors.name?.message}
                            />
                        </div>
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                    disabled={addGenreForm.formState.isSubmitting}
                    onClick={() => {
                        setOpen(false)
                    }}
                >
                    Đóng
                </Button>
                <Button
                    disabled={addGenreForm.formState.isSubmitting}
                    onClick={addGenreForm.handleSubmit(onAddGenreSubmit)}
                >
                    Thêm
                </Button>
            </DialogActions>
            
        </Dialog>
    </>
}

export default GenresList