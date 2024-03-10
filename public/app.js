const socket = io('http://localhost:3500');
const mediaPlayer = document.getElementById('mediaPlayer');

// Listen for synchronization events
socket.on('syncPlayback', (data) => {
  if (data.currentTime !== undefined) {
    mediaPlayer.currentTime = data.currentTime;
  }

  // If 'playing' property is provided, adjust playback state
  if (data.playing !== undefined) {
    if (data.playing) {
      mediaPlayer.play();
    } else {
      mediaPlayer.pause();
    }
  }
});

// Emit synchronization events from the client (e.g., on play, pause, seek)
mediaPlayer.addEventListener('play', () => {
  socket.emit('syncPlayback', {
    currentTime: mediaPlayer.currentTime,
    playing: true,
  });
});

mediaPlayer.addEventListener('pause', () => {
  socket.emit('syncPlayback', {
    currentTime: mediaPlayer.currentTime,
    playing: false,
  });
});

mediaPlayer.addEventListener('seeked', () => {
  socket.emit('syncPlayback', {
    currentTime: mediaPlayer.currentTime,
    playing: !mediaPlayer.paused,
  });
});
