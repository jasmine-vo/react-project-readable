import React, { Component } from 'react';
import * as API from '../utils/api';
import { toDate } from '../utils/helpers';


class PostDetail extends Component {
  state = {
    post: []
  }

  componentDidMount() {
    API.getPostDetails(this.props.id).then((data) => {
      this.setState({ post:data})
    })
  }

  render() {

  console.log(this.state.post)
    
    return (
      <div>
        <h3>{this.state.post.title}</h3>
        submitted on {toDate(this.state.post.timestamp)} by {this.state.post.author}
        <p>{this.state.post.body}</p>
        <p>vote score: {this.state.post.voteScore}</p>
      </div>
    )
  }
}

export default PostDetail