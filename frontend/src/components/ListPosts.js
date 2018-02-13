import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toDate } from '../utils/helpers';

class ListPosts extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.posts.map((post) => (
            <li key={post.id}>
              {post.title}, score: {post.voteScore} - posted on {toDate(post.timestamp)}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default ListPosts