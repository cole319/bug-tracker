// components/EditIssueModal.tsx
import React, { useState } from "react";

interface EditIssueModalProps {
  currTitle: string;
  currDescription: string;
  currPriority: "low" | "medium" | "high";
  onSave: (patch: {
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
  }) => void;
  onCancel: () => void;
}

export default function EditIssueModal({
  currTitle,
  currDescription,
  currPriority,
  onSave,
  onCancel,
}: EditIssueModalProps) {
  const [newTitle, setNewTitle] = useState<string>(currTitle);
  const [newDescription, setNewDescription] = useState<string>(currDescription);
  const [newPriority, setNewPriority] = useState<string>(currPriority);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title: newTitle,
      description: newDescription,
      priority: newPriority as "low" | "medium" | "high",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="py-[2rem] px-[3rem] w-[60%] bg-card-bg dark:bg-d-card-bg dark:border-[0.2px] rounded-lg shadow-accent-primary/40 shadow-2xl"
    >
      <h2 className="text-xl font-semibold pb-4 dark:text-d-text-primary">
        Edit Issue
      </h2>
      <input
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="Title..."
        className="w-full border-accent-primary dark:border-d-accent-primary/50 border-[0.2px] rounded-lg py-[0.5rem] px-[1rem] mb-[1.5rem] outline-none placeholder:text-d-text-secondary/50"
      />
      <textarea
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        placeholder="Description..."
        className="w-full border-accent-primary dark:border-d-accent-primary/50 border-[0.2px] rounded-lg py-[0.5rem] px-[1rem] mb-[1.5rem] h-[8rem] outline-none placeholder:text-d-text-secondary/50"
      />
      <div className="flex justify-start gap-[1rem]">
        <h1 className="font-medium text-accent-primary/70 dark:text-d-text-secondary">
          Select priority
        </h1>
        <select
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value as any)}
          className="w-1/4 mb-4 border-[0.2px] border-accent-primary dark:border-d-accent-primary/50 py-[0.5rem] rounded-lg appearance-none text-center outline-none cursor-pointer dark:text-d-text-secondary"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div className="flex justify-end gap-[1rem] font-medium">
        <button
          onClick={onCancel}
          type="button"
          className="btn-cancel border-[1px] dark:border-d-text-primary text-text-primary dark:text-d-text-primary py-[0.5rem] px-[2rem] rounded-lg cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary border-[1px] dark:border-d-text-primary py-[0.5rem] px-[2rem] rounded-lg cursor-pointer bg-accent-primary dark:bg-d-text-primary text-d-text-primary dark:text-text-primary"
        >
          Save
        </button>
      </div>
    </form>
  );
}
