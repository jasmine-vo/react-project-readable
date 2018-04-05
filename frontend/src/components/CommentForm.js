import React, { Component } from 'react';
import * as API from '../utils/api';
import { connect } from 'react-redux';
import { addComment, editComment } from '../actions';

class CommentForm extends Component {

  state = {
    body: '',
    author: '',
  }

  componentWillMount() {
    if (this.props.editMode) {
      API.getCommentDetails(this.props.commentId).then(data => 
        this.setState({ body: data.body })
      )
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  // update API with new comment 
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.props.editMode) {
      API.editComment(this.props.commentId, Date.now(), this.state.body)
        .then(data => this.props.editComment(data));
      this.props.onCloseEditCommentForm();
    } else {
      const uuidv1 = require('uuid/v1')
      const comment = {
        id: uuidv1(),
        timestamp: Date.now(),
        body: this.state.body,
        author: this.state.author,
        parentId: this.props.parentId
      }
      API.addComment(comment).then(data => this.props.addComment(data));
      this.setState({
        body: '',
        author: '',
      })
    }
  }

  render() {

    /* 
    Reference for Enable/Disable Submit Button
    https://goshakkk.name/form-recipe-disable-submit-button-react/ 
    */

    const enabled =
      this.props.editMode ||
      (this.state.body.length > 0 &&
      this.state.author.length > 0);

    if (this.props.displayForm && !(this.props.editMode)) {
      return (
        <div>
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
    } else if (this.props.displayForm && this.props.editMode) {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>           
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
    } else {
      return (
        null
      )
    }
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addComment: (comment) => dispatch(addComment(comment)),
    editComment: (comment) => dispatch(editComment(comment)),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CommentForm)