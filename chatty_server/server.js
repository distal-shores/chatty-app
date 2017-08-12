const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
const url = require('url');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
	// Make the express server serve static assets (html, javascript, css) from the /public folder
	.use(express.static('public'))
  	.listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

const numUsers = {numUsers: wss.clients.size};

// Create a user object that can be used to store all the connected clients
let userIDCounter = 0;
function User(id, username, color) {
    this.id = id;
    this.username = username;
    this.color = color;
}

const users = {};

broadcast = (content) => {
    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(content));
    });
}

logUserCount = () => {
    console.log(numUsers.numUsers + ' user(s) connected');
}

randomColor = (brightness) => {
    function randomChannel(brightness){
        const r = 255-brightness;
        const n = 0|((Math.random() * r) + brightness);
        const s = n.toString(16);
        return (s.length==1) ? '0'+s : s;
    }
    return '#' + randomChannel(brightness) + randomChannel(brightness) + randomChannel(brightness);
}

// Set up a callback that will run when a client connects to the server. When a client connects they are assigned a socket, represented by the ws parameter in the callback.
wss.on('connection', (ws, req) => {
    console.log('Client connected');

    // Log the number of clients connected and broadcast it to connected clients
    numUsers.numUsers = wss.clients.size; 
    logUserCount();
    broadcast(numUsers); 

    // Grab the initial username from the client query 
    let username = url.parse(req.url).query;

    const assignedColor = randomColor(150);
    ws.send(JSON.stringify({ userColor: assignedColor}));

    ws.id = userIDCounter ++;
    ws.username = username;
    ws.color = assignedColor;
    const user = new User(ws.id, ws.username, ws.color);
    users[ws.id] = user;

    broadcast({ users: users });

    // const user = new User("CS1500", gradingareas, 85);

    ws.on('message', function incoming(data) {
        const message = JSON.parse(data);
        if(message.changedUsername) {
        	username = message.username;
        	users[ws.id].username = username;
        	for (let i=users.length-1; i>=0; i--) {
            	if (users[i].username === message.changedUsername) {
                	users[i].username = username;
                	break;
            	}
        	}
        	broadcast({ users: users });
        }

        message.id = uuidv4();
        message.color = assignedColor;
        broadcast(message);
    });

  	// Set up a callback for when a client closes the socket. This usually means they closed their browser.
  	ws.on('close', () => {

        delete users[ws.id];

        for (let i=users.length-1; i>=0; i--) {
            if (users[i] === username) {
                users.splice(i, 1);
                break;
            }
        }
        console.log('Client disconnected');
        numUsers.numUsers = wss.clients.size;
        logUserCount();
        broadcast({ users: users });
        broadcast(numUsers);
    });
});
