import React from 'react'
import './style.css';

export default class CreatePost extends React.Component {

    sendPost = () => {
        let body = document.getElementById("postbody").value;
        this.props.createpost(body);
        this.props.togglepost();
        document.getElementById("postbody").value = ""
    }

    render () {
        if(!this.props.show) {
            return null;
        }

        return (
            <div id="myModal" className="modal-post" onClick={() => this.props.togglepost()}>
                <div className="modal-content-post" onClick={(e) => e.stopPropagation()}>
                    <textarea id="postbody"placeholder="Escribi tu proximo post..."></textarea>
                    <button onClick={() => this.sendPost()}>Crear post</button>
                </div>
            </div>
        )
    }
}