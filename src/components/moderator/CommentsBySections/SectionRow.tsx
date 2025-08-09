import type { CommentSection } from "@/lib/types/CommentSection"
import { TableRow, TableCell } from "@mui/material"
import { Link } from "react-router"

interface Props {
    section: CommentSection,
    index: number
}


const SectionRow = ({ section, index }: Props) => {
    return <>
        <TableRow className="bg-gray-50">
            <TableCell className="py-2 px-3 font-bold">{index}</TableCell>
            <TableCell className="py-2 px-3 font-bold">{section.id}</TableCell>
            <TableCell className="py-2 px-3 font-bold">{section.alias}</TableCell>
            <TableCell className="py-2 px-3 font-bold">
                <Link className="text-cyan-600 underline" to={`/moderator/sections/${section.id}`}>Xem thêm</Link>
            </TableCell>
        </TableRow>
    </>
}

export default SectionRow