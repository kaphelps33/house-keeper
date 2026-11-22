import Button from "./atoms/button/Button";
import useAuth from "../hooks/useAuth";

function Header() {
  const user = useAuth();
  return (
    <header>
      <h1>
        <a href="/">House Keeper</a>
      </h1>
      <nav>
        <ul>
          {user && (
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
          )}
        </ul>
      </nav>
      <div>
        <Button
          children={"Login"}
          variant="primary"
          onClick={() => (window.location.href = "/login")}
        />
      </div>
    </header>
  );
}

export default Header;
