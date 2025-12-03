import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { writeFileSync, readFileSync } from "fs";
import { existsSync } from "fs";
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

// Plugin to serve /images/*.png from assets/media/images folder
const imagesPathPlugin = (): Plugin => {
  return {
    name: "images-path-plugin",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith("/images/") && req.url.endsWith(".png")) {
          const filename = req.url.replace("/images/", "");
          const assetPath = path.resolve(
            __dirname,
            "./src/assets/media/images",
            filename
          );

          if (existsSync(assetPath)) {
            const fileContent = readFileSync(assetPath);
            res.setHeader("Content-Type", "image/png");
            res.setHeader("Content-Length", fileContent.length);
            res.end(fileContent);
            return;
          }
        }
        next();
      });
    },
  };
};

// https://vite.dev/config/
export default defineConfig({
  // base: process.env.VITE_BASE_PATH || "/munchies",
  plugins: [generateColorsPlugin(), imagesPathPlugin(), react()],
  resolve: {
    alias: {
      App: path.resolve(__dirname, "./src/App"),
      assets: path.resolve(__dirname, "./src/assets"),
      config: path.resolve(__dirname, "./src/config"),
      hooks: path.resolve(__dirname, "./src/hooks"),
    },
  },
});
