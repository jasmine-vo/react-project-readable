import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ListPosts from './ListPosts.js';
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
		  <select
            defaultValue="timestamp,reverse"
			onChange={(event) => this.sortPosts(event.target.value)}>
            <option value="none" disabled>Sort by...</option>
            <option value="timestamp">Oldest to newest</option>
			<option value="timestamp,reverse">Newest to oldest</option>
            <option value="voteScore">Lowest to highest score</option>
			<option value="voteScore,reverse">Highest to lowest score</option>
          </select>
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