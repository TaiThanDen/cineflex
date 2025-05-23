import {
  HomeIcon,
  ChartBarIcon,
  UserIcon,
  CalendarIcon,
  BoltIcon,
  BellIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const VerticalSidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-16 flex flex-col bg-black items-center justify-between py-4 border-r border-gray-800">
      <div className="flex flex-col items-center gap-6 mt-2 z-10">
        {/* Logo/Initial */}
        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white text-lg font-bold">
          S
        </div>

        {/* Navigation Icons */}
        <NavIcon icon={<HomeIcon className="h-6 w-6" />} />
        <NavIcon icon={<ChartBarIcon className="h-6 w-6" />} />
        <NavIcon icon={<UserIcon className="h-6 w-6" />} />
        <NavIcon icon={<CalendarIcon className="h-6 w-6" />} />
        <NavIcon icon={<BoltIcon className="h-6 w-6" />} />
        <NavIcon icon={<BellIcon className="h-6 w-6" />} />
      </div>

      {/* Bottom section */}
      <div className="flex flex-col items-center gap-4 z-10">
        <NavIcon icon={<Cog6ToothIcon className="h-6 w-6" />} />
        <img
          src="https://i.pravatar.cc/100"
          alt="Avatar"
          className="w-8 h-8 rounded-full border-2 border-purple-600"
        />
      </div>
    </div>
  );
};

const NavIcon = ({ icon }: { icon: React.ReactNode }) => (
  <div className="text-gray-400 hover:text-white cursor-pointer">{icon}</div>
);

export default VerticalSidebar;
