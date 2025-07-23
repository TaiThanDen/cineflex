import { useState } from 'react';
import {
    Box, Button, Step, StepLabel, Stepper, Typography,
    Pagination, TextField, InputLabel, MenuItem, Select, FormControl, FormHelperText,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
    const [activeStep, setActiveStep] = useState(0);
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const [page, setPage] = useState(1);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<AdForm>({
        resolver: zodResolver(adFormSchema),
    });

    const handleSelectItem = (index: number) => {
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

    const onSubmit = () => {
        onClose();
        setActiveStep(0);
        setSelectedItem(null);
        reset();
    };

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
                    <Button type="submit" variant="contained">
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
                {[...Array(5)].map((_, index) => (
                    <Button
                        variant={selectedItem === index ? 'contained' : 'outlined'}
                        onClick={() => handleSelectItem(index)}
                    >
                        Quảng cáo #{index + 1 + (page - 1) * 5}
                    </Button>
                ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination count={3} page={page} onChange={handleChangePage} />
            </Box>
        </>
    );

    const renderStepTwo = () => (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Link */}
                <TextField
                    label="Link quảng cáo"
                    fullWidth
                    {...register('link')}
                    error={!!errors.link}
                    helperText={errors.link?.message}
                />

                {/* Link */}
                <TextField
                    label="Link ảnh"
                    fullWidth
                    {...register('image')}
                    error={!!errors.image}
                    helperText={errors.image?.message}
                />


                {/* Thể loại */}
                <FormControl fullWidth error={!!errors.type}>
                    <InputLabel>Loại quảng cáo</InputLabel>
                    <Controller
                        control={control}
                        name="type"
                        defaultValue=""
                        render={({ field }) => (
                            <Select label="Thể loại" {...field}>
                                <MenuItem value="0">Game</MenuItem>
                                <MenuItem value="1">Công nghệ</MenuItem>
                                <MenuItem value="2">Ẩm thực</MenuItem>
                            </Select>
                        )}
                    />
                    <FormHelperText>{errors.type?.message}</FormHelperText>
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
