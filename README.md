# MediaSync

This repository contains a simple application for synchronizing media playback across multiple clients using Socket.IO. Users can connect to the server, which broadcasts the current playback time and state to all connected clients. Clients can then control playback (play/pause) and stay in sync with each other.

## Description

The server (`server.js`) is built using Express.js and Socket.IO. It handles client connections, media playback synchronization, and disconnections. Clients connect to the server to receive the current playback time and state and can send synchronization events to control playback.

## Setup

1. Clone the repository:

    ```bash
    git clone -b ftr-admin-controller git@github.com:mcdavidlubega/movie-night.git
    ```

2. Navigate to the cloned repository:

    ```bash
    cd movie-night
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the server:

    ```bash
    npm start
    ```

## Usage

Once the server is running, users can access the application by visiting the specified IP address and port in a web browser. By default, the server listens on port 3500. Clients can connect to the server and interact with the media playback controls.

## Files and Structure

- `server.js`: Server-side logic using Express.js and Socket.IO. Handles client connections, media playback synchronization, and disconnections.
- `public/index.html`: HTML file for the client-side interface. Includes a script tag to load the `app.js` file.
- `public/app.js`: JavaScript file responsible for client-side functionality. Establishes a connection to the server via Socket.IO and handles media playback synchronization events.
- `public/style.css`: CSS styles for the client-side interface.

## Dependencies

- `express`: Minimalist web framework for Node.js used for handling HTTP requests.
- `socket.io`: Library for real-time web applications. Enables bidirectional communication between clients and servers.
- `path`: Node.js module for handling file paths.
- `url`: Node.js module for URL resolution and parsing.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the application.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
