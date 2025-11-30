import React, { type ComponentProps } from "react";

type TextElement =
  | "p"
  | "span"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "div";

export interface TextProps {
  as?: TextElement;
  children?: React.ReactNode;
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  as: TextElement = "p",
  children,
  className = "",
  ...rest
}) => {
  return (
    <TextElement className={className} {...rest}>
      {children}
    </TextElement>
  );
};

export type TextComponentProps = ComponentProps<typeof Text>;
