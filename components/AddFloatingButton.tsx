// components/AddFloatingButton.tsx
import React from "react";
import { FaPlus } from "react-icons/fa";

export default function AddFloatingButton({
  onOpenModal,
}: {
  onOpenModal: () => void;
}) {
  return (
    <div className=" fixed right-[2rem] md:right-[3rem] bottom-[4rem] md:bottom-[3rem]">
      <button
        onClick={onOpenModal}
        className="bg-accent-primary dark:bg-d-text-primary font-semibold text-d-text-primary dark:text-text-primary p-[1.5rem] rounded-3xl cursor-pointer hover:bg-accent-primary/90 dark:hover:bg-d-text-primary/90 flex items-center justify-center gap-[1rem] ease-in-out duration-400"
      >
        <FaPlus />
      </button>
    </div>
  );
}
