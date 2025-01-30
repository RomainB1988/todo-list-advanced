import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { DarkModeProvider } from "./context/DarkModeContext.jsx"; // Import du contexte

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DarkModeProvider> {/* Appliquer le contexte à toute l'application */}
      <App />
    </DarkModeProvider>
  </StrictMode>
);
