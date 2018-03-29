export const GET_POSTS = 'GET_POSTS'
export const ADD_POST = 'ADD_POST'
export const VOTE_POST = 'VOTE_POST'

export function getPosts (posts) {
  return {
    type: GET_POSTS,
    posts
  }
}

export function addPost (post) {
  return {
    type: ADD_POST,
    post
  }
}

export function updatePostScore (post, vote) {
  return {
    type: VOTE_POST,
    post,
    vote
  }
}

