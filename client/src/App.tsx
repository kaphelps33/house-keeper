import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import useAuth from "./hooks/useAuth";

function App() {
  const { auth } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route
              path={`${auth.username}/dashboard`}
              element={<Dashboard />}
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
