// server.js
import express from 'express';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3500;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const expressServer = app.listen(PORT, '192.168.100.44', () => {
  console.log(`Listening on port ${PORT}`);
});

const io = new Server(expressServer, {
  cors: {
    origin: [
      'http://localhost:5500',
      'http://127.0.0.1:5500',
      'http://192.168.100.44:5500',
    ],
  },
});

let currentTime = 0; // Initial playback time
let isPlaying = false; // Initial playback state
io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`);

  // Send the current playback time and state to the newly connected client
  socket.emit('syncPlayback', { currentTime, isPlaying });

  // Handle synchronization events from clients
  socket.on('syncPlayback', (data) => {
    // Update the global timing object only if it's a play event
    if (data.playing && !isPlaying) {
      currentTime = data.currentTime;
      isPlaying = true;

      // Broadcast the updated timing object to all clients
      io.emit('syncPlayback', { currentTime, isPlaying });
    } else if (!data.playing && isPlaying) {
      // If it's a pause event, update the global timing object and broadcast
      currentTime = data.currentTime;
      isPlaying = false;

      // Broadcast the updated timing object to all clients
      io.emit('syncPlayback', { currentTime, isPlaying });
    }
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id.substring(0, 5)} disconnected`);
  });
});
