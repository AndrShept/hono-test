import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import type { Server as HTTPServer } from 'node:http';
import { timeout } from 'hono/timeout';
import { HTTPException } from 'hono/http-exception';

export const app = new Hono().basePath('/api');
dotenv.config();
app.use(logger());
app.use(cors());





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
