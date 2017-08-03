import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <MessageList />
                <ChatBar />
            </div>
        );
    }
}
export default App;
