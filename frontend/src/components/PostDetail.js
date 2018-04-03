import React, { Component } from 'react';
import * as API from '../utils/api';
import { toDate } from '../utils/helpers';
import { connect } from 'react-redux';
import { updatePostScore, getPostDetails } from '../actions';
import Modal from 'react-modal';
import PostForm from './PostForm';
import { withRouter } from 'react-router-dom'

class PostDetail extends Component {
  state = {
    postModalOpen: false,
  }

  componentWillMount() {
    API.getPostDetails(this.props.id).then((data) => {
      this.props.getPostDetails(data);
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
      this.props.updatePostScore(data);
    });
  }

  handleDeletePost = () => {
    API.deletePost(this.props.post.id).then((data) => {
      console.log(data)
    })
    this.props.history.push('/');
  }

  render() {
    
    return (
      <div>
        <h3>{this.props.post.title}</h3>
        submitted on {toDate(this.props.post.timestamp)} by {this.props.post.author}
        <p>{this.props.post.body}</p>
        <button onClick={() => this.openPostModal()}>
          Edit Post
        </button>
        <button onClick={() => this.handleDeletePost()}>
          Delete Post
        </button>
        <p>vote score: {this.props.post.voteScore}</p>
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
              post={this.props.post}
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

function mapStateToProps (state) {
  return {
    post: state.post
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updatePostScore: (post, vote) => dispatch(updatePostScore(post, vote)),
    getPostDetails: (post) => dispatch(getPostDetails(post))
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostDetail)
);