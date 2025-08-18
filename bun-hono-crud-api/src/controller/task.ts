import { Context } from "hono";
import { initDatabase } from "../db/db";
import { Task } from "../types";

const db = initDatabase();

// --- Task CRUD ---
export const getTasks = (c: Context) => {
  const rows = db.query("SELECT * FROM tasks").all() as Task[];
  return c.json(rows);
};

export const getTaskById = (c: Context) => {
  const id = Number(c.req.param("id"));
  const row = db.query("SELECT * FROM tasks WHERE id = ?").get(id) as Task;
  if (!row) return c.json({ error: "Task not found" }, 404);
  return c.json(row);
};

export const createTask = async (c: Context) => {
  const body = await c.req.json<Task>();
  db.query("INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)").run(
    body.user_id,
    body.title,
    body.description ?? null
  );
  return c.json({ message: "Task created successfully" }, 201);
};

export const updateTask = async (c: Context) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json<Task>();
  db.query("UPDATE tasks SET title = ?, description = ? WHERE id = ?").run(
    body.title,
    body.description ?? null,
    id
  );
  return c.json({ message: "Task updated successfully" });
};

export const deleteTask = (c: Context) => {
  const id = Number(c.req.param("id"));
  db.query("DELETE FROM tasks WHERE id = ?").run(id);
  return c.json({ message: "Task deleted successfully" });
};
