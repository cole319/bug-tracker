// components/SideBar.tsx

"use client";

import React from "react";

import { BsCurrencyDollar, BsSlashLg } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";

const menuItems = [
  {
    id: 1,
    name: "Dashboard",
  },
  {
    id: 2,
    name: "My Bugs",
  },
  {
    id: 3,
    name: "Assigned",
  },
  {
    id: 4,
    name: "Critical",
  },
  {
    id: 5,
    name: "Resolved",
  },
];

export default function SideBar({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="hidden fixed z-50 lg:block bg-card-bg dark:bg-d-card-bg p-[1rem] shadow-accent-primary/40 dark:border-[0.2px] shadow-2xl rounded-lg w-[20rem] h-fit">
      <div className="flex flex-col justify center items-start pt-[1rem] pb-[1.5rem] gap-[0.5rem]">
        {menuItems.map((menuItem) => (
          <button
            key={menuItem.id}
            className="flex justify-start items-center gap-[1rem] text-[1.1rem] dark:text-d-accent-primary hover:bg-accent-logo/20 focus:bg-accent-logo/20 dark:hover:bg-d-accent-logo/20 dark:active:bg-d-accent-logo/20 dark:active:text-neutral-50 w-full py-[0.5rem] px-[1rem] rounded-lg cursor-pointer ease-in-out duration-300"
          >
            <span>
              <BsCurrencyDollar />
            </span>
            {menuItem.name}
          </button>
        ))}
      </div>
      <button
        onClick={onOpenModal}
        className="bg-accent-primary dark:bg-d-text-primary font-semibold text-d-text-primary dark:text-text-primary py-[0.6rem] px-[2rem] w-full rounded-lg cursor-pointer hover:bg-accent-primary/90 dark:hover:bg-d-text-primary/90 flex items-center justify-center gap-[1rem] ease-in-out duration-400"
      >
        <span>
          <FaPlus />
        </span>
        New Issue
      </button>
    </section>
  );
}
