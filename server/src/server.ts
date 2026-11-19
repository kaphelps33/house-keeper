import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import type { Request, Response } from "express";

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
  password: string;
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

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "API is running" });
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
    const date = formatDate(new Date());
    const newId = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(password, 10);
    res.sendStatus(201).json({ message: "user added to database" });
    db.prepare(
      "INSERT INTO Users (id, name, username, password_hash, date_created) VALUES (?, ?, ?, ?, ?);"
    ).run(newId, name, username, hashedPassword, date);
    console.log("User added to database");
  } else {
    console.log(
      `User with username ${username} already exists! Process aborted`
    );
    res.status(409).json({ message: "User already exists!" });
  }
});

app.listen(PORT, () => console.log("Server listening on port 3000..."));
