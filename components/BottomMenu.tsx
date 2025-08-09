import React from "react";
import { MdDashboard } from "react-icons/md";
import { IoBugSharp } from "react-icons/io5";
import { FaUserCog } from "react-icons/fa";
import { FaSkull } from "react-icons/fa";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const menuItems = [
  {
    id: 1,
    name: "Dashboard",
    icon: <MdDashboard />,
  },
  {
    id: 2,
    name: "My Bugs",
    icon: <IoBugSharp />,
  },
  {
    id: 3,
    name: "Assigned",
    icon: <FaUserCog />,
  },
  {
    id: 4,
    name: "Critical",
    icon: <FaSkull />,
  },
  {
    id: 5,
    name: "Resolved",
    icon: <IoCheckmarkDoneCircle />,
  },
];

export default function BottomMenu() {
  return (
    <div className="md:hidden px-[1rem] fixed w-full flex justify-between items-center bottom-0 bg-card-bg dark:bg-d-card-bg py-[1rem] border-t-[0.5px] border-accent-primary/20">
      {menuItems.map((menuItem) => (
        <button
          key={menuItem.id}
          className="text-text-primary dark:text-d-text-primary text-[1.2rem]"
        >
          {menuItem.icon}
        </button>
      ))}
    </div>
  );
}
