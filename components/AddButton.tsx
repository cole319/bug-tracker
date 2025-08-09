import React from "react";
import { FaPlus } from "react-icons/fa";
export default function AddButton() {
  return (
    <div className="absolute right-[3rem] bottom-[3rem]">
      <button className="bg-accent-primary dark:bg-d-text-primary font-semibold text-d-text-primary dark:text-text-primary p-[1.5rem] rounded-3xl cursor-pointer hover:bg-accent-primary/90 dark:hover:bg-d-text-primary/90 flex items-center justify-center gap-[1rem] ease-in-out duration-400">
        <FaPlus />
      </button>
    </div>
  );
}
