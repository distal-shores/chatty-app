import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
    componentDidMount() {
        this.socket.onopen = function (event) {
            console.log('Connected to server.');
        };
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            const messages = this.state.messages.concat(message);
            this.setState({ messages: messages });
        } 
    }
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            currentUser: "Bob"
        }
        this.sendMessage = this.sendMessage.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.socket = new WebSocket("ws://localhost:3001");
    }
    sendMessage(message) {
        this.socket.send(JSON.stringify(message));
    }
    updateUsername(newUsername) {
        this.setState({
            currentUser: newUsername
        });
    }
    render() {
        return (
            <div>
                <NavBar />
                <MessageList messages={ this.state.messages } />
                <ChatBar sendMessage={ this.sendMessage } updateUsername={ this.updateUsername } currentUser={ this.state.currentUser } />
            </div>
        );
    }
}


export default App;
