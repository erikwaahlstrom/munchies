import React from "react";
import { StatusBadge } from "App/components/Badge/StatusBadge";
import TextBadge from "./TextBadge";

export interface BadgeProps {
  label?: React.ReactNode;
  status?: boolean | null;
}

export const Badge = ({ label, status = null }: BadgeProps) => {
  return (
    <span className="inline-flex items-center h-[28px] rounded-full border-[0.6px] border-base-gray pt-2 pr-3 pb-2 pl-[10px] gap-1 justify-center">
      {status !== null ? (
        <StatusBadge status={status} />
      ) : (
        <TextBadge label={label} />
      )}
    </span>
  );
};

export default Badge;
