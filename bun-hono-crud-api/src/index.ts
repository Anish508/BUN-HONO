import { Hono } from "hono";
import { getUsers, getUserById, createUser, deleteUser } from "./controller/auth";
import { getTasks, getTaskById, createTask, updateTask, deleteTask } from "./controller/task";
import { initDatabase } from "./db/db";

// Init DB once
initDatabase();

const app = new Hono();

// Root
app.get("/", (c) => c.text("Bun + Hono + SQLite CRUD API 🚀"));

// User routes
app.get("/users", getUsers);
app.get("/users/:id", getUserById);
app.post("/users", createUser);
app.delete("/users/:id", deleteUser);

// Task routes
app.get("/tasks", getTasks);
app.get("/tasks/:id", getTaskById);
app.post("/tasks", createTask);
app.put("/tasks/:id", updateTask);
app.delete("/tasks/:id", deleteTask);

export default {
  port: 3000,
  fetch: app.fetch,
};
