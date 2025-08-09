import React from "react";
import { FaUserCog } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { GoDotFill } from "react-icons/go";

export default function IssueCard() {
  return (
    <div className="bg-card-bg dark:bg-d-card-bg py-[1.5rem] px-[1.5rem] shadow-accent-primary/20 dark:border-[0.2px] dark:border-d-text-secondary/20 shadow-2xl rounded-lg w-full flex flex-col gap-[0.8rem] dark:text-d-text-secondary">
      <div className="md:flex justify-between items-center">
        <h1 className="text-[1.1rem] font-bold dark:text-d-text-primary">
          This is the heading of the issue
        </h1>
        <p className="text-[0.8rem]">#Bug-xyz</p>
      </div>
      <div>
        This is a random description of the bug Lorem ipsum dolor sit amet
        consectetur adipisicing elit.
      </div>
      <div className="sm:flex gap-[1.5rem] text-[0.8rem] font-semibold items-center">
        <p className="text-accent-red">High</p>
        <p className="text-accent-red flex items-center gap-[0.3rem]">
          <span className="text-[1.2rem]">
            <GoDotFill />
          </span>
          Open
        </p>
        <p className="flex items-center gap-[0.5rem]">
          <span>
            <FaUserCog />
          </span>
          Unassigned
        </p>
        <p className="flex items-center gap-[0.5rem]">
          <span>
            <MdDateRange />
          </span>
          3 hours ago
        </p>
      </div>
    </div>
  );
}
