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

function randomColor(brightness){
    function randomChannel(brightness){
        var r = 255-brightness;
        var n = 0|((Math.random() * r) + brightness);
        var s = n.toString(16);
        return (s.length==1) ? '0'+s : s;
    }
    return '#' + randomChannel(brightness) + randomChannel(brightness) + randomChannel(brightness);
}

// Set up a callback that will run when a client connects to the server. When a client connects they are assigned a socket, represented by the ws parameter in the callback.
wss.on('connection', (ws) => {
    const numUsers = {numUsers: wss.clients.size};
    console.log('Client connected');
    console.log(numUsers.numUsers + ' user(s) connected');

    // TODO: DRY this up into a single 'broadcast' function
    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(numUsers));
    });

    const assignedColor = randomColor(150);

    ws.on('message', function incoming(data) {
        // Broadcast messages to all chat clients.
        wss.clients.forEach(function each(client) {
            // Message needs to be converted from string to object
            let message = JSON.parse(data);
            // Generate and assign a unique ID for each message
            message.id = uuidv4();
            message.color = assignedColor;
            // Convert message back into string for sending to client
            message = JSON.stringify(message);
            client.send(message);
        });
    });
  	// Set up a callback for when a client closes the socket. This usually means they closed their browser.
  	ws.on('close', () => console.log('Client disconnected'));
});
