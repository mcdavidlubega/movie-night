# Movie Night - Feature: Admin Control

MediaSync

This repository contains a simple application for synchronizing media playback across multiple clients using Socket.IO. Users can connect to the server, which broadcasts the current playback time and state to all connected clients. Clients can then control playback (play/pause) and stay in sync with each other.
Setup

To get started with this application, follow these steps:

    Clone the repository:

    bash

git clone -b ftr-admin-controller git@github.com:mcdavidlubega/movie-night.git

Navigate to the cloned repository:

bash

cd movie-night

Install dependencies:

bash

npm install

Start the server:

bash

    npm start

Usage

Once the server is running, users can access the application by visiting the specified IP address and port in a web browser. By default, the server listens on port 3500. Clients can connect to the server and interact with the media playback controls.
Files and Structure

    server.js: This file contains the server-side logic using Express.js and Socket.IO. It handles client connections, media playback synchronization, and disconnections.

    public/index.html: The HTML file for the client-side interface. It includes a script tag to load the app.js file.

    public/app.js: The JavaScript file responsible for client-side functionality. It establishes a connection to the server via Socket.IO and handles media playback synchronization events.

    public/style.css: Contains CSS styles for the client-side interface.

Dependencies

    express: Minimalist web framework for Node.js used for handling HTTP requests.
    socket.io: Library for real-time web applications. It enables bidirectional communication between clients and servers.
    path: Node.js module for handling file paths.
    url: Node.js module for URL resolution and parsing.

Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the application.
License

This project is licensed under the MIT License. See the LICENSE file for details.