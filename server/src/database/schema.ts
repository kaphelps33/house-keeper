import db from "./connection";

db.exec(
  `CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        date_created TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`
);
