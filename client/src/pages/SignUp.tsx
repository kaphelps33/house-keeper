import "./Login.css";
import { useState } from "react";
import Button from "../components/atoms/button/Button";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <main className="login-container">
      <section className="login-wrapper">
        <h2>Sign Up</h2>
        <form action="POST" className="login-form">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            min={1}
            max={12}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            min={8}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            name="confirm-password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            children="Sign Up"
            type="submit"
            disabled={password === "" || password !== confirmPassword}
          />
        </form>
        <a href="/login">Already have an account? Log in here!</a>
      </section>
    </main>
  );
}
export default SignUp;
