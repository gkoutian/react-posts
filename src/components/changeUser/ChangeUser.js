import React from 'react';
import './style.css';

export default class ChangeUser extends React.Component {

    changeUser = (id) => {
        this.props.changeuser(id);
        this.props.toggleuser();
    }

    render () {
        if(!this.props.show) {
            return null;
        }

        return (
            <div id="myModal" className="modal" onClick={() => this.props.toggleuser()}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <p>Elija un usuario</p>
                <ul>
                    {this.props.userlist.map((user) => {
                        return <li onClick={() => this.changeUser(user.id)}><img src={user.image}/>{user.name}</li>
                    })}
                </ul>
            </div>
           </div>
        )
    }
}