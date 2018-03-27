import {
  GET_POSTS,
  ADD_POST,
} from '../actions'


function posts (state = {}, action) {
  const { post, posts } = action

  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts
      }
    case ADD_POST:
      return {
        ...state,
        post
      }
    default:
      return state
  }
}

export default posts