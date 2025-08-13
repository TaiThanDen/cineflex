import { useEffect, useState } from 'react';
import {
    Box, Button, Step, StepLabel, Stepper, Typography,
    Pagination, TextField, InputLabel, MenuItem, Select, FormControl, FormHelperText,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/material';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createAd, getAllHirers } from '@/lib/api';
import { toast } from 'react-toastify';
import ApiException from '@/lib/exceptions/ApiException';
import type { AdvertisementCredentials } from '@/lib/types/AdvertisementCredentials';

const steps = ['Chọn nhà cung cấp', 'Nhập thông tin'];

    // image: z
    //     .custom<File>((v) => v instanceof File, {
    //         message: 'Vui lòng chọn hình ảnh',
    //     })


const adFormSchema = z.object({
    link: z.string().url({ message: 'Link không hợp lệ' }),
    image: z.string().url({ message: 'Link ảnh không hợp lệ' }),
    type: z.string().min(1, { message: 'Vui lòng chọn thể loại' }),
});

type AdForm = z.infer<typeof adFormSchema>;

const AdsModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0);

    const [activeStep, setActiveStep] = useState(0);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const hirerResult = useQuery({
        queryKey: ["hirers", page],
        queryFn: () => getAllHirers(page - 1, 5)
    })

    const adMutation = useMutation({
        mutationFn: createAd,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["advertisements"]
            })
        }
    });

    useEffect(() => {
        setTotalPage(hirerResult.data?.totalPage ?? 1)
    }, [hirerResult])

    const adForm = useForm<AdForm>({
        resolver: zodResolver(adFormSchema),
    });

    const handleSelectItem = (index: string) => {
        setSelectedItem(index);
    };

    const handleChangePage = (_: unknown, value: number) => {
        setPage(value);
    };

    const handleBack = () => setActiveStep((prev) => prev - 1);

    const handleNext = async () => {
        if (activeStep === 0 && selectedItem !== null) {
            setActiveStep(1);
        }
    };

    const onSubmit : SubmitHandler<AdForm> = async (data) => {
        try {
            const submitData: AdvertisementCredentials = {
                hirer: selectedItem!,
                image: data.image,
                link: data.link,
                type: +data.type
            }

            adMutation.mutateAsync(submitData);
            toast(`Đã tạo quảng cáo`);
            setSelectedItem(null);
            setActiveStep(0);
            adForm.reset();
        }
        catch (e) {
            if (e instanceof ApiException) {
                toast(e.message);
                return
            }

            toast("Unexpected");
        }
        finally {
            onClose();
        }
    };

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

    const stepButton = [
        () => {
            return (
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant="contained"
                        onClick={handleNext}
                        disabled={selectedItem === null}
                    >
                        Tiếp tục
                    </Button>
                </Box>
            )
        },
        () => {
            return (
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Button onClick={handleBack}>Trở lại</Button>
                    <Button disabled={adForm.formState.isSubmitting} onClick={adForm.handleSubmit(onSubmit)} type="submit" variant="contained">
                        Hoàn tất
                    </Button>
                </Box>
            )
        }
    ] 

    const renderStepOne = () => (
        <>

            <Typography variant="body1">Chọn nhà cung cấp</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                {hirerResult.data!.data.map((hirer) => (
                    <Button
                        key={hirer.id}
                        variant={hirer.id === selectedItem ? 'contained' : 'outlined'}
                        onClick={() => handleSelectItem(hirer.id)}
                    >
                        {hirer.alias}
                    </Button>
                ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination count={totalPage + 1} page={page} onChange={handleChangePage} />
            </Box>
        </>
    )

    const renderStepTwo = () => (
        <form>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Link */}
                <TextField
                    label="Link quảng cáo"
                    fullWidth
                    {...adForm.register('link')}
                    error={!!adForm.formState.errors.link}
                    helperText={adForm.formState.errors.link?.message}
                />

                {/* Link */}
                <TextField
                    label="Link ảnh"
                    fullWidth
                    {...adForm.register('image')}
                    error={!!adForm.formState.errors.image}
                    helperText={adForm.formState.errors.image?.message}
                />


                {/* Thể loại */}
                <FormControl fullWidth error={!!adForm.formState.errors.type}>
                    <InputLabel>Loại quảng cáo</InputLabel>
                    <Controller
                        control={adForm.control}
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
                    <FormHelperText>{adForm.formState.errors.type?.message}</FormHelperText>
                </FormControl>
            </Box>
        </form>
    );

    return (
        <Dialog
            fullWidth
            maxWidth='md'
            open={open}
            onClose={onClose}
        >
            <DialogTitle>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={index}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </DialogTitle>
            <DialogContent>
                {activeStep === 0 && renderStepOne()}
                {activeStep === 1 && renderStepTwo()}
            </DialogContent>
            <DialogActions>
                {stepButton[activeStep]()}
            </DialogActions>
        </Dialog>
    );
};

export default AdsModal;
