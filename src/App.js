import React, { Component } from 'react';

import './App.css';
import Menu from './components/menu/Menu';
import ChangeUser from './components/changeUser/ChangeUser';
import CreatePost from './components/createPost/CreatePost';
import PostList from './components/postList/PostList';

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: [],
      posts: [],
      comments: [],
      current: 1,
      modaluser: false,
      modalpost: false
    }
  }

  componentDidMount() {
    fetch('http://localhost:1337/users')
    .then(response => response.json())
    .then(users => {
      this.setState({
        users: users
      })
    })
    fetch('http://localhost:1337/posts')
    .then(response => response.json())
    .then(posts => {
      this.setState({
        posts: posts
      })
    })
    fetch('http://localhost:1337/comments')
    .then(response => response.json())
    .then(comments => {
      this.setState({
        comments: comments
      })
    })
  }

  toggleUser = () => {
    this.setState({
      modaluser: !this.state.modaluser
    });
    
  }

  togglePost = () => {
    this.setState({
      modalpost: !this.state.modalpost
    });
  }

  changeUser = (id) => {
    this.setState({
      current: id
    })
  }

  createPost = (body) => {
    let d = new Date();
    let date = d.toLocaleDateString();
    let userid = this.state.current;
    fetch('http://localhost:1337/posts/',
      {
          headers:{
              'Content-Type': 'application/json',
              'Accepts': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            userId: userid,
            body: body,
            date: date,
            likes: 0
          })
      }
    )
    .then(response => response.json())
    .then(post => {
      this.setState({
            posts:[...this.state.posts, post]
      })
    })
  }

  addComment = (postid, body) => {
    let d = new Date();
    let date = d.toLocaleDateString();
    let userid = this.state.current;
    fetch('http://localhost:1337/comments', 
      {
        headers:{
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          userId: userid,
          postId: postid,
          body: body,
          date: date
        })
      }
    )
    .then(response => response.json())
    .then(comment => {
      this.setState({
            comments:[...this.state.comments, comment]
      })
      console.log(date, userid, postid, body);
    })
  }

  deletePost = (id) => {
    fetch('http://localhost:1337/posts/' + id,
    {
        headers:{
            'Content-Type': 'application/json',
            'Accepts': 'application/json'
        },
        method: 'DELETE'
    }
    )
    .then(console.log("funciono"))
    .catch(console.log("algo fallo"))
    let posts = this.state.posts;
    let encontrado;
    for (var i = 0; i < posts.length; i++) {
      if (posts[i].id == id) {
        encontrado = i;
      }
    }
    posts.splice(encontrado, 1);
    this.setState({
      posts: posts
    })
  }

  darlike = (postid, likes) => {
    fetch('http://localhost:1337/posts/' + postid, 
    {
      headers:{
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({
        likes: likes + 1
      })
    })
    .then(response => {
      let postAct = this.state.posts.map(post => {
        if (post.id == postid) {
          post.likes = likes + 1;
        }
        return post
      });
      this.setState({
        posts: postAct
      })
    })
  }

  render() {
    return (
      <div className="App">
        <Menu userlist={this.state.users} currentuser={this.state.current} toggleuser={this.toggleUser} togglepost={this.togglePost}/>
        <ChangeUser show={this.state.modaluser} userlist={this.state.users} toggleuser={this.toggleUser} changeuser={this.changeUser}/>
        <CreatePost show={this.state.modalpost} togglepost={this.togglePost} createpost={this.createPost}/>
        <PostList postlist={this.state.posts} userlist={this.state.users} commentlist={this.state.comments} current={this.state.current} deletepost={this.deletePost} addcomment={this.addComment} darlike={this.darlike}/>
      </div>
    );
  }
}

export default App;
