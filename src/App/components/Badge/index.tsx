import React from "react";
import { Text } from "App/components/Text";
import { Ellipse } from "assets/media/icons/Ellipse";

export interface BadgeProps {
  label: React.ReactNode;
  status?: boolean;
}

export const Badge = ({ label, status = false }: BadgeProps) => {
  return (
    <span className="inline-flex items-center h-[28px] rounded-full border-[0.6px] border-base-gray pt-2 pr-3 pb-2 pl-[10px] gap-1 justify-center">
      {status ? <Ellipse /> : null}

      <Text typography="Regular/12">{label}</Text>
    </span>
  );
};

export default Badge;
