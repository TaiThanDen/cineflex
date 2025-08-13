import { addGenresToShow, getAllGenres } from '@/lib/api';
import ApiException from '@/lib/exceptions/ApiException';
import type { Genre } from '@/lib/types/Genre';
import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface Props {
    onChange: (_: Genre[]) => void;
    value: Genre[];
    showId: string
}

const GenreField = ({ onChange, value, showId } : Props) => {
    const queryClient = useQueryClient();

    const allGenresResult = useQuery({
        queryKey: ["genres"],
        queryFn: getAllGenres
    })

    const addGenresMutate = useMutation({
        mutationFn: (data: string[]) => addGenresToShow(showId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["genres_of_show", showId]
            })
        }
    })

    const onSubmit = async () => {
        try {
            const data = value.map((v) => {
                return v.id
            })
            await addGenresMutate.mutateAsync(data)

            toast("Đã sửa thể loại");
        }
        catch (e) {
            if (e instanceof ApiException) {
                toast(e.message);
                return
            }

            toast("Unexpected");
        }
    }

    return (
        <>
        <Autocomplete
            multiple
            loading={allGenresResult.isLoading}
            id="tags-standard"
            options={allGenresResult.data ?? []}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                />
            )}
            onChange={(_, data) => {
                if (onChange)
                onChange(data)
            }}
            value={value}
        />
        <Button onClick={onSubmit} fullWidth>Lưu</Button>
        </>
    )
}

export default GenreField;