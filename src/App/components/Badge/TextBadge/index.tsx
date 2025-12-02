import React from "react";
import { Text } from "App/components/Text";

export interface TextBadgeProps {
  label?: React.ReactNode;
}

export const TextBadge = ({ label }: TextBadgeProps) => (
  <Text typography="Regular/12">{label}</Text>
);

export default TextBadge;
