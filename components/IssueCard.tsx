// components/IssueCard.tsx

import React from "react";
import { FaUserCog } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { Issue } from "@/firebase/issues";
import { getTimeAgo } from "@/utils/time";

interface IssueCardProps {
  issue: Issue;
}

export default function IssueCard({ issue }: IssueCardProps) {
  return (
    <div className="bg-card-bg dark:bg-d-card-bg py-[1.5rem] px-[1.5rem] shadow-accent-primary/20 dark:border-[0.2px] dark:border-d-text-secondary/20 shadow-2xl rounded-lg w-full flex flex-col gap-[0.8rem] dark:text-d-text-secondary">
      <div className="md:flex justify-between items-center">
        <h1 className="text-[1.1rem] font-bold dark:text-d-text-primary">
          {issue.title}
        </h1>
        <p className="text-[0.8rem]">{issue.id}</p>
      </div>
      <div className="text-[0.9rem]">
        {issue.description.length <= 100
          ? issue.description
          : issue.description.slice(0, 100) + "..."}
      </div>
      <div className="sm:flex gap-[1.5rem] text-[0.8rem] font-semibold items-center">
        {issue.priority === "low" && <p className="text-accent-green">Low</p>}
        {issue.priority === "medium" && (
          <p className="text-accent-yellow">Medium</p>
        )}
        {issue.priority === "high" && <p className="text-accent-red">High</p>}
        {issue.status === "open" && (
          <p className="text-accent-red flex items-center gap-[0.3rem]">
            <span className="text-[1.2rem]">
              <GoDotFill />
            </span>
            Open
          </p>
        )}
        {issue.status === "in_progress" && (
          <p className="text-accent-yellow flex items-center gap-[0.3rem]">
            <span className="text-[1.2rem]">
              <GoDotFill />
            </span>
            In Progress
          </p>
        )}
        {issue.status === "resolved" && (
          <p className="text-accent-green flex items-center gap-[0.3rem]">
            <span className="text-[1.2rem]">
              <GoDotFill />
            </span>
            Resolved
          </p>
        )}
        <p className="flex items-center gap-[0.5rem]">
          <span>
            <FaUserCog />
          </span>
          {issue.assignedTo?.displayName
            ? issue.assignedTo.displayName
            : "Unassigned"}
        </p>
        <p className="flex items-center gap-[0.5rem]">
          <span>
            <MdDateRange />
          </span>
          {issue.createdAt ? getTimeAgo(issue.createdAt.toDate()) : "just now"}
        </p>
      </div>
    </div>
  );
}
