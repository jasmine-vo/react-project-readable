import {
  ADD_POST
} from '../actions'


function post (state = {}, action) {
  const { post } = action

  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        post
      }
    default:
      return state
  }
}

export default post