import React, { Component } from 'react';
import * as API from '../utils/api';
import { toDate } from '../utils/helpers';
import { connect } from 'react-redux';
import { updatePostScore, getPostDetails, getComments, deleteComment} from '../actions';
import Modal from 'react-modal';
import PostForm from './PostForm';
import CommentForm from './CommentForm';
import { withRouter } from 'react-router-dom'

class PostDetail extends Component {
  state = {
    postModalOpen: false,
    editCommentFormOpen: false,
    commentId: '',
  }

  componentWillMount() {
    API.getPostDetails(this.props.id).then((data) => {
      this.props.getPostDetails(data);
    })
    API.getComments(this.props.id).then((data) => {
      this.props.getComments(data);
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

  openEditCommentForm = (id) => {
    this.setState(() => ({
      editCommentFormOpen: true,
      commentId: id,
    }))
  }

  closeEditCommentForm = () => {
    this.setState(() => ({
      editCommentFormOpen: false
    }))
  }

  handleVote = (vote) => {
    API.addPostVote(this.props.id, vote).then((data) => {
      this.props.updatePostScore(data);
    });
  }

  handleDeletePost = () => {
    API.deletePost(this.props.post.id);
    this.props.history.push('/');
  }
  
  handleDeleteComment = (id) => {
    API.deleteComment(id);
    this.props.deleteComment(id);
  }

  render() {

    return (
      <div>
        <button onClick={() => this.props.history.goBack()}>
          Back
        </button>
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
        <h4>Add Comment</h4>
        <CommentForm 
          parentId={this.props.id}
          displayForm={true}
          editMode={false}
        />
        {this.props.comments ?
          <ul>
            {this.props.comments.map((comment) => (
              <li key={comment.id}>
                {comment.body}<br />
                posted by {comment.author} on {toDate(comment.timestamp)}<br />
                votescore {comment.voteScore}
                <button onClick={() => this.openEditCommentForm(comment.id)}>
                  Edit
                </button>
                <button onClick={() => this.handleDeleteComment(comment.id)}>
                  Delete
                </button>
                <CommentForm
                  displayForm={this.state.editCommentFormOpen && (comment.id === this.state.commentId)}
                  editMode={true}
                  commentId={comment.id}
                  onCloseEditCommentForm={this.closeEditCommentForm}
                />
              </li>
            ))}
          </ul>
        : `No Comments`}
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

function mapStateToProps (state, ownProps) {
  return {
    post: state.post,
    comments: state.comments.filter((comment) => comment.parentId === ownProps.id)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updatePostScore: (post, vote) => dispatch(updatePostScore(post, vote)),
    getPostDetails: (post) => dispatch(getPostDetails(post)),
    getComments: (comments) => dispatch(getComments(comments)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostDetail)
);