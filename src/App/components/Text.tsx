import React, { type ComponentProps } from "react";
import { getTextStyle } from "config/textStyles";

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
  typography?: string;
}

export const Text: React.FC<TextProps> = ({
  as: TextElementComponent = "p",
  children,
  className = "",
  typography = "Regular/14",
  ...rest
}) => {
  const getTypographyStylesObject = (typographyKeys: string) => {
    const textStyle = getTextStyle(typographyKeys);
    if (!textStyle) return { className };

    return {
      className,
      style: textStyle,
    };
  };

  const typographyStyles = getTypographyStylesObject(typography);

  return (
    <TextElementComponent {...typographyStyles} {...rest}>
      {children}
    </TextElementComponent>
  );
};

export type TextComponentProps = ComponentProps<typeof Text>;
