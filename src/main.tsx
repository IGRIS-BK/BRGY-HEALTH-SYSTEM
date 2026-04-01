import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "sonner"; // ✅ use directly (safe)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <TooltipProvider>
        <App />
        <Toaster richColors position="top-right" /> {/* ✅ ADD THIS */}
      </TooltipProvider>
    </BrowserRouter>
  </React.StrictMode>
);