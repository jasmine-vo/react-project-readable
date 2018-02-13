import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListPosts from './ListPosts.js';
import * as API from '../utils/api';

class App extends Component {
  state = {
    categories: [],
    posts: []
  }

// load categories and posts from API after component is mounted
  componentDidMount() {
    API.getCategories().then((data) => {
      this.setState({ categories:data})
    })
    API.getPosts().then((data) => {
      console.log(data)
      this.setState({ posts:data })
    })
  }

  render() {
    return (
      <div>
        <h1>Readable</h1>
        {this.state.categories.map((category) => (
        <button key={category}>
          {category}
        </button>
        ))}
        <Route exact path="/" render={() => (
          <div>
            <ListPosts
              posts={this.state.posts}
            />
          </div>
        )}/>
      </div>
    );
  }
}

export default App;