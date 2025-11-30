import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { writeFileSync } from "fs";
import { customColors } from "./src/config/colors";

// Plugin to auto-generate customColors.css from config
const generateColorsPlugin = () => {
  const generateCss = () => {
    const themeCss = `@theme {
${Object.entries(customColors)
  .map(([key, value]) => {
    const cssValue =
      typeof value === "string" && value.startsWith("#")
        ? value.toLowerCase()
        : value;
    return `  --color-${key}: ${cssValue};`;
  })
  .join("\n")}
}
`;

    writeFileSync(
      path.resolve(__dirname, "./src/config/colors/customColors.css"),
      themeCss,
      "utf-8"
    );
  };

  return {
    name: "generate-colors-css",
    buildStart() {
      generateCss();
    },
    handleHotUpdate({ file }: { file: string }) {
      if (file.includes("config/colors/index.ts")) {
        generateCss();
      }
    },
  };
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [generateColorsPlugin(), react()],
  resolve: {
    alias: {
      App: path.resolve(__dirname, "./src/App"),
      assets: path.resolve(__dirname, "./src/assets"),
    },
  },
});
