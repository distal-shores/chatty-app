import React, {Component} from 'react';

class SideBar extends Component {
    render() {
        Object.keys(this.props.users).map((user) => { 
            console.log(this.props.users[user].color);
        });
        return (
            <aside className="sidebar">
                <span className="user-display">User(s) online: { this.props.numUsers }</span>
                <ul className="user-list">
                     { Object.keys(this.props.users).map((user, index) => {
                        return <li key={ index } style={{ backgroundColor: this.props.users[user].color}}>{ this.props.users[user].username }</li>;
                     })}
                </ul>
            </aside>
        );
    }
}
export default SideBar;

// render() {
//    return (
//        <div>
//            {Object.keys(this.state.dataGoal.milestones).map((milestone) =>{
//                  return {this.state.dataGoal.milestones[milestone].tasks.map((task, idx)=>{
//          return (
//                 //whatever you wish to do with the task item
//           )
// })
//            })}

//        </div>
//    )
// }

