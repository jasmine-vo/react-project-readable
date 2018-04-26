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

    const { editMode, displayForm } = this.props
    const { body, author } = this.state

    /* 
    Reference for Enable/Disable Submit Button
    https://goshakkk.name/form-recipe-disable-submit-button-react/ 
    */

    const enabled =
      editMode ||
      (body.length > 0 &&
      author.length > 0);

    if (displayForm && !(editMode)) {
      return (
        <div className='comment-form'>

          <form onSubmit={this.handleSubmit}>
            <label>
              Name<br />
              <input
                type='text'
                name='author'
                value={author}
                onChange={this.handleChange}
                className='form-field-sml'
              />
            </label>
            <br />
            <label>
              Comment<br />
              <textarea
                type='text'
                name='body'
                value={body}
                onChange={this.handleChange}
                className='form-field-med'
              />
            </label>

            <input
              type='submit'
              value='Submit'
              disabled={!enabled}
              className='comment-form-submit-button'
            />

          </form>
        </div>
      )
    } else if (displayForm && editMode) {
      return (
        <div className='comment-form'>

          <form onSubmit={this.handleSubmit}>
            <textarea
              type='text'
              name='body'
              value={this.state.body}
              onChange={this.handleChange}
              className='form-field-med'
            />

            <input
              type='submit'
              value='Submit'
              disabled={!enabled}
              className='comment-form-submit-button'
            />

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