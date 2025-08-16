import type { Context } from 'hono'
import { Database } from 'bun:sqlite'
import { User } from '../types/index'
import { password as bunPass } from 'bun'

export async function registerUser(c: Context, db: Database) {
      try {
            const body = await c.req.json()
            console.log("Incoming body:", body)

            const { username, password, role } = body

            if (!username || !password) {
                  return c.json({ error: "username and pass required" }, 400)
            }

            if (role !== "user" && role !== "admin") {
                  return c.json({ error: "Invalid role" }, 400)
            }

            const existingUser = db.query("SELECT * FROM users WHERE username = ?").get(username) as User | undefined
            if (existingUser) {
                  return c.json({ error: "User exist with same username" }, 400)
            }

            const hashPass = await bunPass.hash(password)

            db.run("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", [
                  username,
                  hashPass,
                  role
            ])

            return c.json({ message: "User registered successfully" }, 201)
      } catch (e) {
            console.error("Register error:", e)
            return c.json({ error: "Internal server error" }, 500)
      }
}
