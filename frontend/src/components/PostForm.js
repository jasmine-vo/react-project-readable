import React, { Component } from 'react';
import * as API from '../utils/api';
import { connect } from 'react-redux';
import { addPost } from '../actions';

class PostForm extends Component {

	state = {
    title: '',
    author: '',
    category: 'react',
    body: ''
  }

  handleChange = (event) => {
  	this.setState({[event.target.name]: event.target.value});
  }

  // update API with new post, 
  handleSubmit = (event) => {
    event.preventDefault();
    const uuidv1 = require('uuid/v1');
    const post = {
      id: uuidv1(),
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.category
    }
    API.addNewPost(post).then(data => this.props.addPost(data));
    // this.props.addPost(post);
    this.props.onClosePostModal();
  }

  render() {

    /* 
    Reference for Enable/Disable Submit Button
    https://goshakkk.name/form-recipe-disable-submit-button-react/ 
    */

    const enabled =
      this.state.title.length > 0 &&
      this.state.body.length > 0 &&
      this.state.author.length > 0;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Title:
            <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
          </label><br />
          <label>
            Author:
            <input type="text" name="author" value={this.state.author} onChange={this.handleChange} />
          </label><br />
          <label>
            Category:
            <select defaultValue={this.state.category} name="category" onChange={this.handleChange}>
                {this.props.categories.map((category, index) => (
                  <option value={category} key={index}>{category}</option>
                  ))
                }
            </select><br />
          </label>
          <label>
            Body:
            <input type="text" name="body" value={this.state.body} onChange={this.handleChange} />
          </label><br />
          <input type="submit" value="Submit" disabled={!enabled}/>
        </form>
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
    addPost: (post) => dispatch(addPost(post)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm)