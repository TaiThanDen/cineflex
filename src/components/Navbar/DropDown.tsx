import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

interface Item {
    label: ReactNode;
    path?: string; // optional now
    onClick?: () => void; // optional new prop
}

interface Props {
    items: Item[];
    children: ReactNode;
}

const DropDown = ({ items, children }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li className="my-5 relative">
            <span className="relative h-full text-white">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex lg:w-auto w-full items-center text-white opacity-100 transition-colors cursor-pointer"
                >
                    <span className="lg:flex-none flex-1 items-start flex font-bold text-nowrap overflow-x-hidden">
                        {children}
                    </span>
                    <FaChevronDown
                        className={`w-4 h-4 lg:flex-none flex-[0.2] transition-transform ${isOpen ? "rotate-180" : ""
                            }`}
                    />
                </button>
            </span>

            <ul
                className={`absolute left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                {items.map((item, index) => (
                    <li key={index}>
                        {item.path ? (
                            <Link
                                to={item.path}
                                className="block px-4 py-2 text-white hover:bg-gray-700"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <button
                                onClick={() => {
                                    item.onClick?.();
                                    setIsOpen(false);
                                }}
                                className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700"
                            >
                                {item.label}
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </li>
    );
};

export default DropDown;
