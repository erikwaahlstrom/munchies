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
  // Regular

  "Regular/14": {
    fontFamily: '"Inter", sans-serif',
    fontStyle: "normal",
    fontSize: "1.4rem",
    fontWeight: 400,
    lineHeight: "150%",
    letterSpacing: "-0.05rem",
    textTransform: "none",
  },

  // Caps
  "Caps-Regular/12": {
    fontFamily: '"Inter", sans-serif',
    fontStyle: "normal",
    fontSize: "1.2rem",
    fontWeight: 590,
    lineHeight: "100%",
    letterSpacing: "-0.05rem",
    textTransform: "uppercase",
  },

  // Bold
  "Bold/48": {
    fontFamily: '"Inter", sans-serif',
    fontStyle: "normal",
    fontSize: "4.8rem",
    fontWeight: 760,
    lineHeight: "100%",
    letterSpacing: "-0.1rem",
    textTransform: "none",
  },
  "Bold/16": {
    fontFamily: '"Inter", sans-serif',
    fontStyle: "normal",
    fontSize: "1.6rem",
    fontWeight: 700,
    lineHeight: "150%",
    letterSpacing: "-0.05rem",
    textTransform: "none",
  },
  "Bold/14": {
    fontFamily: '"Inter", sans-serif',
    fontStyle: "normal",
    fontSize: "1.4rem",
    fontWeight: 700,
    lineHeight: "150%",
    letterSpacing: "-0.05rem",
    textTransform: "none",
  },
};

export const getTextStyle = (styleKey: string): TextStyle | undefined => {
  return textStyles[styleKey];
};
