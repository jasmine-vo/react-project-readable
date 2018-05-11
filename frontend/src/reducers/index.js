import { combineReducers } from 'redux'

import {
  GET_CATEGORIES,
  GET_POSTS,
  ADD_POST,
  VOTE_POST,
  EDIT_POST,
  GET_POST_DETAILS,
  GET_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT,
  UPDATE_POST_SORT,
  DELETE_POST,
} from '../actions'

function categories (state = [], action) {
  const { categories } = action

  switch (action.type) {
    case GET_CATEGORIES:
      return Object.assign([], state, categories)
    default:
      return state
  }
}

function posts (state = [], action) {
  const { post, posts, postId } = action

  switch (action.type) {
    case GET_POSTS:
      return Object.assign([], state, posts)
    case ADD_POST:
      return state.concat(post)
    case VOTE_POST:
      return state.map(p => {
        if (p.id === post.id) {
          p = post
        }
      return p
      })
    case DELETE_POST:
      return state.filter((p) => p.id !== postId)
    default:
      return state
  }
}

function post (state = [], action) {
  const { post } = action

  switch (action.type) {
    case GET_POST_DETAILS:
      return Object.assign([], state, post)
    case EDIT_POST:
      return Object.assign([], state, post)
    case VOTE_POST:
      return Object.assign([], state, post)
    default:
      return state
  }
}

function comments (state = [], action) {
  const { comments, comment, commentId } = action

  switch (action.type) {
    case GET_COMMENTS:
      return Object.assign([], state, comments)
    case ADD_COMMENT:
      return state.concat(comment)
    case EDIT_COMMENT:
      return state.map((c) => c.id === comment.id ? comment : c)
    case DELETE_COMMENT:
      return state.filter((c) => c.id !== commentId)
    case VOTE_COMMENT:
      return state.map((c) => c.id === comment.id ? comment : c)
    default:
      return state
  }
}

function sort (state = {method: '-timestamp'}, action) {
  const { sort } = action

  switch (action.type) {
    case UPDATE_POST_SORT:
      return Object.assign({}, state, {method: sort})
    default:
      return state
  }
}
export default combineReducers({
  categories,
  posts,
  post,
  comments,
  sort
})