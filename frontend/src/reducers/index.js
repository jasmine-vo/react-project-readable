import { combineReducers } from 'redux'

import {
  GET_CATEGORIES,
  GET_POSTS,
  ADD_POST,
  VOTE_POST,
  EDIT_POST,
  GET_POST_DETAILS,
  GET_COMMENTS
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
  const { post, posts } = action

  switch (action.type) {
    case GET_POSTS:
      return Object.assign([], state, posts)
    case ADD_POST:
      return state.concat(post)
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

function comments (state = {}, action) {
  const { comments, parentId } = action

  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        [parentId]: comments
      }
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  post,
  comments
})