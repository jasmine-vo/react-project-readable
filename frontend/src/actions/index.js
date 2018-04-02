export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_POSTS = 'GET_POSTS'
export const ADD_POST = 'ADD_POST'
export const VOTE_POST = 'VOTE_POST'
export const EDIT_POST = 'EDIT_POST'
export const GET_POST_DETAILS = 'GET_POST_DETAILS'

export function getCategories (categories) {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

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

export function editPost (post) {
  return {
    type: EDIT_POST,
    post
  }
}

export function getPostDetails (post) {
  return {
    type: GET_POST_DETAILS,
    post
  }
}