const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.onopen = () => {
    console.log('Connected to WebSocket server');
};

wss.onmessage = (event) => {
    console.log(`Received message: ${event.data}`);
};

wss.onclose = () => {
    console.log('Disconnected from WebSocket server');
};

wss.onerror = (error) => {
    console.error(`WebSocket error: ${error}`);
};

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);

        // Broadcast the message to all clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:8080');

module.exports = wss;