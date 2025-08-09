import React from "react";
import { CiSearch } from "react-icons/ci";
import IssueCard from "./IssueCard";

const menuItems = [
  {
    id: 1,
    name: "All",
  },
  {
    id: 2,
    name: "Open",
  },
  {
    id: 3,
    name: "In Progress",
  },
  {
    id: 4,
    name: "Resolved",
  },
];

export default function DashBoard() {
  return (
    <section className="md:pl-[2rem] w-full">
      <nav className="flex justify-start items-center gap-[3rem]">
        {menuItems.map((menuItem) => (
          <button
            key={menuItem.id}
            className="cursor-pointer hover:bg-accent-primary px-[1rem] py-[0.5rem] rounded-lg hover:text-d-text-primary ease-in-out duration-300 active:bg-accent-primary dark:text-d-text-secondary dark:hover:text-accent-primary dark:hover:bg-d-text-primary"
          >
            {menuItem.name}
          </button>
        ))}

        <div className="flex justify-center items-center gap-[0.5rem] border-[0.2px] py-[0.5rem] px-[1rem] rounded-full text-md border-d-accent-primary/50 ">
          <input
            type="text"
            placeholder="Search issues..."
            className="outline-none dark:placeholder:text-d-accent-primary/50"
          />
          <p className="text-[1.4rem] dark:text-d-accent-primary/70 ">
            <CiSearch />
          </p>
        </div>
      </nav>
      <div className="pt-[1.5rem] flex flex-col gap-[1rem]">
        <IssueCard />
        <IssueCard />
        <IssueCard />
      </div>
    </section>
  );
}
