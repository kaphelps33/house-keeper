import type { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";

var jwt = require("jsonwebtoken");

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

export const signUp = async (req: Request, res: Response) => {
  const {
    name,
    username,
    password
  }: { name: string; username: string; password: string } = req.body;

  // if proper information is not given, abort immediately
  if (!name || !username || !password) {
    return res
      .status(404)
      .json({ error: "Name, Username, and Password are required!" });
  }

  // check if user exists
  const user = User.doesUserExist(username);

  // if user does not exist, add them to the database
  if (!user) {
    // date and time of creation: date_time
    const date = formatDate(new Date());
    const hashedPassword = await bcrypt.hash(password, 10);
    // Add new user to database
    User.createNewUser(name, username, hashedPassword, date);
    console.log("User added to database");
    return res.status(201).json({ message: "user added to database" });
  } else {
    console.log(
      `User with username ${username} already exists! Process aborted`
    );
    return res.status(409).json({ message: "User already exists!" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // if proper information is not given, abort immediately
  if (!username || !password) {
    res.status(400).json({
      message: "username, password required"
    });
  }

  // get user from db with given username
  const user = User.getByUsername(username) as User | undefined;

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
        { expiresIn: "15s" }
      );
      // jwt refresh token
      const refreshToken = jwt.sign(
        { username: user.username },
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: "1d" }
      ) as string;

      User.updateUserRefreshToken(refreshToken, user.id);

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });

      console.log("All checks passed! User logged in!");
      return res.status(200).json({ message: "success", jwt: { accessToken } });
    }
  }
};

export const refresh = async (req: Request, res: Response) => {
  console.log("refreshing...");
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(401);
  }

  const refreshToken = cookies.jwt;
  const foundUser = User.getUserByRefreshToken(refreshToken);

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
};

export const logout = async (req: Request, res: Response) => {
  console.log("Logging out...");
  const cookie = req.cookies;
  if (!cookie.jwt) {
    return res.sendStatus(204); // No content
  }
  const refreshToken = cookie.jwt;

  // is refresh token in db
  const foundUser = User.getUserByRefreshToken(refreshToken);

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, secure: true });
    return res.sendStatus(204);
  }

  // clear users refresh token
  User.updateUserRefreshToken("", foundUser.id);

  res.clearCookie("jwt", { httpOnly: true, secure: true });
  res.sendStatus(204);
};
