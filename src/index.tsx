import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Styles } from "App/Styles";
import { Views } from "App/Views";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Styles />
    <Views />
  </StrictMode>
);
