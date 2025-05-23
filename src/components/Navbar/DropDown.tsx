import { useState, type ReactNode } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

interface item {
    label: ReactNode,
    path: string
}

interface props {
    items: item[],
    path: string,
    children: ReactNode
}

const DropDown = ({ items, path, children }: props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li className='my-5'>
            <span className="relative h-full text-white">
                <button
                    onClick={() => { setIsOpen(!isOpen) }}
                    className={`flex lg:w-auto w-full items-center text-white opacity-50 hover:opacity-100 transition-colors cursor-pointer`}
                ><span className="lg:flex-none flex-1 items-start flex font-bold text-nowrap overflow-x-hidden">{children}</span><FaChevronDown className={`w-4 h-4 lg:flex-none flex-[0.2] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
            </span>

            <ul className="hidden">
                {items.map((item) => {
                    return (
                        <li><Link to={`${path}${item.path}`}>{item.label}</Link></li>
                    )
                })}
            </ul>
        </li>
    )
}

export default DropDown