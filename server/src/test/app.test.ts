import { it, beforeAll, beforeEach, afterEach, afterAll } from "vitest";
import request from "supertest";
import { app } from "../app";
import type Database from "better-sqlite3";
import { makeTestDB } from "./testDb";
import { describe } from "node:test";

let db: Database.Database;

beforeAll(() => {
  db = makeTestDB();
});
beforeEach(() => {
  db.exec("SAVEPOINT t");
});
afterEach(() => {
  db.exec("ROLLBACK to t");
});
afterAll(() => {
  db.close();
});

it("GET /api/health returns 200 and status ok", () => {
  request(app).get("/api/health").expect(200).expect({ status: "ok" });
});

describe("/sign-up", () => {
  it("POST /sign-up missing data; returns 404 and error", () => {
    request(app)
      .post("/sign-up")
      .send({ name: "name", username: "username" })
      .expect(404)
      .expect({ error: "Name, Username, and Password are required!" });
  });

  it("POST /sign-up with correct credentials; returns 200 and message success", () => {
    request(app)
      .post("/sign-up")
      .send({ name: "test", username: "tester", password: "Testuser1234!" })
      .expect(200)
      .expect({ message: "success" });
  });

  it("POST /sign-up with username that exists; returns 409 and message that user already exists", () => {
    db.prepare(
      "INSERT INTO User (name, username, password_hash, date_created) VALUES (?, ?, ?, ?);"
    ).run("test", "tester", "a1b2c3", "10-28-2026 10:00:00");

    request(app)
      .post("/sign-up")
      .send({ name: "test", username: "tester", password: "Testuser1234!" })
      .expect(409)
      .expect({ message: "User already exists!" });
  });
});

describe("/log-in", () => {
  it("POST /login with missing data; returns 404 and error", () => {
    request(app)
      .post("/login")
      .send({ username: "test" })
      .expect(400)
      .expect({ message: "username, password required" });
  });

  it("POST /login with user that does not exist; returns 401 and user not found", () => {
    request(app)
      .post("/login")
      .send({ username: "test", password: "test" })
      .expect(401)
      .expect({ message: "username not found" });
  });

  it("POST /login with wrong password; returns 401 and wrong password", () => {
    db.prepare(
      "INSERT INTO User (name, username, password_hash, date_created) VALUES (?, ?, ?, ?);"
    ).run("test", "tester", "a1b2c3", "10-28-2026 10:00:00");
    request(app)
      .post("/login")
      .send({ username: "tester", password: "abc" })
      .expect(401)
      .expect({ message: "incorrect password!" });
  });

  it("POST /login with correct info; returns 200 and success", () => {
    db.prepare(
      "INSERT INTO User (name, username, password_hash, date_created) VALUES (?, ?, ?, ?);"
    ).run("test", "tester", "a1b2c3", "10-28-2026 10:00:00");
    request(app)
      .post("/login")
      .send({ username: "tester", password: "a1b2c3" })
      .expect(200)
      .expect({ message: "success" });
  });
});
