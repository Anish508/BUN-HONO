import { Hono } from 'hono'
import { initDatabase } from '../src/db/db'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { registerUser } from './controller/auth'
const app = new Hono()
const db = initDatabase()

app.use("*", cors())
app.use("*", logger())

//input validation
const registerSchema = z.object({
  username: z.string().min(3).max(25),
  password: z.string().min(5),
  role: z.enum(['user', 'admin']).optional()
})
app.post('register-user', zValidator('json', registerSchema), (c) => registerUser(c, db)
)
app.get('/', (c) => {
  return c.text('Hello hello user and task management!')
})

app.get('/db-test', (c) => {
  const result = db.query('SELECT sqlite_version()').get()

  return c.json({
    message: "Database connected successfully",
    sqlite_version: result
  })
})

export default app
