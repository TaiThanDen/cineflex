import {
  UserIcon,
  HomeIcon,
  ChartBarIcon,
  CalendarIcon,
  BoltIcon,
  BellIcon,
  Cog6ToothIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import Logo from "@/assets/img/logo.jpg";
import { Link } from "react-router";
import { useContext } from "react";
import Auth from "@/context/Auth";


const VerticalSidebar = () => {
  const { auth } = useContext(Auth);

  return (
    <div className="w-16 flex flex-col bg-[#2f3147] items-center justify-between py-3">
      <div className="flex flex-col items-center gap-6 mt-2 z-10 text-white">
        {/* Logo/Initial */}
        <img
          src={Logo}
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold object-contain"
        ></img>

        {/* Navigation Icons */}
        <Link to="/" className="text-white hover:text-purple-500">
          <HomeIcon className="h-6 w-6" />
        </Link>
        <ChartBarIcon className="h-6 w-6" />

        <CalendarIcon className="h-6 w-6" />
        <Link to="/continue" className="text-white hover:text-purple-500">
          <ClockIcon className="h-6 w-6" />
        </Link>
        <Link to="/plans" className="text-white hover:text-purple-500">
          <BoltIcon className="h-6 w-6" />
        </Link>
        <BellIcon className="h-6 w-6" />
      </div>
      <div className="flex flex-col items-center gap-4 z-10 text-white">
        <Cog6ToothIcon className="h-6 w-6" />

        {auth === '' ?
          <Link to="/login" className="text-white hover:text-purple-500">
            <UserIcon className="h-6 w-6" />
          </Link> : <Link to="/profile" className="text-white hover:text-purple-500">
            <img
              src="https://i.pravatar.cc/100"
              alt="Avatar"
              className="w-8 h-8 rounded-full "
            />
          </Link>}

      </div>
    </div>
  );
};

export default VerticalSidebar;
