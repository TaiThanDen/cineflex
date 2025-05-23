// import { useState } from "react";
import { Link } from "react-router";

const Navbar = () => {
    // const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="flex flex-row w-full sticky left-0 top-0 text-white z-20 bg-gradient-to-b from-black/80 to-transparent h-15">
            <Link to='/' className='flex items-center space-x-3 w-full rtl:space-x-reverse flex-1 my-5 font-bold text-center mx-5'>
                CINEFLEX
            </Link>
            <div className="w-full h-full m-2">
                <div className="relative flex gap-4">
                    <input
                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="UI Kits, Dashboards..."
                    />
                    <button className="bg-indigo-700">aaa</button>
                </div>
            </div>
            <ul className="items-cente justify-center pl-5 space-x-8 hidden lg:flex flex-auto flex-row w-full">
                <li className='my-5'>
                    <Link to="/" className="opacity-50 hover:opacity-100 transition-colors font-bold text-nowrap overflow-x-hidden">AAAA</Link>
                </li>
                <li className='my-5'>
                    <Link to="/" className="opacity-50 hover:opacity-100 transition-colors font-bold text-nowrap overflow-x-hidden">AAAA</Link>
                </li>
                <li className='my-5'>
                    <Link to="/" className="opacity-50 hover:opacity-100 transition-colors font-bold text-nowrap overflow-x-hidden">AAAA</Link>
                </li>
                <li className='my-5'>
                    <Link to="/" className="opacity-50 hover:opacity-100 transition-colors font-bold text-nowrap overflow-x-hidden">AAAA</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
