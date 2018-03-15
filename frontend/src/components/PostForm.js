import React, { Component } from 'react';

class PostForm extends Component {

  render() {
    return (
      <div>
        <form>
          <label>
            Title:
            <input type="text" name="title" />
          </label><br />
          <label>
            Author:
            <input type="text" name="author" />
          </label><br />
          <label>
            Category:
            <select defaultValue="none">
                <option value="none" disabled></option>
                {this.props.categories.map((category, index) => (
                  <option value={category} key={index}>{category}</option>
                  ))
                }
            </select><br />
          </label>
          <label>
            Body:
            <input type='text' name='body' />
          </label><br />
          <input type='submit' value='Submit' />
        </form>
      </div>
    )
  }
}

export default PostForm