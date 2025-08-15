/* const server = Bun.serve({
  port: 3000,
  fetch(req) {
    return new Response("Bun!");
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
 */
import type { Server } from "bun";
import { use } from "react";

interface User {
  id: number
  name: string

}

const users: User[] = [
  {
    id: 1,
    name: "Anish"
  },
  {
    id: 2,
    name: "Vinish"
  },
  {
    id: 3,
    name: "Manish"
  },
  {
    id: 4,
    name: "varun"
  },
]

interface ApiResponse {
  message: string,
  method: string,
  route: string,
  data?: User | User[]
}

const server: Server = Bun.serve({
  port: 3000,
  fetch(req: Request): Response {
    const url = new URL(req.url)
    const method = req.method

    let response: ApiResponse = {
      message: 'hello from bun server',
      method: method,
      route: url.pathname
    }

    if (url.pathname === '/') {
      //route route
      if (method === 'GET') {
        response.message = "Welcome to bun api"
      } else {
        response.message = "not allowed for this route"
      }
    } else if (url.pathname === '/users') {
      switch (method) {
        case 'GET':
          response.message = 'fetching all data'
          response.data= users
          break
        case 'POST':
          response.message = 'NOT ALLOWED FOR THIS ROUTE'
      }
    }
    return Response.json(response)
  }
})

console.log(`Bun server running on http://localhost:${server.port}`);
