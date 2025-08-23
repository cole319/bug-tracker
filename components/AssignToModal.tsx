// components/AssignToModal.tsx

"use client";
import React, { useState, useEffect } from "react";
import { ImSpinner9 } from "react-icons/im";
import { useAppSelector, useAppDispatch } from "@/stores/storeHooks";
import { RootState } from "@/stores/store";
import { IssueWithDoc } from "@/firebase/issues";
import { TeamMember, fetchTeamMembers } from "@/features/team/teamSlice";

interface AssignToModalProps {
  issue: IssueWithDoc;
  onAssign: (member: TeamMember | null) => void;
  onCancel: () => void;
}

export default function AssignToModal({
  issue,
  onAssign,
  onCancel,
}: AssignToModalProps) {
  const dispatch = useAppDispatch();
  const { members, loading } = useAppSelector((s: RootState) => s.team);

  useEffect(() => {
    if (members.length === 0) {
      dispatch(fetchTeamMembers());
    }
  }, [dispatch, members.length]);

  const [search, setSearch] = useState<string>("");

  const initialSelected: TeamMember | null = issue.assignedTo
    ? {
        uid: issue.assignedTo.uid,
        displayName: issue.assignedTo.displayName ?? null,
        email: issue.assignedTo.email ?? null,
      }
    : null;

  const [selected, setSelected] = useState<TeamMember | null>(initialSelected);

  const q = search.toLowerCase();
  const filteredMembers = members.filter(
    (m) =>
      (m.displayName ?? "").toLowerCase().includes(q) ||
      (m.email ?? "").toLowerCase().includes(q)
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onAssign(selected); // <-- allow null to unassign
      }}
      className="py-[2rem] px-[3rem] w-[40%] bg-card-bg dark:bg-d-card-bg dark:border-[0.2px] rounded-lg shadow-accent-primary/40 shadow-2xl"
    >
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
          Loading Members...{" "}
          <span className="animate-spin">
            <ImSpinner9 />
          </span>
        </div>
      ) : filteredMembers.length === 0 ? (
        <h1 className="text-center pt-[1rem]">No Member to display</h1>
      ) : (
        <div className="grid gap-4 max-h-[60vh] overflow-y-auto">
          {filteredMembers.map((member) => (
            <button
              key={member.uid}
              type="button"
              onClick={() => setSelected(member)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-accent-primary/10 ${
                selected?.uid === member.uid && `bg-accent-primary/10`
              }`}
            >
              <div className="flex flex-col items-start">
                <p className="font-medium">{member.displayName}</p>
                <p className="text-sm text-gray-500">{member.email}</p>
              </div>
              {selected?.uid === member.uid && (
                <span className="text-accent-primary dark:text-d-accent-primary">
                  ✔
                </span>
              )}
            </button>
          ))}
        </div>
      )}
      <div className="flex justify-end gap-[1rem] font-medium pt-[2rem]">
        <button
          type="button"
          onClick={onCancel}
          className="btn-cancel border-[1px] dark:border-d-text-primary text-text-primary dark:text-d-text-primary py-[0.5rem] px-[2rem] rounded-lg cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary border-[1px] dark:border-d-text-primary py-[0.5rem] px-[2rem] rounded-lg cursor-pointer bg-accent-primary dark:bg-d-text-primary text-d-text-primary dark:text-text-primary"
        >
          Assign
        </button>
      </div>
    </form>
  );
}
