# Express Video Streaming with Caching Example

This repository contains an example Express server that serves a static HTML file and allows streaming of a video file with caching capabilities.

## Description

The Express server is set up to serve a static HTML file (`index.html`) located in the `public` directory. Additionally, it provides an endpoint (`/video`) for streaming a video file (`kiss.mp4`). The server utilizes caching to store video chunks, improving performance and reducing the need for repeated file read operations.

## Usage

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/express-video-streaming.git
    ```

2. Install dependencies:

    ```bash
    cd express-video-streaming
    npm install
    ```

3. Start the server:

    ```bash
    npm start
    ```

4. Access the server in your web browser:

    - Static HTML: http://localhost:8000/
    - Video Streaming: http://localhost:8000/video

## Explanation

The main components of the code include:

- **Server Setup**: The Express server is created and configured to serve static files and handle video streaming requests.
- **Static HTML Serving**: A route handler serves the `index.html` file located in the `public` directory when the root URL is accessed.
- **Video Streaming**: Another route handler streams the `kiss.mp4` video file with caching capabilities. The server reads requested video chunks from the file, caches them, and streams them to the client.
- **Server Listening**: The server listens for incoming HTTP requests on port 8000 and logs a message when it starts.

## Dependencies

- `express`: Web framework for Node.js
- `url`, `path`, `fs`: Node.js core modules for handling file paths, file operations, and HTTP requests.

## License

This project is licensed under the [MIT License](LICENSE).
