import React, { type InputHTMLAttributes, useRef } from "react";
import { Text } from "App/components/Text";

export interface CheckBoxProps
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
}

export const FilterCheckbox: React.FC<CheckBoxProps> = ({
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
  className = "",
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const labelClasses = [
    "flex",
    "flex-row",
    "items-center",
    "justify-center",
    "w-full",
    "px-4",
    "py-3",
    "rounded-lg",
    "border",
    "border-solid",
    "cursor-pointer",
    "transition-colors",
    filterOptionDisabled
      ? "border-base-black-10 bg-transparent text-base-gray cursor-default pointer-events-none"
      : isApplied
      ? "border-base-green bg-base-green text-base-white"
      : "border-base-black-10 bg-base-white text-base-black hover:border-base-green",
    isApplied && filterOptionDisabled ? "pointer-events-auto" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`w-full ${className}`} {...rest}>
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
        <Text
          as="span"
          typography={typography}
          className={isApplied ? "text-base-white" : "text-base-black"}
        >
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
      </label>
    </div>
  );
};
