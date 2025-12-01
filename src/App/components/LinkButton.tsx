import React from "react";
import { Link } from "react-router-dom";
import { getTextStyle } from "config/textStyles";

const themeMap = {
  primary: {
    base: [
      "inline-flex",
      "items-center",
      "justify-center",
      "gap-2",
      "h-[56px]",
      "rounded-lg",
      "border",
      "border-solid",
      "border-base-white",
      "py-5",
      "px-6",
      "bg-transparent",
      "text-base-white",
    ],
    hover: [
      "hover:bg-base-white",
      "hover:border-none",
      "hover:text-[var(--color-base-green)]",
    ],
  },
};

const getThemeClasses = (theme: keyof typeof themeMap): string => {
  const themeConfig = themeMap[theme];
  return [...themeConfig.base, ...themeConfig.hover].join(" ");
};

export const LinkButton = ({
  children,
  to,
  theme = "primary",
  typography = "Regular/14",
}: {
  children: React.ReactNode;
  to: string;
  theme?: "primary";
  typography?: string;
}) => {
  const typographyStyles = getTextStyle(typography);

  return (
    <Link
      to={to}
      className={getThemeClasses(theme)}
      style={{ ...typographyStyles }}
    >
      {children}
    </Link>
  );
};
