import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListPosts from './ListPosts.js';
import PostDetail from './PostDetail.js';
import * as API from '../utils/api';
import sortBy from 'sort-by';

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
      this.setState({ posts:data.sort(sortBy('-timestamp')) })
    })
  }

  sortPosts = (values) => {
    
    const value = values.split(',')[0];
    const reversed = values.split(',')[1] === 'reverse';

    if (reversed) {
      this.setState((state) => ({ posts: this.state.posts.sort(sortBy(`-${value}`)) }))
    } else {
      this.setState((state) => ({ posts: this.state.posts.sort(sortBy(value)) }))
    }
  }

  render() {
    return (
      <div>
        <h1>Readable</h1>
        <Route exact path="/" render={() => (
          <div>
            <ListPosts
              categories={this.state.categories}
              posts={this.state.posts}
              onSortPosts={this.sortPosts}
            />
          </div>
        )}/>
        <Route exact path={`/:category`} render={(props) => (
          <div>
            <ListPosts
              categories={this.state.categories}
              posts={this.state.posts.filter((post) => post.category === props.match.params.category)}
              onSortPosts={this.sortPosts}
            />
          </div>
        )}/>
        <Route exact path={`/:category/:id`} render={(props) => (
          <div>
            <PostDetail
              id={props.match.params.id}
            />
          </div>
        )}/>
      </div>
    );
  }
}

export default App;