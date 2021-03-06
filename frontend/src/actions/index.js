export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_POSTS = 'GET_POSTS'
export const ADD_POST = 'ADD_POST'
export const VOTE_POST = 'VOTE_POST'
export const EDIT_POST = 'EDIT_POST'
export const GET_POST_DETAILS = 'GET_POST_DETAILS'
export const GET_COMMENTS = 'GET_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const UPDATE_POST_SORT = 'UPDATE_POST_SORT'
export const DELETE_POST = 'DELETE_POST'

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

export function updatePostScore (post) {
  return {
    type: VOTE_POST,
    post,
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

export function getComments (comments) {
  return {
    type: GET_COMMENTS,
    comments,
  }
}

export function addComment (comment) {
  return {
    type: ADD_COMMENT,
    comment,
  }
}

export function editComment (comment) {
  return {
    type: EDIT_COMMENT,
    comment
  }
}

export function deleteComment (commentId) {
  return {
    type: DELETE_COMMENT,
    commentId
  }
}

export function updateCommentScore (comment) {
  return {
    type: VOTE_COMMENT,
    comment,
  }
}

export function updatePostSort (sort) {
  return {
    type: UPDATE_POST_SORT,
    sort
  }
}

export function deletePost (postId) {
  return {
    type: DELETE_POST,
    postId
  }
}