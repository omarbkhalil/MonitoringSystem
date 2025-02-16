const WebSocket = require('ws');

// Create a WebSocket server on port 4000
const wss = new WebSocket.Server({ port: 4000 }, () => {
  console.log('WebSocket server is running on ws://localhost:4000');
});

wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket server');

  // Handle incoming messages from clients
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);

    // Echo the message back to the client
    ws.send(`Server received: ${message}`);
  });

  // Send a welcome message when a client connects
  ws.send('Welcome to the WebSocket server');
});

wss.on('error', (error) => {
  console.error('WebSocket server error:', error);
});

