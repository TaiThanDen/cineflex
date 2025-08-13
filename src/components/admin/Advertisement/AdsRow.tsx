import { getHirerById, updateAd } from "@/lib/api";
import ApiException from "@/lib/exceptions/ApiException";
import type { Advertisement } from "@/lib/types/Advertisement";
import type { AdvertisementCredentials } from "@/lib/types/AdvertisementCredentials";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, InputLabel, MenuItem, Select, TableCell, TableRow, TextField } from "@mui/material"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";

interface Props {
    advertisement: Advertisement,
    index: number
}

const adFormSchema = z.object({
    link: z.string().url({ message: 'Link không hợp lệ' }),
    image: z.string().url({ message: 'Link ảnh không hợp lệ' }),
    type: z.string().min(1, { message: 'Vui lòng chọn thể loại' }),
});

type AdForm = z.infer<typeof adFormSchema>;

const AdsRow = ({ advertisement, index }: Props) => {
    const queryClient = useQueryClient();
    const [editAdOpen, setEditAdOpen] = useState(false);

    const hirerResult = useQuery({
        queryKey: ["hirers", advertisement.hirer],
        queryFn: () => getHirerById(advertisement.hirer)
    })

    const editAdForm = useForm<AdForm>({
        resolver: zodResolver(adFormSchema),
        defaultValues: {
            image: advertisement.image,
            link: advertisement.link,
            type: `${advertisement.type}`
        }
    })

    const editAdMutation = useMutation({
        mutationFn: (data: AdvertisementCredentials) => updateAd(advertisement.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["advertisements"]
            })
        }
    })

    const enableAdMutation = useMutation({
        mutationFn: () => {
            const data: AdvertisementCredentials = {
                hirer: advertisement.hirer,
                image: advertisement.image,
                link: advertisement.link,
                type: +advertisement.type,
                enabled: true
            }

            return updateAd(advertisement.id, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["advertisements"]
            })
        }
    })

    const disableAdMutation = useMutation({
        mutationFn: () => {
            const data: AdvertisementCredentials = {
                hirer: advertisement.hirer,
                image: advertisement.image,
                link: advertisement.link,
                type: +advertisement.type,
                enabled: false
            }

            return updateAd(advertisement.id, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["advertisements"]
            })
        }
    })

    const onEditAdSubmit: SubmitHandler<AdForm> = async (data) => {
        try {
            const submitData: AdvertisementCredentials = {
                hirer: advertisement.hirer,
                image: data.image,
                link: data.link,
                type: +data.type,
                enabled: advertisement.enabled
            }


            const returned = await editAdMutation.mutateAsync(submitData);

            toast(`Đã sửa quảng cáo thành công: ${returned.id}`)
        }
        catch (e) {
            if (e instanceof ApiException) {
                toast(e.message)
                return
            }
            toast("Unxpected")
        }
        finally {
            setEditAdOpen(false);
            editAdForm.reset();
        }
    }

    return (
        <>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left">{index}</TableCell>
                <TableCell align="left">{advertisement.link}</TableCell>
                <TableCell align="left">{
                    ((!hirerResult.isLoading || hirerResult.isError)) && (
                        hirerResult.data!.alias
                    )
                }</TableCell>
                <TableCell align="left">{advertisement.enabled ? "Đang hoạt động" : "Đã ẩn"}</TableCell>
                <TableCell align="left">
                    <Button
                        onClick={() => {
                            setEditAdOpen(true)
                        }}
                    >
                        Chi tiết
                    </Button>
                </TableCell>
            </TableRow>

            <Dialog
                fullWidth
                maxWidth='md'
                open={editAdOpen}
                onClose={() => {
                    setEditAdOpen(false)
                }}
            >
                <DialogTitle>
                    Chỉnh sửa quảng cáo
                </DialogTitle>
                <DialogContent>
                    <form>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {/* Link */}
                            <TextField
                                label="Link quảng cáo"
                                fullWidth
                                {...editAdForm.register('link')}
                                error={!!editAdForm.formState.errors.link}
                                helperText={editAdForm.formState.errors.link?.message}
                            />

                            {/* Link */}
                            <TextField
                                label="Link ảnh"
                                fullWidth
                                {...editAdForm.register('image')}
                                error={!!editAdForm.formState.errors.image}
                                helperText={editAdForm.formState.errors.image?.message}
                            />


                            {/* Thể loại */}
                            <FormControl fullWidth error={!!editAdForm.formState.errors.type}>
                                <InputLabel>Loại quảng cáo</InputLabel>
                                <Controller
                                    control={editAdForm.control}
                                    name="type"
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Select label="Thể loại" {...field}>
                                            <MenuItem value="0">Banner</MenuItem>
                                            <MenuItem value="1">Popup</MenuItem>
                                            <MenuItem value="2">Pause</MenuItem>
                                        </Select>
                                    )}
                                />
                                <FormHelperText>{editAdForm.formState.errors.type?.message}</FormHelperText>
                            </FormControl>
                        </Box>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setEditAdOpen(false)
                    }}>
                        Trở lại
                    </Button>
                    {
                        advertisement.enabled ?
                            <Button
                                disabled={editAdForm.formState.isSubmitting && disableAdMutation.isPending && enableAdMutation.isPending}
                                onClick={async () => {
                                    try {
                                        const returned = await disableAdMutation.mutateAsync();

                                        toast(`Đã tắt quảng cáo thành công: ${returned.id}`)
                                    }
                                    catch (e) {
                                        if (e instanceof ApiException) {
                                            toast(e.message)
                                            return
                                        }
                                        toast("Unxpected")
                                    }
                                    finally {
                                        setEditAdOpen(false);
                                        editAdForm.reset();
                                    }
                                }}
                                variant="contained" color="error"
                            >
                                Tắt quảng cáo
                            </Button> : 
                            <Button
                                disabled={editAdForm.formState.isSubmitting && disableAdMutation.isPending && enableAdMutation.isPending}
                                onClick={async () => {
                                    try {
                                        const returned = await enableAdMutation.mutateAsync();

                                        toast(`Đã hiện quảng cáo thành công: ${returned.id}`)
                                    }
                                    catch (e) {
                                        if (e instanceof ApiException) {
                                            toast(e.message)
                                            return
                                        }
                                        toast("Unxpected")
                                    }
                                    finally {
                                        setEditAdOpen(false);
                                        editAdForm.reset();
                                    }
                                }}
                                variant="contained" color="success"
                            >
                                Hiện quảng cáo
                            </Button>
                    }
                    <Button disabled={editAdForm.formState.isSubmitting && disableAdMutation.isPending && enableAdMutation.isPending} onClick={editAdForm.handleSubmit(onEditAdSubmit)} type="submit" variant="contained">
                        Hoàn tất
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default AdsRow;