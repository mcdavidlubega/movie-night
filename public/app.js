const socket = io('http://192.168.100.44:3500');

// Create video element
const mediaPlayer = document.createElement('video');
mediaPlayer.setAttribute('id', 'mediaPlayer');
mediaPlayer.setAttribute('controls', 'false');
mediaPlayer.setAttribute('autoplay', 'true');

// Create source element
const sourceElement = document.createElement('source');
sourceElement.setAttribute('src', 'kiss.mp4'); // Specify the path to your video file
sourceElement.setAttribute('type', 'video/mp4');

// Append source element to video element
mediaPlayer.appendChild(sourceElement);

// Append video element to the body
document.body.appendChild(mediaPlayer);

// Listen for synchronization events
socket.on('syncPlayback', (data) => {
  if (data.currentTime !== undefined) {
    mediaPlayer.currentTime = data.currentTime;
  }

  // If 'playing' property is provided, adjust playback state
  if (data.isPlaying !== undefined) {
    if (data.isPlaying && mediaPlayer.paused) {
      mediaPlayer.play();
    } else if (!data.isPlaying && !mediaPlayer.paused) {
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

mediaPlayer.addEventListener('seeking', () => {
  // Add any necessary handling during seeking, if needed
});

mediaPlayer.addEventListener('seeked', () => {
  socket.emit('syncPlayback', {
    currentTime: mediaPlayer.currentTime,
    playing: !mediaPlayer.paused,
  });
});
