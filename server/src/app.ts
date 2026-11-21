import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import type { Request, Response } from "express";

require("dotenv").config();

const db = new Database("database.db");

db.exec(
  `CREATE TABLE IF NOT EXISTS Users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        date_created TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
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
app.use(cors());
app.use(express.json());

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
    return res.sendStatus(201).json({ message: "user added to database" });
  } else {
    res.status(409).json({ message: "User already exists!" });
    console.log(
      `User with username ${username} already exists! Process aborted`
    );
  }
});

app.post("/log-in", async (req: Request, res: Response) => {
  console.log("Attempting login with user credentials...");

  const { username, password } = req.body;

  // if proper information is not given, abort immediately
  if (!username || !password) {
    res.status(400).json({
      message: "username, password required",
      User: []
    });
  }

  const user = db
    .prepare("SELECT * FROM Users WHERE username = ?;")
    .get(username) as User | undefined;

  // if the user does not exist, send empty array
  if (!user) {
    console.log(`Could not find user with name ${username}`);
    res.status(401).json({ message: "username not found", User: [] });
  } else {
    const storedHash = user.password_hash;

    const isMatch = await bcrypt.compare(password, storedHash);
    // check if passwords match; if not, alert; if so, log in
    if (!isMatch) {
      res.status(401).json({ message: "incorrect password", User: [] });
    } else {
      console.log("All checks passed! User logged in!");
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: user.username
          }
        },
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: "1h" }
      );
      return res
        .status(200)
        .json({ message: "success", User: { user }, accessToken });
    }
  }
});
