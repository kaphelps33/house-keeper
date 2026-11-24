import Button from "../components/atoms/button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { isAxiosError } from "axios";

interface NewUser {
  name: string;
  username: string;
  password: string;
}

const NAME_REGEX = /^[a-zA-Z]+.{2,}$/;
const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{2,20}$/;
const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const SIGN_UP_URL = "/sign-up";

function SignUp() {
  const nameRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [match, setMatch] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // sets focus on username input when component loads
  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  useEffect(() => {
    const result = NAME_REGEX.test(name);
    setValidName(result);
  }, [name]);

  useEffect(() => {
    const result = USERNAME_REGEX.test(username);
    setValidUsername(result);
  }, [username]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
    const matching = password === match;
    setValidMatch(matching);
  }, [password, match]);

  useEffect(() => {
    setError("");
  }, [name, username, password, match]);

  const addUser = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    // if button is enabled with a JavaScript hack
    const v0 = NAME_REGEX.test(name);
    const v1 = USERNAME_REGEX.test(username);
    const v2 = PASSWORD_REGEX.test(password);

    if (!v0 || !v1 || !v2) {
      setError("Invalid Entry");
      return;
    }

    try {
      const response = await axios.post(
        SIGN_UP_URL,
        JSON.stringify({ name, username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );
      alert("Sign up successful!");
    } catch (error) {
      if (isAxiosError(error)) {
        if (!error.response) {
          setError("No server response");
        } else if (error.response.status === 409) {
          setError("Username taken!");
        } else {
          setError("Registration failed.");
        }
      } else {
        console.error(error);
      }
    }
  };

  return (
    <section className="flex flex-col items-center justify-center w-screen h-fill bg-off-white text-gray-700">
      <title>House Keeper | Sign Up</title>
      {/* Error message */}
      <p
        ref={errorRef}
        className={`${error ? "bg-danger text-off-white" : "hidden"}`}
        aria-live="assertive"
      >
        {error}
      </p>
      <h2 className="font-bold text-xl">Welcome!</h2>
      <form
        onSubmit={addUser}
        className="flex flex-col bg-white rounded shadow-lg p-8 mt-1"
      >
        {/* Name Label */}
        <label htmlFor="name" className="font-semibold text-xs">
          Name:
          {/* Green check for valid input */}
          <span className={`${validName ? "text-green-500" : "hidden"}`}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          {/* Red "x" for invalid input */}
          <span className={`${validName || !name ? "hidden" : "text-danger"}`}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        {/* Name Input */}
        <input
          className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          type="text"
          id="name"
          ref={nameRef}
          placeholder="Name"
          min={2}
          max={20}
          autoCapitalize="words"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setNameFocus(true)}
          onBlur={() => setNameFocus(false)}
        />
        {/* Name input information popup */}
        <p
          id="uidnote"
          className={`${nameFocus && name && !validName ? "bg-danger w-64 text-xs text-off-white p-2 rounded mt-2" : "hidden"}`}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          First Name; 2--20 characters; letters only
        </p>
        {/* Username Input */}
        <label htmlFor="username" className="font-semibold text-xs mt-3">
          Username:
          <span className={`${validUsername ? "text-green-500" : "hidden"}`}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span
            className={`${validUsername || !username ? "hidden" : "text-danger"}`}
          >
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          type="text"
          id="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
          aria-invalid={validUsername ? "false" : "true"}
          aria-describedby="usernote"
          onFocus={() => setUsernameFocus(true)}
          onBlur={() => setUsernameFocus(false)}
          min={1}
          max={12}
          autoComplete="off"
        />
        <p
          id="usernote"
          className={`${usernameFocus && username && !validUsername ? "bg-danger w-64 text-xs text-off-white p-2 rounded mt-2" : "hidden"}`}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Username: 2--20 characters
          <br />
          must begin with a letter
          <br />
          letters, numbers, underscores, and hyphens allowed
        </p>
        {/* Password */}
        <label htmlFor="password" className="font-semibold text-xs mt-3">
          Password
          <span className={`${validPassword ? "text-green-500" : "hidden"}`}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span
            className={`${validPassword || !password ? "hidden" : "text-danger"}`}
          >
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
          placeholder="Password"
          aria-describedby="passwordnote"
        />
        <p
          id="passwordnote"
          className={`${passwordFocus && !validPassword ? "bg-danger w-64 text-xs text-off-white p-2 rounded mt-2" : "hidden"}`}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          8-24 characters.
          <br />
          Must include uppercase and lowercase letters, a number, and a special
          character.
          <br />
          Allowed special characters:{" "}
          <span aria-label="exclamation point">!</span>,{" "}
          <span aria-label="at symbol">@</span>,{" "}
          <span aria-label="pound sign or hashtag">#</span>,{" "}
          <span aria-label="dollar sign">$</span>,{" "}
          <span aria-label="percent sign">%</span>
        </p>
        {/* Confirm (match) Password */}
        <label
          htmlFor="confirm-password"
          className="font-semibold text-xs mt-3"
        >
          Confirm Password
          <span
            className={`${validMatch && match ? "text-green-500" : "hidden"}`}
          >
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span
            className={`${validMatch || !match ? "hidden" : "text-danger"}`}
          >
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          type="password"
          id="confirm-password"
          onChange={(e) => setMatch(e.target.value)}
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
          placeholder="Confirm Password"
          aria-describedby="confirmnote"
        />
        <p
          id="confirmnote"
          className={`${matchFocus && !validMatch ? "bg-danger w-64 text-xs text-off-white p-2 rounded mt-2" : "hidden"}`}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match password.
        </p>
        <Button
          children="Sign Up"
          variant="primary"
          type="submit"
          disabled={
            !validName || !validUsername || !validPassword || !validMatch
              ? true
              : false
          }
        />
        <div className="flex justify-center">
          <small>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:text-blue-500">
              Sign in
            </Link>
          </small>
        </div>
      </form>
    </section>
  );
}
export default SignUp;
