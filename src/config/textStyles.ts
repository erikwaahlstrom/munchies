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
  "Regular/48": {
    fontFamily: '"Inter", sans-serif',
    fontStyle: "normal",
    fontSize: "4.8rem",
    fontWeight: 760,
    lineHeight: "100%",
    letterSpacing: "-0.1rem",
    textTransform: "none",
  },
  "Regular/14": {
    fontFamily: '"Inter", sans-serif',
    fontStyle: "normal",
    fontSize: "1.4rem",
    fontWeight: 400,
    lineHeight: "150%",
    letterSpacing: "-0.05rem",
    textTransform: "none",
  },
};

export const getTextStyle = (styleKey: string): TextStyle | undefined => {
  return textStyles[styleKey];
};
