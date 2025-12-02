export interface TextStyle {
  fontFamily?: string;
  fontStyle?: string;
  fontSize?: string;
  fontWeight?: string | number;
  lineHeight?: string;
  letterSpacing?: string;
  textTransform?: string;
}

export const textStyles: Record<string, TextStyle> = {
  "Regular/24": {
    fontFamily: '"Inter", sans-serif',
    fontStyle: "normal",
    fontSize: "1.5rem",
    fontWeight: 400,
    lineHeight: "125%",
    letterSpacing: "-0.03rem",
    textTransform: "none",
  },
  "Regular/14": {
    fontFamily: '"Inter", sans-serif',
    fontStyle: "normal",
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: "150%",
    letterSpacing: "-0.03rem",
    textTransform: "none",
  },
  "Regular/12": {
    fontFamily: '"Inter", sans-serif',
    fontStyle: "normal",
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: "100%",
    letterSpacing: "-0.03rem",
    textTransform: "none",
  },
  "Caps-Regular/12": {
    fontFamily: '"Inter", sans-serif',
    fontStyle: "normal",
    fontSize: "0.75rem",
    fontWeight: 590,
    lineHeight: "100%",
    letterSpacing: "-0.03rem",
    textTransform: "uppercase",
  },
  "Bold/48": {
    fontFamily: '"Inter", sans-serif',
    fontStyle: "normal",
    fontSize: "3rem",
    fontWeight: 760,
    lineHeight: "100%",
    letterSpacing: "-0.06rem",
    textTransform: "none",
  },
  "Bold/16": {
    fontFamily: '"Inter", sans-serif',
    fontStyle: "normal",
    fontSize: "1rem",
    fontWeight: 700,
    lineHeight: "150%",
    letterSpacing: "-0.03rem",
    textTransform: "none",
  },
  "Bold/14": {
    fontFamily: '"Inter", sans-serif',
    fontStyle: "normal",
    fontSize: "0.875rem",
    fontWeight: 700,
    lineHeight: "150%",
    letterSpacing: "-0.03rem",
    textTransform: "none",
  },
};

export const getTextStyle = (styleKey: string): TextStyle | undefined => {
  return textStyles[styleKey];
};
