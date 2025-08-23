// components/IssueCard.tsx
"use client";
import React, { useState } from "react";

import { Tooltip } from "@radix-ui/themes";

import { FaUserCog } from "react-icons/fa";
import { MdDateRange, MdEditDocument } from "react-icons/md";

import { GoDotFill } from "react-icons/go";
import { IssueWithDoc } from "@/firebase/issues";
import { getTimeAgo } from "@/utils/time";
import { IoMdClose } from "react-icons/io";

interface CardZoomedModalProps {
  issue: IssueWithDoc;
  onClose: () => void;
}

export default function CardZoomedModal({
  issue,
  onClose,
}: CardZoomedModalProps) {
  return (
    <div className="relative flex flex-col justify-between bg-card-bg dark:bg-d-card-bg p-[2rem] shadow-accent-primary/20 dark:border-[0.2px] dark:border-d-text-secondary/20 shadow-2xl rounded-lg w-[60%] min-h-[20rem] gap-[0.8rem] dark:text-d-text-secondary">
      <div className="flex flex-col gap-[1.2rem]">
        <div className="md:flex justify-between items-center">
          <h1 className="text-[1.1rem] font-bold dark:text-d-text-primary">
            {issue.title}
          </h1>
          <div className="flex justify-center items-center gap-[1rem]">
            <p className="text-[0.6rem]">{issue.id}</p>
            <Tooltip content="Close">
              <button
                onClick={onClose}
                className="dark:text-d-text-primary cursor-pointer text-[1.8rem]"
              >
                <IoMdClose />
              </button>
            </Tooltip>
          </div>
        </div>
        <div className="text-[0.9rem]">{issue.description}</div>
      </div>

      <div className="flex justify-between items-center text-[0.8rem]">
        <div className="sm:flex gap-[2rem] font-semibold items-center">
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
          <div className="flex gap-[0.5rem] items-center">
            <p className="flex items-center gap-[0.5rem]">
              <FaUserCog />
              <span className="text-accent-primary/70 dark:text-d-accent-primary/70">
                {issue.assignedTo?.displayName ?? "Unassigned"}
              </span>
            </p>
          </div>

          <p className="flex items-center gap-[0.5rem]">
            <Tooltip content="Created">
              <MdDateRange />
            </Tooltip>

            {issue.createdAt
              ? getTimeAgo(new Date(issue.createdAt))
              : "just now"}
          </p>
          <p className="flex items-center gap-[0.5rem]">
            <Tooltip content="Last updated">
              <MdEditDocument />
            </Tooltip>

            {issue.updatedAt
              ? getTimeAgo(new Date(issue.updatedAt))
              : issue.createdAt
              ? getTimeAgo(new Date(issue.createdAt))
              : "just now"}
          </p>
        </div>
      </div>
    </div>
  );
}
