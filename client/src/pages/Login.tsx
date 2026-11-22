import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/atoms/button/Button";
import useAuth from "../hooks/useAuth";
import "./Login.css";

function Login() {
  const userRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = { username, password };

    if (username === "" || password === "") {
      // if the user submits by forcing the button to submit, abort and reset
      alert(
        "Form not submitted properly.\nPlease make sure all fields are filled out prior to submission."
      );
      window.location.reload();
    }

    try {
      const response = await fetch("http://localhost:3000/log-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "success") {
            localStorage.setItem("jwt", data.token);
            console.log(data);
            setUsername("");
            setPassword("");
            setSuccess(true);
            setAuth(data);
            navigate("/dashboard", { replace: true });
          } else {
            switch (data.status) {
              case 400:
                setErrorMessage("Username and password are required!");
                break;
              case 401:
                setErrorMessage("Incorrect username or password!");
                break;
            }
          }
        });
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "An unexpected error occurred!"
      );
    }
  };

  // focus on username field on page load
  useEffect(() => {
    userRef.current?.focus();
  }, []);

  // clears errors
  useEffect(() => {
    setErrorMessage("");
  }, [username, password]);

  return (
    <main className="login-container">
      <section className="login-wrapper">
        <p
          ref={errorRef}
          className={errorMessage ? "error-message" : "offscreen"}
          aria-live="assertive"
        >
          {errorMessage}
        </p>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(event) => setUsername(event.target.value)}
            value={username}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            required
          />

          {/* <button type="submit">Log In</button> */}
          <Button variant="primary" type="submit" children="Log In" />
        </form>
        <small>
          Don't have an account? <a href="/sign-up">Make one here!</a>
        </small>
      </section>
    </main>
  );
}

export default Login;
