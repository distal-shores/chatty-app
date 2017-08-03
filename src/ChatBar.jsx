import React, {Component} from 'react';

class ChatBar extends Component {
    constructor(props) {
        super(props);
        this.sendMessageOnEnter = this.sendMessageOnEnter.bind(this);
    }
    sendMessageOnEnter(event) {
        if (event.key === 'Enter') {
            const message = {
                id: Math.floor((Math.random() * 100) + 1),
                username: this.props.currentUser.name,
                content: event.target.value
            }
            this.props.sendMessage(message);
            event.target.value = '';
        }
    }
    render() {
        return (
            <footer className="chatbar">
                <input className="chatbar-username" placeholder={this.props.currentUser.name} />
                <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={ this.sendMessageOnEnter } />
            </footer>
        );
    }
}
export default ChatBar;