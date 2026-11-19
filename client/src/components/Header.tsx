import Button from "./atoms/button/Button";

function Header() {
  return (
    <header>
      <h1>
        <a href="/">House Keeper</a>
      </h1>
      <nav>
        <ul>
          <li>
            <a href="/main">Main</a>
          </li>
        </ul>
      </nav>
      <div>
        {/* TODO: LOGIN AUTH -> CHANGE TO USERS NAME */}
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
