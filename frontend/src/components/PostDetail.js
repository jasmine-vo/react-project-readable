import React, { Component } from 'react';
import * as API from '../utils/api';
import { toDate } from '../utils/helpers';
import { connect } from 'react-redux';
import { 
  updatePostScore,
  getPostDetails,
  getComments,
  deleteComment,
  updateCommentScore
} from '../actions';
import Modal from 'react-modal';
import PostForm from './PostForm';
import CommentForm from './CommentForm';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom';
import PencilIcon from '../icons/pencil.svg';
import DeleteIcon from '../icons/garbage.svg';
import RedHeartIcon from '../icons/favorite.svg';
import GreyHeartIcon from '../icons/favorite-grey.svg';

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

  handlePostVote = (vote) => {
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

  handleCommentVote = (vote, commentId) => {
    API.addCommentVote(commentId, vote).then((data) => {
      this.props.updateCommentScore(data);
    });
  }

  render() {

    const { post, comments } = this.props
    const { postModalOpen, commentId, editCommentFormOpen } = this.state

    return (
      <div className='post-details-container'>
        <div className='nav'>
          <button
            className='nav-button'>
            <Link
              to='/'
              className='path-link'
            >home</Link>
          </button>
          -
          <button
            className='nav-button'>
            <Link
              to={`/${post.category}`}
              className='path-link'
            >{post.category}</Link>
          </button>
          -
          <button
            className='nav-button'>
            <Link
              to={`/${post.category}/${post.id}`}
              className='path-link'
            >{post.title}</Link>
          </button>
        </div>

        <div className='post-container'>
          <div className='post-header'>
            <h3 className='post-subtitle'>{post.title}</h3>
            <span>
              submitted by {post.author} on {toDate(post.timestamp)} 
            </span>
          </div>

          <div className='post-body'>
            {post.body}
          </div>

          <div className='edit-delete'>
            <button
              onClick={() => this.openPostModal()}
              className='small-button'>
              <img className='icon' src={PencilIcon} alt='pencil-icon' />
            </button>
            <button
              onClick={() => this.handleDeletePost()}
              className='small-button'>
              <img className='icon' src={DeleteIcon} alt='delete-icon' />
            </button>
          </div>
          <div className='vote-score'>
            {(post.voteScore > 0) ?
              <img className='icon' src={RedHeartIcon} alt='red-heart-icon' />
            : <img className='icon' src={GreyHeartIcon} alt='grey-heart-icon' />}
            <span> {post.voteScore} </span>
            <button
              onClick={() => this.handlePostVote('upVote')}
              className='small-button'>
              +
            </button>
            <button
              onClick={() => this.handlePostVote('downVote')}
              className='small-button'>
              -
            </button>
          </div>
        </div>

        <div className='post-container'>
          <div className='comment-form'>

            <h3 className='subtitle'>Add a comment</h3>

            <CommentForm 
              parentId={this.props.id}
              displayForm={true}
              editMode={false}
            />

            <h3 className='subtitle'>Comments ({comments.length})</h3>
          </div>

          {comments ?
            <div className='comment-list'>

              <ul className='comments'>
                {comments.map((comment) => (
                  <li className='comments' key={comment.id}>
                    <div className='comment-details'>
                      <p>{comment.body}</p>

                      <span>
                        submitted by {comment.author} on {toDate(comment.timestamp)}
                      </span>

                    </div>

                    <div className='edit-delete'>
                      <button
                        onClick={() => this.openEditCommentForm(comment.id)}
                        className='small-button'>
                        <img className='icon' src={PencilIcon} alt='pencil-icon' />
                      </button>
                      <button
                        onClick={() => this.handleDeleteComment(comment.id)}
                        className='small-button'>
                        <img className='icon' src={DeleteIcon} alt='delete-icon' />
                      </button>
                    </div>
                    <div className='vote-score'>
                      {(comment.voteScore > 0) ?
                        <img className='icon' src={RedHeartIcon} alt='red-heart-icon' />
                      : <img className='icon' src={GreyHeartIcon} alt='grey-heart-icon' />}
                      <span> {comment.voteScore} </span>
                      <button onClick={() => this.handleCommentVote('upVote', comment.id)}>
                        +
                      </button>
                      <button onClick={() => this.handleCommentVote('downVote', comment.id)}>
                        -
                      </button>
                    </div>
                    <div className='comment-form'>
                      <CommentForm
                        displayForm={editCommentFormOpen && (comment.id === commentId)}
                        editMode={true}
                        commentId={comment.id}
                        onCloseEditCommentForm={this.closeEditCommentForm}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          : <span>There are 0 comments about this post</span>}
          </div>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={postModalOpen}
          onRequestClose={this.closePostModal}
          contentLabel='Modal'
        >
          <div>
            <h3>Edit Post</h3>
            <PostForm
              onClosePostModal={this.closePostModal}
              post={post}
              category={post.category}
            />
            <button
              onClick={() => this.closePostModal()}
              className='cancel-button'>
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
    updateCommentScore: (comment, vote) => dispatch(updateCommentScore(comment, vote)),
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostDetail)
);