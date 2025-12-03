import React, { type InputHTMLAttributes, useRef } from "react";
import { Text } from "App/components/Text";
import Image from "App/components/Image";

export interface CheckBoxAltProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "id" | "type" | "width" | "height"
  > {
  name: string;
  label: string | React.ReactNode;
  customListingPageUrl?: string;
  count?: number;
  filterOptionDisabled?: boolean;
  fieldName: string;
  op: string;
  isApplied: boolean;
  value: string;
  handleFilterChange: (arg: {
    fieldName: string;
    op: string;
    selectedValue: string;
  }) => void;
  typography?: string;
  theme?: "primary" | "secondary";
  imageUrl?: string;
}

const themeMap = {
  primary: {
    base: [
      "flex",
      "flex-row",
      "items-start",
      "justify-between",
      "w-40",
      "px-4",
      "py-2",
      "h-20",
      "rounded-full",
      "border-2",
      "border-solid",
      "border-base-blue",
      "bg-base-white",
      "text-base-blue",
      "cursor-pointer",
      "transition-all",
      "duration-200",
      "ease-in-out",
      "shadow-sm",
      "relative",
    ],
    hover: [
      "hover:bg-base-blue",
      "hover:text-base-white",
      "hover:shadow-md",
      "hover:scale-105",
    ],
    applied: [
      "border-base-blue",
      "bg-base-blue",
      "text-base-white",
      "shadow-md",
      "hover:shadow-lg",
      "hover:scale-105",
    ],
    disabled: [
      "border-base-gray",
      "bg-base-white",
      "text-base-gray",
      "cursor-default",
      "pointer-events-none",
      "opacity-50",
    ],
  },
  secondary: {
    base: [
      "flex",
      "flex-row",
      "items-start",
      "justify-between",
      "w-40",
      "px-4",
      "py-3",
      "h-20",
      "rounded-lg",
      "border",
      "border-solid",
      "cursor-pointer",
      "transition-colors",
      "relative",
    ],
    hover: [
      "border-base-black-10",
      "bg-base-white",
      "text-base-black",
      "hover:border-base-green",
    ],
    applied: ["border-base-green", "bg-base-green", "text-base-white"],
    disabled: [
      "border-base-black-10",
      "bg-transparent",
      "text-base-black",
      "cursor-default",
      "pointer-events-none",
    ],
  },
};

const getThemeClasses = (
  theme: "primary" | "secondary",
  isApplied: boolean,
  filterOptionDisabled: boolean
): string => {
  const themeConfig = themeMap[theme];

  if (filterOptionDisabled) {
    return [...themeConfig.base, ...themeConfig.disabled].join(" ");
  }

  if (isApplied) {
    return [...themeConfig.base, ...themeConfig.applied].join(" ");
  }

  return [...themeConfig.base, ...themeConfig.hover].join(" ");
};

export const FilterCheckboxAlt: React.FC<CheckBoxAltProps> = ({
  filterOptionDisabled = false,
  label,
  name,
  fieldName,
  value,
  isApplied,
  op,
  handleFilterChange,
  customListingPageUrl,
  typography = "Regular/14",
  theme = "primary",
  imageUrl,
  className = "",
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const labelClasses = [
    getThemeClasses(theme, isApplied, filterOptionDisabled),
    isApplied && filterOptionDisabled ? "pointer-events-auto" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const getTextColor = () => {
    if (filterOptionDisabled) return "";
    if (isApplied) {
      return theme === "primary"
        ? "text-base-white font-medium"
        : "text-base-white";
    }
    return theme === "primary"
      ? "text-base-blue font-medium"
      : "text-base-black";
  };

  return (
    <div className={`w-40 shrink-0 ${className}`} {...rest}>
      <label
        className={labelClasses}
        aria-disabled={filterOptionDisabled}
        htmlFor={name}
      >
        <input
          id={name}
          name={name}
          ref={inputRef}
          type="checkbox"
          checked={isApplied}
          disabled={filterOptionDisabled}
          aria-disabled={filterOptionDisabled}
          className="sr-only"
          onChange={() => {
            handleFilterChange({ fieldName, op, selectedValue: value });
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleFilterChange({ fieldName, op, selectedValue: value });
            }
          }}
        />
        <Text as="span" typography={typography} className={getTextColor()}>
          {customListingPageUrl ? (
            <a
              href={customListingPageUrl}
              onClick={(e) => {
                e.preventDefault();
              }}
              className="no-underline text-inherit pointer-events-none"
            >
              {label}
            </a>
          ) : (
            label
          )}
        </Text>
        {imageUrl && (
          <Image
            src={imageUrl}
            key={name}
            loading="lazy"
            alt={typeof label === "string" ? label : ""}
            className="object-cover absolute right-0 top-0 h-20 w-20"
          />
        )}
      </label>
    </div>
  );
};
