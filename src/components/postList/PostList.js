import React from 'react';
import './style.css';
import CommentList from '../commentList/CommentList'

export default class PostList extends React.Component {

    button = (userid, id) => {
        if (this.props.current === userid) {
            return (
                <div>
                    <button className="botonedit">
                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </button>
                    <button className="botondelete" onClick={() => this.props.deletepost(id)}>
                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                    </button>
                </div>
            )
        }
    }

    comentar = (postid) => {
        let body = document.getElementById("comentario-" + postid).value;
        document.getElementById("comentario-" + postid).value = "";
        this.props.addcomment(postid, body);
    }

    darlike = (postid, likes) => {
        this.props.darlike(postid, likes)
    }

    render () {
        return (
            <div className="postList">
                {
                    this.props.postlist.map(post => {
                        let nombre;
                        let imagen;
                        this.props.userlist.map(user => {
                            if (user.id === post.userId) {
                                nombre = user.name;
                                imagen = user.image;
                            }
                        })
                        return (
                            <div className="post">
                                <div className="postheader">
                                    <img src={imagen} />
                                    <div className="postdata">
                                        <div className="data">
                                            <h4>{nombre}</h4>
                                            <h5>{post.date}</h5>
                                        </div>
                                        {this.button(post.userId, post.id)}
                                    </div>
                                </div>
                                <div className="postbody">
                                    <p>{post.body}</p>
                                </div>
                                <CommentList commentlist={this.props.commentlist} userlist={this.props.userlist} postid={post.id}/>
                                <div className="postfooter">
                                    <button className="buttonlike" onClick={() => this.darlike(post.id, post.likes)}>
                                        <i className="fa fa-heart-o" aria-hidden="true"></i>
                                        <span>{post.likes}</span>
                                    </button>
                                    <input id={"comentario-" + post.id} type="text"></input>
                                    <button className="buttoncomment" onClick={() => this.comentar(post.id)}>comentar</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}