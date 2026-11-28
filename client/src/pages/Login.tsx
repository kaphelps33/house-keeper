import { useState, useRef, useEffect } from "react";
import { useNavigate, Link, useLocation, data } from "react-router-dom";
import axios from "../api/axios";
import Button from "../components/atoms/button/Button";
import useAuth from "../hooks/useAuth";
import { isAxiosError } from "axios";

const LOGIN_URL = "/log-in";

function Login() {
  const { setAuth, persist, setPersist } = useAuth();
  const userRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // focus on username field on page load
  useEffect(() => {
    userRef.current?.focus();
  }, []);

  // clears errors if user changes username or password
  useEffect(() => {
    setError("");
  }, [username, password]);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username || !password) {
      // if the user submits by forcing the button to submit, abort and reset
      alert(
        "Form not submitted properly.\nPlease make sure all fields are filled out prior to submission."
      );
      window.location.reload();
    }

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );
      setUsername("");
      setPassword("");
      const accessToken = response?.data?.jwt;
      setAuth({ username, accessToken });
      navigate(`/${username}/dashboard`, { replace: true });
    } catch (error) {
      if (isAxiosError(error)) {
        if (!error.response) {
          // if the server gives no response
          setError("No server response");
        } else if (error.response.status === 400) {
          // if the username or password is missing
          setError("Missing username or password");
        } else if (error.response.status === 401) {
          setError("Incorrect username or password");
        } else {
          setError("Registration failed.");
        }
        errorRef.current?.focus();
      }
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <section className="flex flex-col items-center justify-center w-screen h-fill bg-off-white text-gray-700">
      <title>House Keeper | Log In</title>
      {/* Error message */}
      <p
        ref={errorRef}
        className={`${error ? "bg-danger text-off-white" : "hidden"}`}
        aria-live="assertive"
      >
        {error}
      </p>
      {/* Heading */}
      <h2 className="font-bold text-xl">Login</h2>
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white rounded shadow-lg p-8 mt-1"
      >
        {/* Username field */}
        <label htmlFor="username" className="font-semibold text-xs">
          Username
        </label>
        <input
          className="flex items-center h-12 px-4 w-64 bg-gray-200 rounded focus:outline-none focus:ring-2"
          type="text"
          id="username"
          ref={userRef}
          value={username}
          autoComplete="off"
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
          required
        />
        {/* Password Field */}
        <label htmlFor="password" className="font-semibold text-xs mt-3">
          Password
        </label>
        <input
          className="flex items-center h-12 px-4 w-64 bg-gray-200 mb-3 rounded focus:outline-none focus:ring-2"
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          required
        />
        <Button variant="primary" type="submit" children="Log In" />
        <div className="flex gap-1">
          <input
            type="checkbox"
            id="persist"
            onChange={() => togglePersist()}
            checked={persist}
          />
          <label htmlFor="persist" className="text-gray-600">
            <small>Trust this device?</small>
          </label>
        </div>
        <div className="flex justify-center">
          <small>
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-blue-400 hover:text-blue-500">
              Make one!
            </Link>
          </small>
        </div>
      </form>
    </section>
  );
}

export default Login;
