import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Button from "./atoms/button/Button";

/**
 * Global page header component
 */
function Header() {
  const { auth } = useAuth();
  return (
    <header className="p-3 flex flex-row items-center justify-between bg-light-green">
      <Link to="/" className="text-3xl font-black">
        House Keeper
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
      {auth.accessToken ? (
        <p>Hello {auth.username}!</p>
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
