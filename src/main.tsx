import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TitleUpdater = () => {
  const { t } = useTranslation();
  
  React.useEffect(() => {
    document.title = t('title');
  }, [t]);

  return null;
};

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <TitleUpdater />
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  // Handle the case where the element is not found (optional)
  console.error("Element with id 'root' not found in the DOM.");
}
