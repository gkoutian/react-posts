import React from 'react';
import './style.css';

export default class CommentList extends React.Component {
    comment = (userid, body, date) => {
        let imagen;
        let nombre;
        this.props.userlist.map(user => {
            if (user.id == userid) {
                imagen = user.image;
                nombre = user.name;
            }
        })
        return (<li className="commentdatos">
                    <img src={imagen}></img>
                    <div className="commentbody">
                        <h3>{nombre}</h3>
                        <h4>{date}</h4>
                        <p>{body}</p>
                    </div>
                </li>)
    }

    render () {
        return (
            <div className="commentlist">
                <ul>
                    {this.props.commentlist.map(comment => {
                        if (this.props.postid == comment.postId) {
                            return this.comment(comment.userId, comment.body, comment.date)
                        } else {
                            return null
                        }
                    })}
                </ul>    
            </div>
        )
    }
}