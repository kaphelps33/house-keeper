import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import type { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

require("dotenv").config();

const db = new Database("database.db");

db.exec(
  `CREATE TABLE IF NOT EXISTS Users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        date_created TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        refresh_token TEXT DEFAULT 0
    );`
);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = on");

interface User {
  id: string;
  name: string;
  username: string;
  password_hash: string;
  date_created: string;
  refreshToken: string;
}

function padTwoDigits(num: number) {
  return num.toString().padStart(2, "0");
}

function formatDate(date: Date, dateDivider: string = "-") {
  return (
    [
      date.getFullYear(),
      padTwoDigits(date.getMonth() + 1),
      padTwoDigits(date.getDate())
    ].join(dateDivider) +
    " " +
    [
      padTwoDigits(date.getHours()),
      padTwoDigits(date.getMinutes()),
      padTwoDigits(date.getSeconds())
    ].join(":")
  );
}

export const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());

var jwt = require("jsonwebtoken");

app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

app.post("/sign-up", async (req: Request, res: Response) => {
  const { name, username, password } = req.body;

  // if proper information is not given, abort immediately
  if (!name || !username || !password) {
    return res
      .status(404)
      .json({ error: "Name, Username, and Password are required!" });
  }

  // check if user exists
  const findUser = db.prepare(
    "SELECT id, username FROM Users WHERE username = ?;"
  );

  const user = findUser.get(username) as User | undefined;

  // if user does not exist, add them to the database
  if (!user) {
    // user id
    const newId = crypto.randomUUID();
    // date and time of creation: date_time
    const date = formatDate(new Date());
    const hashedPassword = await bcrypt.hash(password, 10);
    db.prepare(
      "INSERT INTO Users (id, name, username, password_hash, date_created) VALUES (?, ?, ?, ?, ?);"
    ).run(newId, name, username, hashedPassword, date);
    console.log("User added to database");
    return res.status(201).json({ message: "user added to database" });
  } else {
    console.log(
      `User with username ${username} already exists! Process aborted`
    );
    return res.status(409).json({ message: "User already exists!" });
  }
});

app.post("/log-in", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // if proper information is not given, abort immediately
  if (!username || !password) {
    res.status(400).json({
      message: "username, password required"
    });
  }

  // get user from db with given username
  const user = db
    .prepare("SELECT * FROM Users WHERE username = ?;")
    .get(username) as User | undefined;

  // if the user does not exist, send empty object
  if (!user) {
    console.log(`Could not find user with name ${username}`);
    res.status(401).json({ message: "username not found" });
  } else {
    const isMatch = await bcrypt.compare(password, user.password_hash);
    // check if passwords match; if not, alert; if so, log in
    if (!isMatch) {
      console.log("Incorrect password");
      res.status(401).json({ message: "incorrect password" });
    } else {
      // jwt access token
      const accessToken = jwt.sign(
        {
          username: user.username
        },
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: "1m" }
      );
      // jwt refresh token
      const refreshToken = jwt.sign(
        { username: user.username },
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: "1d" }
      );

      db.prepare("UPDATE Users SET refresh_token = ? WHERE id = ?").run(
        refreshToken,
        user.id
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });

      console.log("All checks passed! User logged in!");
      return res.status(200).json({ message: "success", jwt: { accessToken } });
    }
  }
});

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.send(401);
  }
  console.log(authHeader);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
    if (err) {
      // invalid token
      return res.status(403);
    }
    req.user = decoded.username;
    next();
  });
};

app.get("/refresh", (req: Request, res: Response, next: NextFunction) => {
  console.log("refreshing");
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(401);
  }

  const refreshToken = cookies.jwt;
  const foundUser = db
    .prepare("SELECT * FROM Users WHERE refresh_token = ?")
    .get(refreshToken) as User;
  if (!foundUser) {
    return res.status(403); // forbidden
  }
  jwt.verify(refreshToken, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) {
      return res.sendStatus(403);
    }
    const accessToken = jwt.sign(
      { username: decoded.username },
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: "10s" }
    );
    res.json({ accessToken });
  });
});

app.get("/logout", (req: Request, res: Response) => {
  console.log("Logging out...");
  const cookie = req.cookies;
  if (!cookie.jwt) {
    return res.sendStatus(204); // No content
  }
  const refreshToken = cookie.jwt;

  // is refresh token in db
  const foundUser = db
    .prepare("SELECT * FROM Users WHERE refresh_token = ?")
    .get(refreshToken) as User;

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, secure: true });
    return res.sendStatus(204);
  }

  // clear users refresh token
  db.prepare("UPDATE Users SET refresh_token = '' WHERE id = ?").run(
    foundUser.id
  );

  res.clearCookie("jwt", { httpOnly: true, secure: true });
  res.sendStatus(204);
});
