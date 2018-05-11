import React, { Component } from 'react';
import * as API from '../utils/api';
import { connect } from 'react-redux';
import { addPost, editPost } from '../actions';

class PostForm extends Component {

  state = {
    title: '',
    author: '',
    category: 'react',
    body: ''
  }

  componentWillMount() {
    if (this.props.post) {
      this.setState({
        title: this.props.post.title,
        body: this.props.post.body
      })
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.props.post) {
      API.editPost(this.props.post.id, this.state.title, this.state.body)
        .then(data => this.props.editPost(data));
    } else {
      const uuidv1 = require('uuid/v1')
      const post = {
        id: uuidv1(),
        timestamp: Date.now(),
        title: this.state.title,
        body: this.state.body,
        author: this.state.author,
        category: this.state.category
      }
      API.addNewPost(post).then(data => this.props.addPost(data));
    }
    this.props.onClosePostModal();
  }

  render() {

    const { title, author, body } = this.state
    const { post, category, categories } = this.props

    /* 
    Reference for Enable/Disable Submit Button
    https://goshakkk.name/form-recipe-disable-submit-button-react/ 
    */

    const enabled =
      post ||
      (title.length > 0 &&
      body.length > 0 &&
      author.length > 0);

    return (
      <div className='post-form'>
        <h3>{post ? 'Edit Post' : 'New Post'}</h3>

        <form onSubmit={this.handleSubmit}>
          <label>
            Title<br />
            <input
              type='text'
              name='title'
              value={title}
              onChange={this.handleChange}
              maxLength='60'
              className='form-field-sml'
            />
          </label>
          <br />
          <label>
            Name<br />
            <input
              type='text'
              name='author'
              value={post ? post.author : author}
              onChange={this.handleChange}
              disabled={post ? true : false}
              maxLength='20'
              className='form-field-sml'
            />
          </label>
          <br />
          <label>
            Category 
            <select
              defaultValue={post ? category : `react`}
              name='category'
              onChange={this.handleChange}
              disabled={post ? true : false}>
                {categories.map((category, index) => (
                  <option value={category} key={index}>{category}</option>
                  ))
                }
            </select>
          </label>
          <br />
          <label>
            Body<br />
            <textarea
              type='text'
              name='body'
              value={this.state.body}
              onChange={this.handleChange}
              className='form-field-lrg'
              autoComplete='off'
            />
          </label>

          <input
            type='submit'
            value='Submit'
            disabled={!enabled}
            className='form-submit-button'
          />
        </form>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    categories: state.categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addPost: (post) => dispatch(addPost(post)),
    editPost: (post) => dispatch(editPost(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm)