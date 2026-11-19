import "./Login.css";
import Button from "../components/atoms/button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface NewUser {
  name: string;
  username: string;
  password: string;
}

function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [match, setMatch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const addUser = async (event: React.SubmitEvent<HTMLFormElement>) => {
    console.log("Adding user...");
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const newUser: NewUser = { name, username, password };

    try {
      const response = await fetch("http://localhost:3000/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      });

      if (!response.ok) {
        if (response.status == 409) {
          // Failed to add user to database due to conflicting usernames.
          alert(
            `A user with the username ${username} already exists! Please provide a different username and try again.`
          );
        }
      } else {
        // if the user creation is successful, redirect to login
        navigate("/login", { replace: true });
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="login-container">
      <title>House Keeper | Sign Up</title>
      <section className="login-wrapper">
        <h2 className="form-header-label">Sign Up</h2>
        <small>Sign up and start tracking your household!</small>
        <form onSubmit={addUser} className="login-form">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            min={1}
            max={12}
            autoCapitalize="words"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="true"
          />
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            min={1}
            max={12}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="true"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            min={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="true"
          />
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            name="confirm-password"
            placeholder="Confirm Password"
            value={match}
            onChange={(e) => setMatch(e.target.value)}
            autoComplete="false"
          />
          <Button
            children="Sign Up"
            variant="primary"
            type="submit"
            disabled={password === "" || password !== match}
          />
        </form>
        <small>
          Already have an account? <a href="/login">Sign in</a>
        </small>
      </section>
    </main>
  );
}
export default SignUp;
