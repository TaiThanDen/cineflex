import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Inspector } from "react-dev-inspector";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Inspector />
    <App />
  </StrictMode>
);
