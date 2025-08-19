import type { ReactNode } from "react";
import { Link } from "react-router";

interface props {
    path: string,
    children: ReactNode
}

const NavLink = ({ path, children }: props) => {
    return (
        <li className='my-5'>
            <Link to={path} className="opacity-100 transition-colors font-bold text-nowrap overflow-x-hidden">
                {children}
            </Link>
        </li>
    )
}

export default NavLink;