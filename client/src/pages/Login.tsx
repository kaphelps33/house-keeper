import { useState } from "react";
import "./Login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <main className="login-container">
      <section className="login-wrapper">
        <h2>Login</h2>
        <form action="" className="login-form">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" />
          <label htmlFor="password">Password</label>
          <input type={showPassword ? "text" : "password"} name="password" />
          <button
            type="button"
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
          >
            {showPassword ? "Hide" : "Show"} Password
          </button>

          <button type="submit">Log In</button>
        </form>
        <a href="/sign-up">Don't have an account? Make one here!</a>
      </section>
    </main>
  );
}

export default Login;
