import Database from "better-sqlite3";

const database = new Database("database.db");

database.pragma("journal_mode = WAL");
database.pragma("foreign_keys = on");

/**
 * Creates a new User table if one does not exist
 *  id: (Primary Key) unique identifier
 *  name: name of the user
 *  username: username of the user
 *  password_hash: hashed password
 *  date_created: the date the user was created
 *  refresh_token: the users refresh token
 */
database.exec(
  `CREATE TABLE IF NOT EXISTS User (
        user_id INT PRIMARY KEY,
        name TEXT NOT NULL,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        date_created TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        refresh_token TEXT DEFAULT 0
    );`
);

/**
 * Creates a new Home table if one does not exist
 *  id: (Primary Key) unique identifier
 *  name: name of the Home
 *  date_created: the date the user was created
 */
database.exec(
  `CREATE TABLE IF NOT EXISTS Home (
        home_id INT PRIMARY KEY,
        name TEXT NOT NULL,
        date_created TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`
);

/**
 * Creates a new Home table if one does not exist
 *  home_id: ID of home
 *  user_id: ID of user
 *  Primary key is made of of home_id and user_id
 * This is a junction table. Many users can have many homes
 */
database.exec(
  `CREATE TABLE IF NOT EXISTS UserHome(
        home_id INT,
        user_id INT,
        PRIMARY KEY (home_id, user_id),
        FOREIGN KEY(home_id) REFERENCES Home(home_id),
        FOREIGN KEY(user_id) REFERENCES User(user_id)
    );`
);

database.exec(
  `CREATE TABLE IF NOT EXISTS Room (
        room_id INT PRIMARY KEY,
        name TEXT NOT NULL,
        date_created TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        home_id INT,
        FOREIGN KEY(home_id) REFERENCES Home(home_id)
    );`
);

/**
 * Creates a new Item table if one does not already exists.
 *  id: (Primary Key) unique identifier
 *  name: name of the item
 *  price: price of the item in cents (store $1.00 as 1.00 * 100 = 100, display as 100 / 100 = 1)
 *  date_added: the date the item was added to the database
 *  date_expire: the date that the item will expire on (since some items do not expire, this is nullable)
 *  added_by: the ID of the user the item was added by
 *  room_id: (Foreign Key) the id of the room the items belongs to
 */
database.exec(
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

console.log("Database connected...");

export default database;
