const http = require('http');
const dotenv = require('dotenv');
dotenv.config();

const app = require('./app'); // Import the configured Express app
const { initializeSocket } = require('./socket.js');

const port = process.env.PORT || 8080;

// Create an HTTP server and attach the Express app
const server = http.createServer(app);

// Initialize Socket.io
initializeSocket(server);

// Start the server
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
