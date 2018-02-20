import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toDate } from '../utils/helpers';

class ListPosts extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
  }

  render() {
    return (
      <div>
        <button>
          <Link
            to="/"
          >All</Link>
        </button>
        {this.props.categories.map((category) => (
          <button key={category}>
            <Link
              to={`/${category}`}
            >{category}</Link>
          </button>
        ))}
        <select
          defaultValue="timestamp,reverse"
          onChange={(event) => this.props.onSortPosts(event.target.value)}>
            <option value="none" disabled>Sort by...</option>
            <option value="timestamp">Oldest to newest</option>
            <option value="timestamp,reverse">Newest to oldest</option>
            <option value="voteScore">Lowest to highest score</option>
            <option value="voteScore,reverse">Highest to lowest score</option>
        </select>
        <ul>
          {this.props.posts.map((post) => (
            <li key={post.id}>
              <Link
                to={`/${post.category}/${post.id}`}
                >{post.title}</Link>, score: {post.voteScore} - posted on {toDate(post.timestamp)}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default ListPosts