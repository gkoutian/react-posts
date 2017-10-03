import React from 'react';
import './style.css';

export default class Menu extends React.Component {
    constructor(props) {
        super(props)
    }
    render () {
        return (
            <div className="menu">
                <div className="container">
                    <h4 className="logo" onClick={() => {window.location.href='http://localhost:3000'}}>Posts GK</h4>
                    <ul>
                        {this.props.userlist.map((user) => {
                            if (user.id === this.props.currentuser) {
                                let style = {
                                    backgroundImage: 'url(' + user.image + ')'
                                }
                                return (
                                    <div className="imagen" style={style} onClick={() => this.props.toggleuser()}>
                                        <h4 className="userbutton">
                                            <i className="fa fa-user-o" aria-hidden="true"></i>
                                        </h4>
                                    </div>
                                )
                            }
                        })}
                        <button onClick={() => this.props.togglepost()}>
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                    </ul>
                </div>
            </div>
        )
    }
}