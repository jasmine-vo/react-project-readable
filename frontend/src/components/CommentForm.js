import React, { Component } from 'react';
import * as API from '../utils/api';

class CommentForm extends Component {

  state = {
    body: '',
    author: '',
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  // update API with new comment 
  handleSubmit = (event) => {
    event.preventDefault();
    const uuidv1 = require('uuid/v1')
    const comment = {
      id: uuidv1(),
      timestamp: Date.now(),
      body: this.state.body,
      author: this.state.author,
      parentId: this.props.parentId
    }
    API.addComment(comment).then(data => console.log(data));
  }

  render() {

    /* 
    Reference for Enable/Disable Submit Button
    https://goshakkk.name/form-recipe-disable-submit-button-react/ 
    */

    const enabled =
      this.state.body.length > 0 &&
      this.state.author.length > 0

    return (
      <div>
        <h4>Add Comment</h4>
        <form onSubmit={this.handleSubmit}>
          <label>
            Your Name:
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleChange}
            />
          </label><br />
          <label>
            Comment:
            <input
              type="text"
              name="body"
              value={this.state.body}
              onChange={this.handleChange}
            />
          </label><br />
          <input type="submit" value="Submit" disabled={!enabled}/>
        </form>
      </div>
    )
  }
}

export default CommentForm;