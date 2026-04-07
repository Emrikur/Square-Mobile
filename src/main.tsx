
import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/header.tsx";
import Footer from "./components/footerNav.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Header/>
      <App />
      <Footer/>
    </StrictMode>
  </BrowserRouter>
);
