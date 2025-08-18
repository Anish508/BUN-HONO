import { Context } from "hono";
import { initDatabase } from "../db/db";
import { User } from "../types";

const db = initDatabase();

// --- User CRUD ---
export const getUsers = (c: Context) => {
  const rows = db.query("SELECT id, username, role FROM users").all() as User[];
  return c.json(rows);
};

export const getUserById = (c: Context) => {
  const id = Number(c.req.param("id"));
  const row = db.query("SELECT id, username, role FROM users WHERE id = ?").get(id) as User;
  if (!row) return c.json({ error: "User not found" }, 404);
  return c.json(row);
};

export const createUser = async (c: Context) => {
  const body = await c.req.json<User>();
  try {
    db.query("INSERT INTO users (username, password, role) VALUES (?, ?, ?)").run(
      body.username,
      body.password,
      body.role ?? "user"
    );
    return c.json({ message: "User created successfully" }, 201);
  } catch (err) {
    return c.json({ error: "Username already exists" }, 400);
  }
};

export const deleteUser = (c: Context) => {
  const id = Number(c.req.param("id"));
  db.query("DELETE FROM users WHERE id = ?").run(id);
  return c.json({ message: "User deleted successfully" });
};
