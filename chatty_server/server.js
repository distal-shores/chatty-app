const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
	// Make the express server serve static assets (html, javascript, css) from the /public folder
	.use(express.static('public'))
  	.listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server. When a client connects they are assigned a socket, represented by the ws parameter in the callback.
wss.on('connection', (ws) => {
  	console.log('Client connected');
    ws.on('message', function incoming(data) {
        // Broadcast messages to all chat clients.
        wss.clients.forEach(function each(client) {
            // Message needs to be converted from string to object
            let message = JSON.parse(data);
            // Generate and assign a unique ID for each message
            const uuid = uuidv4();
            message.id = uuid;
            // Convert message back into string for sending to client
            message = JSON.stringify(message);
            client.send(message);
        });
    });
  	// Set up a callback for when a client closes the socket. This usually means they closed their browser.
  	ws.on('close', () => console.log('Client disconnected'));
});
