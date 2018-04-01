import React, { Component } from 'react';
import * as API from '../utils/api';
import { toDate } from '../utils/helpers';
import { connect } from 'react-redux';
import { updatePostScore } from '../actions';
import Modal from 'react-modal';
import PostForm from './PostForm';

class PostDetail extends Component {
  state = {
    post: [],
    postModalOpen: false,
  }

  componentDidMount() {
    API.getPostDetails(this.props.id).then((data) => {
      this.setState({ post: data})
    })
  }

  openPostModal = () => {
    this.setState(() => ({
      postModalOpen: true
    }))
  }

  closePostModal = () => {
    this.setState(() => ({
      postModalOpen: false
    }))
  }

  handleVote = (vote) => {
    API.addPostVote(this.props.id, vote).then((data) => {
      this.setState({ post: data })
    });
    this.props.updatePostScore(this.state.post, vote);
  }

  render() {

  console.log(this.state.post)
    
    return (
      <div>
        <h3>{this.state.post.title}</h3>
        submitted on {toDate(this.state.post.timestamp)} by {this.state.post.author}
        <p>{this.state.post.body}</p>
        <button onClick={() => this.openPostModal()}>
          Edit Post
        </button>
        <p>vote score: {this.state.post.voteScore}</p>
        <button onClick={() => this.handleVote('downVote')}>
          -
        </button>
        <button onClick={() => this.handleVote('upVote')}>
          +
        </button>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={this.state.postModalOpen}
          onRequestClose={this.closePostModal}
          contentLabel='Modal'
        >
          <div>
            <h3>Edit Post</h3>
            <PostForm
              onClosePostModal={this.closePostModal}
              post={this.state.post}
            />
            <button onClick={() => this.closePostModal()}>
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updatePostScore: (post, vote) => dispatch(updatePostScore(post, vote)),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(PostDetail)