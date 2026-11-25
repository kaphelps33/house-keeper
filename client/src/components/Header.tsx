import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Button from "./atoms/button/Button";
import useLogout from "../hooks/useLogout";

/**
 * Global page header component
 */
function Header() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="p-3 flex flex-row items-center justify-between bg-light-green">
      <Link to="/" className="text-3xl font-black">
        House Keeper
      </Link>
      {auth.accessToken && (
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>
      )}
      {auth.accessToken ? (
        <Button
          children={"Logout"}
          variant="danger"
          onClick={() => signOut()}
        />
      ) : (
        <div>
          <Button
            children={"Login"}
            variant="primary"
            onClick={() => (window.location.href = "/login")}
          />
        </div>
      )}
    </header>
  );
}

export default Header;
