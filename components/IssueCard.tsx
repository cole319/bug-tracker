// components/IssueCard.tsx
"use client";
import React, { useState } from "react";
import { useAppDispatch } from "@/stores/storeHooks";
import { Tooltip } from "@radix-ui/themes";
import {
  removeIssue,
  updateIssueInState,
  assignIssue,
  resolveIssueThunk,
} from "@/features/issues/issuesSlice";
import { deleteIssue, updateIssue } from "@/firebase/issues";
import { FaUserCog, FaPlus } from "react-icons/fa";
import { MdDateRange, MdDelete, MdEditDocument, MdDone } from "react-icons/md";
import { FaArrowsRotate } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { IssueWithDoc } from "@/firebase/issues";
import { getTimeAgo } from "@/utils/time";
import { FiZoomIn } from "react-icons/fi";

import ConfirmationModal from "./ConfirmationModal";
import EditIssueModal from "./EditIssueModal";
import AssignToModal from "./AssignToModal";
import CardZoomedModal from "./CardZoomedModal";
import { TeamMember } from "@/features/team/teamSlice";

interface IssueCardProps {
  issue: IssueWithDoc;
}

export default function IssueCard({ issue }: IssueCardProps) {
  const dispatch = useAppDispatch();

  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [assignToModalOpen, setAssignToModalOpen] = useState<boolean>(false);
  const [cardZoomed, setCardZoomed] = useState<boolean>(false);

  return (
    <div className="relative bg-card-bg dark:bg-d-card-bg py-[1.5rem] px-[1.5rem] shadow-accent-primary/20 dark:border-[0.2px] dark:border-d-text-secondary/20 shadow-2xl rounded-lg w-full flex flex-col gap-[0.8rem] dark:text-d-text-secondary">
      {confirmModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <ConfirmationModal
            message={
              <h1>
                Are you sure you want to delete issue :{" "}
                <span className="font-semibold">{issue.id}</span>?
              </h1>
            }
            onConfirm={async () => {
              await deleteIssue(issue.docId);
              dispatch(removeIssue(issue.docId));
              setConfirmModalOpen(false);
            }}
            onCancel={() => {
              setConfirmModalOpen(false);
            }}
          />
        </div>
      )}
      {editModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <EditIssueModal
            currTitle={issue.title}
            currDescription={issue.description}
            currPriority={issue.priority}
            onSave={async (patch) => {
              await updateIssue(issue.docId, patch);
              dispatch(updateIssueInState({ docId: issue.docId, patch }));
              setEditModalOpen(false);
            }}
            onCancel={() => {
              setEditModalOpen(false);
            }}
          />
        </div>
      )}
      {assignToModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <AssignToModal
            onAssign={async (member: TeamMember | null) => {
              try {
                await dispatch(
                  assignIssue({ issueId: issue.docId, member })
                ).unwrap();
                setAssignToModalOpen(false);
              } catch (err) {
                console.error("Failed to assign:", err);
              }
            }}
            onCancel={() => setAssignToModalOpen(false)}
            issue={issue}
          />
        </div>
      )}
      {cardZoomed && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <CardZoomedModal issue={issue} onClose={() => setCardZoomed(false)} />
        </div>
      )}
      <div className="md:flex justify-between items-center">
        <h1 className="text-[1.1rem] font-bold dark:text-d-text-primary">
          {issue.title}
        </h1>
        <div className="flex justify-center items-center gap-[1rem]">
          <p className="text-[0.6rem]">{issue.id}</p>
          <Tooltip content="Zoom in">
            <button
              onClick={() => setCardZoomed(true)}
              className="dark:text-d-text-primary cursor-pointer"
            >
              <FiZoomIn />
            </button>
          </Tooltip>
          <Tooltip content="Edit Issue">
            <button
              onClick={() => setEditModalOpen(true)}
              className="dark:text-d-text-primary cursor-pointer"
            >
              <MdEditDocument />
            </button>
          </Tooltip>
          <Tooltip content="Delete Issue">
            <button
              onClick={() => {
                setConfirmModalOpen(true);
              }}
              className="text-accent-red cursor-pointer"
            >
              <MdDelete />
            </button>
          </Tooltip>
        </div>
      </div>
      <div className="text-[0.9rem]">
        {issue.description.length <= 100
          ? issue.description
          : issue.description.slice(0, 100) + "..."}
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
            <button
              onClick={() => setAssignToModalOpen(true)}
              className="text-sm text-text-primary cursor-pointer dark:text-d-text-primary"
            >
              {issue.assignedTo ? (
                <Tooltip content="Reassign Issue to Member">
                  <FaArrowsRotate />
                </Tooltip>
              ) : (
                <Tooltip content="Assign Issue to Member">
                  <FaPlus />
                </Tooltip>
              )}
            </button>
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
        {issue.status == "in_progress" && (
          <button
            onClick={() => dispatch(resolveIssueThunk(issue.docId))}
            className="text-neutral-50 dark:text-accent-green bg-accent-green hover:bg-green-600 dark:bg-transparent dark:border-[0.1px] dark:border-accent-green dark:hover:bg-accent-green/20 py-[0.1rem] px-[0.3rem] rounded-sm cursor-pointer font-medium ease-in-out duration-200"
          >
            Mark Resolved
          </button>
        )}
        {issue.status === "resolved" && (
          <Tooltip content="Issue Resolved">
            <span className="bg-accent-green dark:bg-green-700 p-[0.2rem] rounded-full text-neutral-50">
              <MdDone />
            </span>
          </Tooltip>
        )}
      </div>
    </div>
  );
}

/*
id: issue.id,
docId: issue.docId,
title: issue.title,
description: issue.description,
priority: issue.priority,
status: issue.status,
createdBy: {
  uid: issue.createdBy.uid,
  displayName: issue.createdBy.displayName ?? null,
  email: issue.createdBy.email ?? null,
},
assignedTo: issue.assignedTo ?? null,
createdAt: issue.createdAt,
updatedAt: issue.updatedAt,

*/
