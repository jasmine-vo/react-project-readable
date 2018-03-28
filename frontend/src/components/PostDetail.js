import React, { Component } from 'react';
import * as API from '../utils/api';
import { toDate } from '../utils/helpers';
// import { connect } from 'react-redux';

class PostDetail extends Component {
  state = {
    post: []
  }

  componentDidMount() {
    API.getPostDetails(this.props.id).then((data) => {
      this.setState({ post: data})
    })
  }

  handleVote = (vote) => {
    API.addPostVote(this.props.id, vote).then((data) => {
      this.setState({ post: data })
    });
    // this.props.addPostVote(this.props.id, vote);
  }

  render() {

  console.log(this.state.post)
    
    return (
      <div>
        <h3>{this.state.post.title}</h3>
        submitted on {toDate(this.state.post.timestamp)} by {this.state.post.author}
        <p>{this.state.post.body}</p>
        <p>vote score: {this.state.post.voteScore}</p>
        <button onClick={() => this.handleVote('downVote')}>
          -
        </button>
        <button onClick={() => this.handleVote('upVote')}>
          +
        </button>
      </div>
    )
  }
}

// function mapDispatchToProps (dispatch) {
//   return {
//     addPostVote: (id, vote) => dispatch(addPostVote(id, vote)),
//   }
// }

// export default connect(
//   null,
//   mapDispatchToProps
// )(PostDetail)

export default PostDetail;