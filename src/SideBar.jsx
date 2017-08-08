import React, {Component} from 'react';

class SideBar extends Component {
    render() {
        const users = this.props.users;
        return (
            <aside className="sidebar">
                <span className="user-display">User(s) online: { this.props.numUsers }</span>
                <ul className="user-list">
                    { users.map((user, index) => {
                        return <li key={ index } style={{ backgroundColor: this.props.color}}>{ user }</li>;
                    })}
                </ul>
            </aside>
        );
    }
}
export default SideBar;

