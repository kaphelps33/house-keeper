import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.tsx";
import "./index.css";
import App from "./pages/App.tsx";
import RequireAuth from "./components/RequireAuth.tsx";
import Header from "./components/Header.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* TODO: USER CAN VIEW MAIN ONLY WHEN LOGGED IN */}
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<App />} />
          </Route>
          {/* TODO: LOGIN AND SIGNUP ONLY WHEN USER IS NOT LOGGED IN */}
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
