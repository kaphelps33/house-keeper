import Database from "better-sqlite3";

export function makeTestDB() {
  const db = new Database(":memory");
  db.pragma("foreign_keys = ON");

  db.exec(
    `CREATE TABLE IF NOT EXISTS User (
        user_id INT PRIMARY KEY,
        name TEXT NOT NULL,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        date_created TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        refresh_token TEXT DEFAULT 0
    );`
  );

  db.exec(
    `CREATE TABLE IF NOT EXISTS Home (
        home_id INT PRIMARY KEY,
        name TEXT NOT NULL,
        date_created TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`
  );

  db.exec(
    `CREATE TABLE IF NOT EXISTS UserHome(
        home_id INT,
        user_id INT,
        PRIMARY KEY (home_id, user_id),
        FOREIGN KEY(home_id) REFERENCES Home(home_id),
        FOREIGN KEY(user_id) REFERENCES User(user_id)
    );`
  );

  db.exec(
    `CREATE TABLE IF NOT EXISTS Room (
        room_id INT PRIMARY KEY,
        name TEXT NOT NULL,
        date_created TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        home_id INT,
        FOREIGN KEY(home_id) REFERENCES Home(home_id)
    );`
  );

  db.exec(
    `CREATE TABLE IF NOT EXISTS Item (
        item_id INT PRIMARY KEY,
        name TEXT NOT NULL,
        price INT NOT NULL,
        date_added TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        date_expire TEXT,
        added_by INT,
        room_id INT,
        FOREIGN KEY(added_by) REFERENCES User(user_id),
        FOREIGN KEY(room_id) REFERENCES Room(room_id)
    );`
  );

  return db;
}
