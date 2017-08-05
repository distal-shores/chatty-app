import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
    componentDidMount() {
        this.socket.onopen = function (event) {
            console.log('Connected to server.'); 
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
            messages: [
                {
                    id: 1,
                    username: "Bob",
                    content: "Has anyone seen my marbles?",
                },
                {
                    id: 2,
                    username: "Anonymous",
                    content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
                }
            ]
        }
        this.sendMessage = this.sendMessage.bind(this);
        this.socket = new WebSocket("ws://localhost:3001");
    }
    render() {
        return (
            <div>
                <NavBar />
                <MessageList messages={ this.state.messages } />
                <ChatBar sendMessage={ this.sendMessage } currentUser={ this.state.currentUser } />
            </div>
        );
    }
}


export default App;
