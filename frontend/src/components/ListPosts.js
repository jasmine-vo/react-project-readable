import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import PostForm from './PostForm';
import PostSummary from './PostSummary';
import * as API from '../utils/api';
import sortBy from 'sort-by';
import { connect } from 'react-redux';
import {
  getPosts,
  getCategories,
  updatePostSort,
  updatePostScore
} from '../actions';
import PostIcon from '../icons/post.svg';

class ListPosts extends Component {

  state = {
    postModalOpen: false,
  }

  componentDidMount() {
    API.getCategories().then(data => this.props.getCategories(data));
    API.getPosts().then(data => this.props.getPosts(data));
  }

  sortPosts = (sortValue) => {
    this.props.updatePostSort(sortValue);
    this.props.posts.sort(sortBy(sortValue));
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

  handlePostVote = (postId, vote) => {
    API.addPostVote(postId, vote).then((data) => {
      this.props.updatePostScore(data);
    });
  }

  render() {

    const { categories, sort, posts, category } = this.props
    const { postModalOpen } = this.state

    return (
      <div>

        <div className='nav'>
          
          <button
            className={(category) ? 'nav-button' : 'active-nav-button'}>
            <Link
              to='/'
              className='link'
            >all topics</Link>
          </button>

          {categories.map((cat) => (
            <button 
              key={cat}
              className={(category === cat) ? 'active-nav-button' : 'nav-button'}>
                <Link
                  to={`/${cat}`}
                  className='link'
                >{cat}</Link>
            </button>
          ))}
        
        </div>

        <div className='post-list'>

          <div className='change-sort'>
            <label><span>sort by: </span></label>
            <select
              value={sort.method}
              className='sort'
              onChange={(event) => this.sortPosts(event.target.value)}>
                <option value='timestamp'>oldest to newest</option>
                <option value='-timestamp'>newest to oldest</option>
                <option value='voteScore'>lowest to highest score</option>
                <option value='-voteScore'>highest to lowest score</option>
            </select>
          </div>
          <div className='add-new-post'>
            <button 
              onClick={() => this.openPostModal()}
              className='add-post'>
                add post <img className='icon' src={PostIcon} alt='post-icon' />
            </button>
          </div>

          {(posts.length > 0) ?
            <div>
              {posts.map((post) => (
                <PostSummary
                  post={post}
                  key={post.id}
                  onOpenPostModal={this.openPostModal}
                />
              ))}
            </div>
          : <div className='post-list'>There aren't any posts yet...</div>}
        </div>

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
            />
            <button 
              className='cancel-button'
              onClick={() => this.closePostModal()}>
                Cancel
            </button>
          </div>
        </Modal>

      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  if (ownProps.category) {
    return {
      posts: state.posts
        .filter((post) => post.category === ownProps.category && !(post.deleted))
        .sort(sortBy(state.sort.method)),
      categories: state.categories,
      sort: state.sort,
    }
  } else {
    return {
      posts: state.posts
        .filter((post) => !(post.deleted))
        .sort(sortBy(state.sort.method)),
      categories: state.categories,
      sort: state.sort,
    }
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getPosts: (posts) => dispatch(getPosts(posts)),
    getCategories: (categories) => dispatch(getCategories(categories)),
    updatePostSort: (sort) => dispatch(updatePostSort(sort)),
    updatePostScore: (post, vote) => dispatch(updatePostScore(post, vote)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPosts)
