import { useState } from 'react';
import {
    Box, Button, Modal, Step, StepLabel, Stepper, Typography,
    Pagination, Tooltip, TextField, InputLabel, MenuItem, Select, FormControl, FormHelperText
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const steps = ['Chọn quảng cáo', 'Nhập thông tin'];

const adFormSchema = z.object({
    link: z.string().url({ message: 'Link không hợp lệ' }),
    image: z
        .custom<File>((v) => v instanceof File, {
            message: 'Vui lòng chọn hình ảnh',
        }),
    category: z.string().min(1, { message: 'Vui lòng chọn thể loại' }),
});

type AdForm = z.infer<typeof adFormSchema>;

const AdsModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const [page, setPage] = useState(1);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm<AdForm>({
        resolver: zodResolver(adFormSchema),
    });

    const handleSelectItem = (index: number) => {
        setSelectedItem(index);
    };

    const handleChangePage = (_: any, value: number) => {
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
        setPreviewImage(null);
        reset();
    };

    const renderStepOne = () => (
        <>
            <Typography variant="body1">Chọn quảng cáo:</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                {[...Array(5)].map((_, index) => (
                    <Tooltip title="Tiếp theo" placement="right" key={index}>
                        <Button
                            variant={selectedItem === index ? 'contained' : 'outlined'}
                            onClick={() => handleSelectItem(index)}
                        >
                            Quảng cáo #{index + 1 + (page - 1) * 5}
                        </Button>
                    </Tooltip>
                ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination count={5} page={page} onChange={handleChangePage} />
            </Box>
        </>
    )

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

                {/* Upload hình ảnh */}
                <Button variant="outlined" component="label">
                    Chọn hình ảnh
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setValue('image', file);
                                setPreviewImage(URL.createObjectURL(file));
                            }
                        }}
                    />
                </Button>
                {errors.image && (
                    <FormHelperText error>{errors.image.message?.toString()}</FormHelperText>
                )}

                {previewImage && (
                    <img src={previewImage} alt="Preview" style={{ width: 200, borderRadius: 8 }} />
                )}

                {/* Thể loại */}
                <FormControl fullWidth error={!!errors.category}>
                    <InputLabel>Thể loại</InputLabel>
                    <Controller
                        control={control}
                        name="category"
                        defaultValue=""
                        render={({ field }) => (
                            <Select label="Thể loại" {...field}>
                                <MenuItem value="game">Game</MenuItem>
                                <MenuItem value="tech">Công nghệ</MenuItem>
                                <MenuItem value="food">Ẩm thực</MenuItem>
                            </Select>
                        )}
                    />
                    <FormHelperText>{errors.category?.message}</FormHelperText>
                </FormControl>
            </Box>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={handleBack}>Trở lại</Button>
                <Button type="submit" variant="contained">
                    Hoàn tất
                </Button>
            </Box>
        </form>
    );

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={index}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Box sx={{ mt: 3 }}>
                    {activeStep === 0 && renderStepOne()}
                    {activeStep === 1 && renderStepTwo()}
                </Box>

                {activeStep === 0 && (
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            onClick={handleNext}
                            disabled={selectedItem === null}
                        >
                            Tiếp tục
                        </Button>
                    </Box>
                )}
            </Box>
        </Modal>
    );
};

export default AdsModal;
