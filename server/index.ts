import { z } from 'zod'
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'

const app = new Hono()
  .get('/hello', (c) => {
    return c.json({
      message: 'Hello Next.js!',
    })
  })
  .get('/users',
    zValidator("query", z.object({ id: z.string(), name: z.string() })),
    (c) => {
      return c.json([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
      ])
    })
  .get('/user/:id', (c) => {
    const id = c.req.param('id')
    return c.json({ id, name: 'John Doe' })
  })

export default app
export type AppType = typeof app