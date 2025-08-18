import React from "react";

interface ConfirmationModalProps {
  message: string | React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal({
  message,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  return (
    <div className="bg-card-bg/80 py-[2rem] px-[3rem] rounded-lg">
      <div className="pb-[1.5rem] text-text-primary">{message}</div>
      <div className="flex justify-end items-center gap-[1rem]">
        <button
          onClick={onCancel}
          className="btn-cancel border-[1px] border-accent-primary text-text-primary py-[0.5rem] px-[2rem] rounded-lg cursor-pointer"
        >
          No
        </button>
        <button
          onClick={onConfirm}
          className="btn-primary border-[1px] dark:border-d-text-primary py-[0.5rem] px-[2rem] rounded-lg cursor-pointer bg-accent-primary text-d-text-primary"
        >
          Yes
        </button>
      </div>
    </div>
  );
}
