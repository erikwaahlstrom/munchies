import { Arrow } from "assets/media/icons/Arrow.tsx";

const themeMap = {
  primary: {
    base: [
      "inline-flex",
      "items-center",
      "justify-center",
      "h-[32px]",
      "w-[32px]",
      "rounded-full",
      "bg-ui-background-secondary",
      "text-base-white",
    ],
    hover: [
      // "hover:bg-base-white", "hover:text-[var(--color-base-green)]"
    ],
  },
};

const getThemeClasses = (theme: keyof typeof themeMap): string => {
  const themeConfig = themeMap[theme];
  return [...themeConfig.base, ...themeConfig.hover].join(" ");
};

export const CTAButton = ({ theme = "primary" }: { theme?: "primary" }) => {
  return (
    <button type="button" className={getThemeClasses(theme)}>
      <Arrow />
    </button>
  );
};
