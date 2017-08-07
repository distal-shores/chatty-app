import React, {Component} from 'react';
import Message from './Message.jsx';
import ReactDOM from 'react-dom';

class MessageList extends Component {
    componentDidUpdate() {
        this.scrollToBottom();
    }
    constructor(props) {
        super(props);
    }
    render() {
        const messages = this.props.messages;
        const messageList = messages.map((message) =>
            <Message type={ message.type } key={ message.id } color={ message.color } username={ message.username } content={ message.content } />
        );
        return (
            <main className="messages">
                { messageList }
                <div style={{ float:"left", clear: "both" }} ref={(el) => { this.messagesEnd = el; }} />
            </main>
        );
    }
    scrollToBottom = () => {
      const node = ReactDOM.findDOMNode(this.messagesEnd);
      node.scrollIntoView({ behavior: "smooth" });
    }
}

export default MessageList;