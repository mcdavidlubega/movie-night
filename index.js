import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { statSync, createReadStream } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cache to store video chunks
const videoCache = {};

const app = express();

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.get('/video', (req, res) => {
  const range = req.headers.range;
  if (!range) {
    res.status(400).send('Requires Range header');
    return;
  }

  const videoPath = join(__dirname, 'public', 'kiss.mp4');
  const videoSize = statSync(videoPath).size;

  let [start, end] = range.replace(/bytes=/, '').split('-');
  start = parseInt(start, 10);
  end = end ? parseInt(end, 10) : videoSize - 1;
  const contentLength = end - start + 1;

  const headers = {
    'Content-Range': `bytes ${start}-${end}/${videoSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': 'video/mp4',
    'Cache-Control': 'no-cache', // Disable caching to ensure fresh data
  };

  res.writeHead(206, headers);

  if (videoCache[range]) {
    // Serve video chunk from cache
    res.end(videoCache[range]);
  } else {
    // Read video chunk from file and cache it
    const videoStream = createReadStream(videoPath, {
      start,
      end,
      highWaterMark: 5242880,
    }); // 5 MB chunk size
    const chunks = [];

    videoStream.on('data', (chunk) => {
      chunks.push(chunk);
      res.write(chunk);
    });

    videoStream.on('end', () => {
      const chunkBuffer = Buffer.concat(chunks);
      videoCache[range] = chunkBuffer;
      res.end();
    });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
