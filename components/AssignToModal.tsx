// components/AssignedToModal.tsx
"use client";
import React, { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { useAppSelector } from "@/stores/storeHooks";
import { RootState } from "@/stores/store";
import { IssueWithDoc } from "@/firebase/issues";
import { TeamMember } from "@/features/team/teamSlice";

interface AssignedToModalProps {
  issue: IssueWithDoc;
  onAssign: (member: TeamMember) => void;
}

export default function AssignedToModal({
  issue,
  onAssign,
}: AssignedToModalProps) {
  const { loading } = useAppSelector((s: RootState) => s.team);
  const { members } = useAppSelector((s: RootState) => s.team);
  const [search, setSearch] = useState<string>("");

  const filteredMembers = members.filter(
    (m) =>
      m.displayName?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase())
  );

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
      {loading ? (
        <div className="flex justify-start items-center gap-[1rem] text-d-accent-primary dark:text-d-accent-primary/40">
          Loading issues...{" "}
          <span className="animate-spin">
            <ImSpinner9 />
          </span>
        </div>
      ) : filteredMembers.length === 0 ? (
        <h1 className="text-center pt-[2rem]">No Member to display</h1>
      ) : (
        <div className="grid gap-4">
          {filteredMembers.map((member) => (
            <button
              key={member.uid}
              onClick={() => onAssign(member)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-accent-primary/10"
            >
              <div>
                <p className="font-medium">{member.displayName}</p>
                <p className="text-sm text-gray-500">{member.email}</p>
              </div>
              {issue.assignedTo?.uid === member.uid && (
                <span className="text-accent-primary">✔</span>
              )}
            </button>
          ))}
        </div>
      )}
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
