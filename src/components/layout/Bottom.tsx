import { Link, useLocation } from "react-router-dom";
import { IconType } from "react-icons/lib";
import { FiPackage, FiMapPin, FiHome } from "react-icons/fi";
import { AiOutlineAreaChart } from "react-icons/ai";
import { BsPinMapFill } from "react-icons/bs";
import { IoMdLocate } from "react-icons/io";
import { FaTruck } from "react-icons/fa";

interface BottomMenuItemProps {
  title: string;
  Icon: IconType;
  to: string;
}

const BottomMenuItem = ({ title, Icon, to }: BottomMenuItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center space-x-1 text-sm ${
        isActive ? "text-blue-600" : "text-gray-400"
      }`}
    >
      <Icon size={24} />
      <span className="text-xs">{title}</span>
    </Link>
  );
};

export default function BottomBar() {
  return (
    <div className="fixed bottom-0 left-0 z-20 w-full h-16 bg-gray-900 flex justify-around items-center shadow-lg">
      <BottomMenuItem title="Deliveries" Icon={FaTruck} to="/deliveries" />
      <BottomMenuItem
        title="Dashboard"
        Icon={AiOutlineAreaChart}
        to="/dashboard"
      />
      <BottomMenuItem title="Locations" Icon={IoMdLocate} to="/locations" />
      <BottomMenuItem title="Map" Icon={BsPinMapFill} to="/map" />
    </div>
  );
}
