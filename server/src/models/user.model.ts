import database from "../db/db";

interface UserModel {
  id: string;
  name: string;
  username: string;
  password_hash: string;
  date_created: string;
  refreshToken: string;
}

/**
 * Functions for manipulating a user in the database
 */
const User = {
  /**
   * Searches the database for a user by an ID
   * @param userId id as a string to search for
   * @returns a User object of the found user or null if no user was found
   */
  getById(userId: string) {
    return database
      .prepare("SELECT * FROM User WHERE id = ?")
      .get(userId) as UserModel | null;
  },
  /**
   * Searches the database for a use by a username
   * @param username the username of the user to search for
   * @returns a User object with a matching username or null if no user was found
   */
  getByUsername(username: string) {
    return database
      .prepare("SELECT * FROM User WHERE username = ?")
      .get(username.toLowerCase()) as UserModel | null;
  },
  /**
   * Adds a new user to the database
   * @param name name of new user as a string
   * @param username username of new user as a string
   * @param password hashed password of new user as a string
   * @param date current date and time as a string
   */
  createNewUser(
    name: string,
    username: string,
    password: string,
    date: string
  ) {
    database
      .prepare(
        "INSERT INTO User (name, username, password_hash, date_created) VALUES (?, ?, ?, ?);"
      )
      .run(name, username.toLowerCase(), password, date);
  },
  /**
   * Check if a user exists based on a username
   * @param username Username of user to search for
   * @returns true if the user exists, false otherwise
   */
  doesUserExist(username: string) {
    return this.getByUsername(username) ? true : false;
  }
};

export default User;
