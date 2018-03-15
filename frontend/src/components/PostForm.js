import React, { Component } from 'react';

class PostForm extends Component {

	state = {
    title: '',
    author: '',
    category: '',
    body: ''
  }

  handleChange = (event) => {
  	this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
  	alert(this.state.title);
    event.preventDefault();
  }

  render() {
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
            <select defaultValue="none" name="category" value={this.state.category} onChange={this.handleChange}>
                <option value="none" disabled></option>
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
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default PostForm