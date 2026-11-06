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
        <button onClick={() => (window.location.href = "/login")}>Login</button>
      </div>
    </header>
  );
}

export default Header;
