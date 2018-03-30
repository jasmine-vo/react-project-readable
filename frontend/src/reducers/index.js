import { combineReducers } from 'redux'

import {
  GET_CATEGORIES,
  GET_POSTS,
  ADD_POST,
  VOTE_POST,
} from '../actions'

function categories (state = [], action) {
  const { categories } = action

  switch (action.type) {
    case GET_CATEGORIES:
      return state.concat(categories)
    default:
      return state
  }
}

function posts (state = [], action) {
  const { post, posts, vote } = action

  switch (action.type) {
    case GET_POSTS:
      return Object.assign([], state, posts)
    case ADD_POST:
      return state.concat(post)
    case VOTE_POST:
      return state.map((p) => {
          if (p.id === post.id) {
            if (vote === 'upVote') {
              return Object.assign({}, p, {
                voteScore: p.voteScore + 1
              })
            } else {
              return Object.assign({}, p, {
                voteScore: p.voteScore - 1
              })
            }
          }
          return p
        })
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts
})