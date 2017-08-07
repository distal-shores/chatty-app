import React, {Component} from 'react';

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar">
                <a href="/" className="navbar-brand">Chatty</a>
                <span className="user-display">User(s) online: { this.props.numUsers }</span>
            </nav>
        );
    }
}
export default NavBar;