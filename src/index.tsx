import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Styles } from "App/Styles";
import { Views } from "App/Views";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Styles />
      <Views />
    </BrowserRouter>
  </StrictMode>
);
