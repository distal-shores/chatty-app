import React, {Component} from 'react';
import SideBar from './SideBar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
    componentDidMount() {
        this.socket.onopen = function (event) {
            console.log('Connected to server2.');
        };
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message);
            if(message.numUsers) {
                this.setState({ numUsers: message.numUsers });
            } else if(message.users) {
                this.setState({ users: message.users });
            } else if(message.userColor) {
                this.setState({ color: message.userColor });
            } else {
                const messages = this.state.messages.concat(message);
                this.setState({ messages: messages });
            }
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if(this.state.currentUser !== prevState.currentUser) {
            this.socket.send(JSON.stringify(this.state.currentUser));
        }

    }
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            currentUser: "Anonymous",
            numUsers: 0,
            users: [],
            color: 'black'
        }
        this.sendMessage = this.sendMessage.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.socket = new WebSocket("ws://localhost:3001?" + this.state.currentUser);
    }
    render() {
        return (
            <div className="wrapper">
                <NavBar />
                <div className="application-body">
                    <SideBar numUsers={ this.state.numUsers } users={ this.state.users } color={ this.state.color } />
                    <MessageList messages={ this.state.messages } />
                </div>
                <ChatBar sendMessage={ this.sendMessage } updateUsername={ this.updateUsername } currentUser={ this.state.currentUser } />
            </div>
        );
    }
    sendMessage(message) {
        this.socket.send(JSON.stringify(message));
    }
    updateUsername(newUsername) {
        const oldUsername = this.state.currentUser;
        this.setState({
            currentUser: newUsername
        }, function() {
            // Passing the notification send message as a callback on setState so that it contains the updated currentUser state.
            this.socket.send(JSON.stringify({
                changedUsername: oldUsername,
                username: this.state.currentUser,
                content: oldUsername + " has changed their username to " + this.state.currentUser,
                type: "notification"
            }));
        });
    }
}

export default App;