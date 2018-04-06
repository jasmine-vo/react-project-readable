import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toDate } from '../utils/helpers';
import Modal from 'react-modal';
import PostForm from './PostForm';
import * as API from '../utils/api';
import sortBy from 'sort-by';
import { connect } from 'react-redux';
import { getPosts, getCategories, updatePostSort } from '../actions';

class ListPosts extends Component {

  state = {
    postModalOpen: false,
  }

  // load categories and posts from API after component is mounted
  componentDidMount() {
    API.getCategories().then(data => this.props.getCategories(data));
    API.getPosts().then(data => this.props.getPosts(data.sort(sortBy(this.props.sort.method))));
    console.log(this.props.sort)
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

    return (
      <div>
        <button>
          <Link
            to="/"
          >All</Link>
        </button>
        {this.props.categories.map((category) => (
          <button key={category}>
            <Link
              to={`/${category}`}
            >{category}</Link>
          </button>
        ))}
        <select value={this.props.sort.method}
          onChange={(event) => this.sortPosts(event.target.value)}>
            <option value="timestamp">Oldest to newest</option>
            <option value="-timestamp">Newest to oldest</option>
            <option value="voteScore">Lowest to highest score</option>
            <option value="-voteScore">Highest to lowest score</option>
        </select>

        <button onClick={() => this.openPostModal()}>
          Add Post
        </button>
        {this.props.posts ?
        <ul>
          {this.props.posts.map((post) => (
            <li key={post.id}>
              <Link
                to={`/${post.category}/${post.id}`}
                >{post.title}</Link>, score: {post.voteScore} - posted on {toDate(post.timestamp)}
            </li>
          ))}
        </ul>
        : `No Posts`}
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={this.state.postModalOpen}
          onRequestClose={this.closePostModal}
          contentLabel='Modal'
        >
          <div>
            <h3>New Post</h3>
            <PostForm
              onClosePostModal={this.closePostModal}
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
  if (ownProps.category) {
    return {
      posts: state.posts.filter((post) => post.category === ownProps.category && !(post.deleted)).sort(sortBy(state.sort.method)),
      categories: state.categories,
      sort: state.sort,
    }
  } else {
    return {
      posts: state.posts.filter((post) => !(post.deleted)).sort(sortBy(state.sort.method)),
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
