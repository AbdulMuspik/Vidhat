# Simple Video Call Application

This is a simple video calling web application built using WebRTC, Node.js, Express, and Socket.IO. It enables peer-to-peer video communication between users.

## Features

- **Peer-to-Peer Video Calling:** Direct video communication without intermediate servers.
- **User-Friendly Interface:** Simple and intuitive UI for easy interaction.
- **WebRTC Technology:** Real-time communication capabilities.

## Prerequisites

- [Node.js](https://nodejs.org/) (v22.2.0 or later)
- A modern web browser (Chrome, Firefox, etc.)

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Clone the Repository

```bash
git clone https://github.com/AbdulMuspik/Vidhat.git
cd Vidhat
```

### Install Dependencies

```bash
npm install
```

### Run the Server

```bash
node server.js
```

### Open the Application

Open your web browser and navigate to `http://localhost:3000`.

## Project Structure

```
/your-project
  /public
    index.html      # HTML file for the application interface
    styles.css      # CSS file for styling the application
    script.js       # JavaScript file for client-side functionality
  server.js         # Node.js server file for signaling
  package.json      # Project metadata and dependencies
  .gitignore        # Git ignore file to exclude unnecessary files
  README.md         # Project documentation
```

## How It Works

### Signaling Server (`server.js`)

The signaling server facilitates the exchange of WebRTC signaling data (offer, answer, and ICE candidates) between peers using Socket.IO.

### Client-Side Code (`public/script.js`)

- Establishes a WebRTC connection between peers.
- Handles media stream acquisition and rendering.
- Manages signaling through Socket.IO events.

## Detailed Steps

1. **User Media Acquisition:**
   - The application requests access to the user's webcam and microphone using `getUserMedia`.

2. **Creating Peer Connection:**
   - A new `RTCPeerConnection` is created for managing the WebRTC connection.

3. **Signaling:**
   - The offer/answer process is initiated, and ICE candidates are exchanged through the signaling server.

4. **Stream Handling:**
   - Local and remote media streams are handled and displayed in the video elements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please fork the repository and use a feature branch. Pull requests are reviewed on a regular basis.

## Acknowledgments

- [WebRTC](https://webrtc.org/)
- [Socket.IO](https://socket.io/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)

## Contact

For any questions or suggestions, please contact [muhammadhamzaibnabdulmutlib@gmail.com](muhammadhamzaibnabdulmutlib@gmail.com).

---

**Happy Coding!**
