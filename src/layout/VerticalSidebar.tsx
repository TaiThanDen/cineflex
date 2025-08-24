import {
  UserIcon,
  HomeIcon,
  BoltIcon,
  Cog6ToothIcon,
  ClockIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import Logo from "@/assets/img/logo.jpg";
import { Link } from "react-router";
import { useContext } from "react";
import Auth from "@/context/Auth";
import { useQuery } from "@tanstack/react-query";
import { me } from "@/lib/api";
import { HeartIcon } from "@heroicons/react/24/outline";



const VerticalSidebar = () => {
  const { auth } = useContext(Auth);

  const userResult = useQuery({
    queryFn: me,
    queryKey: ["me"],
    staleTime: Infinity
  })

  return (
    <div className="w-16 flex flex-col bg-[#2f3147] items-center justify-between py-3">
      <div className="flex flex-col items-center gap-6 mt-2 z-10 text-white">
        {/* Logo/Initial */}
        <img
          src={Logo}
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold object-contain"
        ></img>

        {/* Navigation Icons */}
        <Link to="/home" className="text-white hover:text-purple-500">
          <HomeIcon className="h-6 w-6" />
        </Link>
        {/* <ChartBarIcon className="h-6 w-6" />

        <CalendarIcon className="h-6 w-6" /> */}
        {auth !== '' &&
          <Link to="/continue" className="text-white hover:text-purple-500">
            <ClockIcon className="h-6 w-6" />
          </Link>
        }

        {auth !== '' &&
          <Link to="/like" className="text-white hover:text-purple-500">
            <HandThumbUpIcon className="h-6 w-6" />
          </Link>
        }

        {auth !== '' &&
          <Link to="/favorites" className="text-white hover:text-purple-500">
            <HeartIcon className="h-6 w-6" />
          </Link>
        }

        <Link to="/plans" className="text-white hover:text-purple-500">
          <BoltIcon className="h-6 w-6" />
        </Link>

        {/* <BellIcon className="h-6 w-6" /> */}
      </div>
      <div className="flex flex-col items-center gap-4 z-10 text-white">
        <Cog6ToothIcon className="h-6 w-6" />

        {auth === '' ?
          <Link to="/login" className="text-white hover:text-purple-500">
            <UserIcon className="h-6 w-6" />
          </Link> : <Link to="/profile" className="text-white hover:text-purple-500">
            <img
              src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${userResult?.data?.id}`}
              alt="Avatar"
              className="w-8 h-8 rounded-full "
            />
          </Link>}

      </div>
    </div>
  );
};

export default VerticalSidebar;
