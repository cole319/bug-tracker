// components/AddIssueModal.tsx
"use client";
import React, { useState } from "react";
import { createIssue, Issue } from "@/firebase/issues";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

export default function assignedToModal() {
  const [search, setSearch] = useState<string>("");

  return (
    <form className="py-[2rem] px-[3rem] w-[40%] bg-card-bg dark:bg-d-card-bg dark:border-[0.2px] rounded-lg shadow-accent-primary/40 shadow-2xl">
      <h2 className="text-xl font-semibold pb-4 dark:text-d-text-primary">
        Assign User
      </h2>
      <input
        type="text"
        placeholder="Search team members..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border-accent-primary dark:border-d-accent-primary/50 border-[0.2px] rounded-lg py-[0.5rem] px-[1rem] mb-[1.5rem] outline-none placeholder:text-d-text-secondary/50"
      />

      <div className="flex justify-end gap-[1rem] font-medium">
        <button className="btn-cancel border-[1px] dark:border-d-text-primary text-text-primary dark:text-d-text-primary py-[0.5rem] px-[2rem] rounded-lg cursor-pointer">
          Cancel
        </button>
        <button className="btn-primary border-[1px] dark:border-d-text-primary py-[0.5rem] px-[2rem] rounded-lg cursor-pointer bg-accent-primary dark:bg-d-text-primary text-d-text-primary dark:text-text-primary">
          Assign
        </button>
      </div>
    </form>
  );
}
