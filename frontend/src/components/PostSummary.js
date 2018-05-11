import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toDate } from '../utils/helpers';
import * as API from '../utils/api';
import { connect } from 'react-redux';
import { getComments, updatePostScore, deletePost } from '../actions';
import RedHeartIcon from '../icons/favorite.svg';
import GreyHeartIcon from '../icons/favorite-grey.svg';
import CommentIcon from '../icons/comment.svg';
import DeleteIcon from '../icons/garbage.svg';
import PencilIcon from '../icons/pencil.svg';
import Modal from 'react-modal';
import PostForm from './PostForm';

class PostSummary extends Component {
  state = {
    postModalOpen: false,
  }

  componentDidMount() {
    const { post } = this.props

    API.getComments(post.id).then(data => this.props.getComments(data));
  }

  handlePostVote = (vote) => {
    const { post } = this.props

    API.addPostVote(post.id, vote).then((data) => {
      this.props.updatePostScore(data);
    });
  }

  handleDeletePost = () => {
    const { post } = this.props

    API.deletePost(post.id);
    this.props.deletePost(post.id);
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

  render() {
    const { post, comments } = this.props
    const { postModalOpen } = this.state

    return (
      <div>
        <ul className='posts' key={post.id}>
          <li>
            <div className='post-summary'>
              <Link
                to={`/${post.category}/${post.id}`}
                className='link'>
                <h3 className='subtitle'>{post.title}</h3>
                <span className='post-body-snip'>
                  {post.body.slice(0,35)}...
                </span><p />
                <span className='post-details'>
                  by {post.author} about {post.category} on {toDate(post.timestamp)}
                </span>
              </Link>
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
              <img className='icon' src={CommentIcon} alt='comment-icon' />
              <span> {comments.length} </span>

              {(post.voteScore > 0) ?
                <img className='icon' src={RedHeartIcon} alt='red-heart-icon' />
              : <img className='icon' src={GreyHeartIcon} alt='grey-heart-icon' />}
              <span> {post.voteScore}</span>
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
          </li>
        </ul>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={postModalOpen}
          onRequestClose={this.closePostModal}
          contentLabel='Modal'
        >
          <div>
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
    comments: state.comments.filter((comment) => comment.parentId === ownProps.post.id)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updatePostScore: (post, vote) => dispatch(updatePostScore(post, vote)),
    getComments: (comments) => dispatch(getComments(comments)),
    deletePost: (postId) => dispatch(deletePost(postId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostSummary)