import { getHirerById } from "@/lib/api";
import type { Advertisement } from "@/lib/types/Advertisement";
import { Button, TableCell, TableRow } from "@mui/material"
import { useQuery } from "@tanstack/react-query";

interface Props {
    advertisement: Advertisement,
    index: number
}

const AdsRow = ({ advertisement, index } : Props ) => {
    const hirerResult = useQuery({
        queryKey: ["hirers", advertisement.hirer],
        queryFn: () => getHirerById(advertisement.hirer)
    })

    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell align="left">{index}</TableCell>
            <TableCell align="left">{advertisement.link}</TableCell>
            <TableCell align="left">{
                ((!hirerResult.isLoading || hirerResult.isError)) && (
                    hirerResult.data!.alias
                )
            }</TableCell>
            <TableCell align="left">{advertisement.enabled?"Đang hoạt động":"Đã ẩn"}</TableCell>
            <TableCell align="left">
                <Button>Chi tiết</Button>
            </TableCell>
        </TableRow>
    )
}
export default AdsRow;