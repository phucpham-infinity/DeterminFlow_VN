import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ExtensionProvider } from "./extensions/context";
import { initializeTheme } from "./lib/theme";
import { ThemeProvider } from "./theme";
import { DialogProvider } from "./components/ui/dialog-provider";
import { I18nProvider } from "./i18n";
import "./index.css";

initializeTheme();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nProvider>
      <ThemeProvider>
        <ExtensionProvider>
          <DialogProvider><App /></DialogProvider>
        </ExtensionProvider>
      </ThemeProvider>
    </I18nProvider>
  </React.StrictMode>
);
