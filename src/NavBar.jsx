import React, {Component} from 'react';

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar">
                <span className="tagline">A socket-based chat app using React</span>
                <span className="logo"></span>
            </nav>
        );
    }
}
export default NavBar;