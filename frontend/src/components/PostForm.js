import React, { Component } from 'react';
import * as API from '../utils/api';

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

  handleSubmit = (event) => {
    event.preventDefault();
    const uuidv1 = require('uuid/v1');
    const post = {
      id: uuidv1(),
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.body,
      owner: this.state.author,
      category: this.state.category
    }
    API.addNewPost(post);
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

export default PostForm