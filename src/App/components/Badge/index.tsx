import React from "react";
import { twMerge } from "tailwind-merge";
import { StatusBadge } from "App/components/Badge/StatusBadge";
import TextBadge from "./TextBadge";

export interface BadgeProps {
  label?: React.ReactNode;
  status?: boolean | null;
  className?: string;
}

export const Badge = ({ label, status = null, className }: BadgeProps) => {
  return (
    <span
      className={twMerge(
        "inline-flex items-center h-[28px] rounded-full border-[0.6px] border-base-black-10 pt-2 pr-3 pb-2 pl-[10px] gap-1 justify-center relative z-3",
        className
      )}
    >
      {status !== null ? (
        <StatusBadge status={status} />
      ) : (
        <TextBadge label={label} />
      )}
    </span>
  );
};

export default Badge;
