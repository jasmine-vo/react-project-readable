import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toDate } from '../utils/helpers';
import Modal from 'react-modal';
import PostForm from './PostForm';
import * as API from '../utils/api';
import sortBy from 'sort-by';
import { connect } from 'react-redux';
import { getPosts, getCategories, updatePostSort } from '../actions';
import RedHeartIcon from '../icons/favorite.svg';
import GreyHeartIcon from '../icons/favorite-grey.svg';
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

  render() {

    const { categories, sort, posts, category } = this.props
    const { postModalOpen } = this.state

    console.log(posts)

    return (
      <div>

        <div className='category-tabs'>
          
          <button
            className={(category) ? 'category' : 'active-category'}>
            <Link
              to='/'
              className='link'
            >all topics</Link>
          </button>

          {categories.map((cat) => (
            <button 
              key={cat}
              className={(category === cat) ? 'active-category' : 'category'}>
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
                <option value="timestamp">oldest to newest</option>
                <option value="-timestamp">newest to oldest</option>
                <option value="voteScore">lowest to highest score</option>
                <option value="-voteScore">highest to lowest score</option>
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
                <ul className='posts' key={post.id}>
                  <li>
                    <div className='post-summary'>
                      <Link
                        to={`/${post.category}/${post.id}`}
                        className='link'>
                        <h3 className='subtitle'>{post.title}</h3>
                        <span>
                          by {post.author} about {post.category} on {toDate(post.timestamp)}
                        </span>
                      </Link>
                    </div>
                    <div className='post-score'>
                      {(post.voteScore > 0) ?
                        <img className='icon' src={RedHeartIcon} alt='red-heart-icon' />
                      : <img className='icon' src={GreyHeartIcon} alt='grey-heart-icon' />}
                      <span> {post.voteScore}</span>
                    </div>
                  </li>
                </ul>
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
          <div className='new-post-container'>
            <h3 className='subtitle'>New Post</h3>
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPosts)
