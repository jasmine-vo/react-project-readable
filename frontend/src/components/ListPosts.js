import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toDate } from '../utils/helpers';
import Modal from 'react-modal';
import PostForm from './PostForm';
import * as API from '../utils/api';

class ListPosts extends Component {

  state = {
    postModalOpen: false,
    categories: [],
  }

  static propTypes = {
    posts: PropTypes.array.isRequired,
  } 

  componentDidMount() {
    API.getCategories().then((data) => {
      this.setState({ categories:data})
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

  render() {
    return (
      <div>
        <button>
          <Link
            to="/"
          >All</Link>
        </button>
        {this.state.categories.map((category) => (
          <button key={category}>
            <Link
              to={`/${category}`}
            >{category}</Link>
          </button>
        ))}
        <select
          defaultValue="timestamp,reverse"
          onChange={(event) => this.props.onSortPosts(event.target.value)}>
            <option value="none" disabled>Sort by...</option>
            <option value="timestamp">Oldest to newest</option>
            <option value="timestamp,reverse">Newest to oldest</option>
            <option value="voteScore">Lowest to highest score</option>
            <option value="voteScore,reverse">Highest to lowest score</option>
        </select>

        <button onClick={() => this.openPostModal()}>
          Add Post
        </button>

        <ul>
          {this.props.posts.map((post) => (
            <li key={post.id}>
              <Link
                to={`/${post.category}/${post.id}`}
                >{post.title}</Link>, score: {post.voteScore} - posted on {toDate(post.timestamp)}
            </li>
          ))}
        </ul>

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={this.state.postModalOpen}
          onRequestClose={this.closePostModal}
          contentLabel='Modal'
        >
          <div>
            <h3>New Post</h3>
            <PostForm categories={this.state.categories} />
            <button onClick={() => this.closePostModal()}>
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    )
  }
}

export default ListPosts