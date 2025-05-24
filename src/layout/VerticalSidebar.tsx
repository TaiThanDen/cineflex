import {
  HomeIcon,
  ChartBarIcon,
  UserIcon,
  CalendarIcon,
  BoltIcon,
  BellIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import Logo from '@/assets/img/logo.jpg';

const VerticalSidebar = () => {
  return (
    <div className="w-16 flex flex-col bg-[#2f3147] items-center justify-between py-3">
      <div className="flex flex-col items-center gap-6 mt-2 z-10 text-white">
        {/* Logo/Initial */}
        <img src={Logo} className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold object-contain">
          
        </img>

        {/* Navigation Icons */}
        <HomeIcon className="h-6 w-6" />
        <ChartBarIcon className="h-6 w-6" />
        <UserIcon className="h-6 w-6" />
        <CalendarIcon className="h-6 w-6" />
        <BoltIcon className="h-6 w-6" />
        <BellIcon className="h-6 w-6" />
      </div>
      <div className="flex flex-col items-center gap-4 z-10 text-white">
        <Cog6ToothIcon className="h-6 w-6" />

        <img
          src="https://i.pravatar.cc/100"
          alt="Avatar"
          className="w-8 h-8 rounded-full border-2 border-purple-600"
        />
      </div>
    </div>
  );
};

export default VerticalSidebar;
