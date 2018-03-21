export const ADD_POST = 'ADD_POST'

export function addPost (post) {
  return {
    type: ADD_POST,
    post
  }
}
