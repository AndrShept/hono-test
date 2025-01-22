import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import type { Server as HTTPServer } from 'node:http';

export const app = new Hono().basePath('/api');
dotenv.config();
app.use(logger());
app.use(cors());

app.get('/hi', (c) => {
  console.log(process.env.MY_VARIABLE);
  console.log(process.env.ref);
  return c.json({
    dad: process.env.rofl,
    scf: process.env.ref,
  });
});
app.get('/hi/:id', (c) => {
  const {id} = c.req.param()

  return c.json({
    loh: id

  });
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

const httpServer = serve({
  fetch: app.fetch,
  port: port,
});

const io = new Server(httpServer as HTTPServer, {
  /* options */
});

io.on('connection', (socket) => {
  console.log('user connect' + socket.id);
  // ...

  socket.on('disconnect', () => {
    console.log('disconnect' + socket.id);
  });
});
