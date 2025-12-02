import React from "react";

export interface EllipseProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  color?: string;
}

export const Ellipse: React.FC<EllipseProps> = ({
  width = 12,
  height = 10,
  color = "var(--color-base-green)",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4" cy="4" r="4" fill={color} />
    </svg>
  );
};
