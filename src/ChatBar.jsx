import React, {Component} from 'react';

class ChatBar extends Component {
    constructor(props) {
        super(props);
        this.sendMessageOnEnter = this.sendMessageOnEnter.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
    }
    sendMessageOnEnter(event) {
        if (event.key === 'Enter') {
            const message = {
                username: this.props.currentUser,
                content: event.target.value,
                type: "message"
            }
            this.props.sendMessage(message);
            event.target.value = '';
        }
    }
    updateUsername(event) {
        // Trim whitespace from user entry
        const newUsername = event.target.value.replace(/^\s+/, '').replace(/\s+$/, '');
        if(newUsername !== ('' || this.props.currentUser)) {
            this.props.updateUsername(newUsername);
        }
    }
    render() {
        return (
            <footer className="chatbar">
                <input className="chatbar-username" placeholder={this.props.currentUser} onBlur={ this.updateUsername } />
                <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={ this.sendMessageOnEnter } />
            </footer>
        );
    }
}
export default ChatBar;