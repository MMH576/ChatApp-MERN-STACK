import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Hello } from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Hello />
    </BrowserRouter>
  </StrictMode>
);
