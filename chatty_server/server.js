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

function broadcast(content) {
    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(content));
    });
}

function logUserCount() {
    console.log(numUsers.numUsers + ' user(s) connected');
}

const numUsers = {numUsers: wss.clients.size};
// Set up a callback that will run when a client connects to the server. When a client connects they are assigned a socket, represented by the ws parameter in the callback.
wss.on('connection', (ws) => {
    console.log('Client connected');
    numUsers.numUsers = wss.clients.size; 
    logUserCount();
    broadcast(numUsers); 

    const assignedColor = randomColor(150);

    ws.on('message', function incoming(data) {
        const message = JSON.parse(data);
        message.id = uuidv4();
        message.color = assignedColor;
        broadcast(message);
    });

  	// Set up a callback for when a client closes the socket. This usually means they closed their browser.
  	ws.on('close', () => {

        console.log('Client disconnected');
        numUsers.numUsers = wss.clients.size;
        logUserCount();
        broadcast(numUsers);

    });
});
