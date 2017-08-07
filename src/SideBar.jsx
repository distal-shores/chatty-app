import React, {Component} from 'react';

class SideBar extends Component {
    render() {
        return (
            <aside className="sidebar">
                <span className="user-display">User(s) online: { this.props.numUsers }</span>
            </aside>
        );
    }
}
export default SideBar;