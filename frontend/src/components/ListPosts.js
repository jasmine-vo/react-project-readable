import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toDate } from '../utils/helpers';
import Modal from 'react-modal';
import PostForm from './PostForm';
import * as API from '../utils/api';
import sortBy from 'sort-by';
import { connect } from 'react-redux';
import { getPosts } from '../actions';

class ListPosts extends Component {

  state = {
    postModalOpen: false,
    categories: [],
  }

  // load categories and posts from API after component is mounted
  componentDidMount() {
    API.getCategories().then((data) => {
      this.setState({ categories:data})
    })
    API.getPosts().then(data => this.props.getPosts(data.sort(sortBy('-timestamp'))));
  }

  // addNewPost = (newPost) => {
  //   this.setState(() => ({
  //     posts: this.state.posts.concat([newPost])
  //   }))
  // }

  sortPosts = (values) => {
    
    const value = values.split(',')[0];
    const reversed = values.split(',')[1] === 'reverse';

    if (reversed) {
    	this.props.getPosts(this.props.posts.sort(sortBy(`-${value}`)))
    	console.log(this.props.posts);
    } else {
    	this.props.getPosts(this.props.posts.sort(sortBy(value)))
    	console.log(this.props.posts)
    }
    this.forceUpdate();
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

  	let posts = [];

    if (this.props.category) {
      posts = this.props.posts.filter((post) => post.category === this.props.category)
    } else {
      posts = this.props.posts
    }

    console.log(posts)

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
          onChange={(event) => this.sortPosts(event.target.value)}>
            <option value="none" disabled>Sort by...</option>
            <option value="timestamp">Oldest to newest</option>
            <option value="timestamp,reverse">Newest to oldest</option>
            <option value="voteScore">Lowest to highest score</option>
            <option value="voteScore,reverse">Highest to lowest score</option>
        </select>

        <button onClick={() => this.openPostModal()}>
          Add Post
        </button>
      	{posts ?
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                to={`/${post.category}/${post.id}`}
                >{post.title}</Link>, score: {post.voteScore} - posted on {toDate(post.timestamp)}
            </li>
          ))}
        </ul>
        : null}
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
              categories={this.state.categories}
              onClosePostModal={this.closePostModal}
              onAddNewPost={this.addNewPost}
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
		posts: state.posts
	}
}

function mapDispatchToProps (dispatch) {
  return {
    getPosts: (posts) => dispatch(getPosts(posts)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPosts)
