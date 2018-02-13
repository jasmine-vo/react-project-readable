import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
        <Route exact path="/" render={() => (
          <div>
            <ListPosts
              posts={this.state.posts}
            />
          </div>
        )}/>
        <Route path={`/:category`} render={(props) => (
          <div>
            <ListPosts
              posts={this.state.posts.filter((post) => post.category === props.match.params.category)}
            />
          </div>
        )}/>
      </div>
    );
  }
}

export default App;