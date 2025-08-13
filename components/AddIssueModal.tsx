// components/AddIssueModal.tsx
"use client";
import React, { useState } from "react";
import { createIssue, Issue } from "@/firebase/issues";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useRouter } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";

export default function AddIssueModal({ onClose }: { onClose: () => void }) {
  const user = useSelector((s: RootState) => s.auth.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to create issues");
      return;
    }
    const payload: Omit<Issue, "id" | "createdAt"> = {
      title,
      description,
      priority,
      status: "open",
      createdBy: {
        uid: user.uid,
        displayName: user.displayName ?? null,
        email: user.email ?? null,
      },
      assignedTo: null,
    };

    try {
      await createIssue(payload);
      onClose();
      // Optionally navigate to the new issue detail later.
    } catch (err) {
      console.error("createIssue error", err);
      alert("Failed to create issue");
    }
  };

  return (
    <form
      className="py-[2rem] px-[3rem] w-full max-w-1/2 bg-card-bg dark:bg-d-card-bg dark:border-[0.2px] rounded-lg shadow-accent-primary/40 shadow-2xl"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold pb-4 dark:text-d-text-primary">
        New Issue
      </h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title..."
        className="w-full border-accent-primary dark:border-d-accent-primary/50 border-[0.2px] rounded-lg py-[0.5rem] px-[1rem] mb-[1.5rem] outline-none placeholder:text-d-text-secondary/50"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description..."
        className="w-full border-accent-primary dark:border-d-accent-primary/50 border-[0.2px] rounded-lg py-[0.5rem] px-[1rem] mb-[1.5rem] h-[8rem] outline-none placeholder:text-d-text-secondary/50"
      />
      <div className="flex justify-start gap-[1rem]">
        <h1 className="font-medium text-accent-primary/70 dark:text-d-text-secondary">
          Select priority
        </h1>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as any)}
          className="w-1/4 mb-4 border-[0.2px] border-accent-primary dark:border-d-accent-primary/50 py-[0.5rem] rounded-lg appearance-none text-center outline-none cursor-pointer dark:text-d-text-secondary"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div className="flex justify-end gap-[1rem] font-medium">
        <button
          type="button"
          onClick={onClose}
          className="btn-cancel border-[1px] dark:border-d-text-primary text-text-primary dark:text-d-text-primary py-[0.5rem] px-[2rem] rounded-lg cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary border-[1px] dark:border-d-text-primary py-[0.5rem] px-[2rem] rounded-lg cursor-pointer bg-accent-primary dark:bg-d-text-primary text-d-text-primary dark:text-text-primary"
        >
          Create
        </button>
      </div>
    </form>
  );
}
