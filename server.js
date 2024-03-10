import express from 'express';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3500;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

let currentTime = 0; // Initial playback time

const expressServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const io = new Server(expressServer, {
  cors: {
    origin:
      process.env.NODE_ENV === 'production'
        ? false
        : ['http://localhost:5500', 'http://127.0.0.1:5500'],
  },
});

io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`);

  // Send the current playback time to the newly connected client
  socket.emit('syncPlayback', { currentTime });

  // Handle synchronization events from clients
  socket.on('syncPlayback', (data) => {
    // Broadcast the received playback time to all clients
    io.emit('syncPlayback', data);
    currentTime = data.currentTime; // Update the current playback time
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id.substring(0, 5)} disconnected`);
  });
});
