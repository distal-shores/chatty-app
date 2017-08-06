import React, {Component} from 'react';

class Message extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if(this.props.type === "message") {
            return (
                <div className="message">
                    <span className="message-username">{ this.props.username }</span>
                    <span className="message-content">{ this.props.content }</span>
                </div>
            );
        } else {
            return (
                <div className="message system">{ this.props.content }</div>
            );
        }
    }
}
export default Message;