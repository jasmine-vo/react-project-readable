const url = 'http://localhost:3001'

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': token
}

// Get all of the categories available for the app
export const getCategories = () =>  {
  return fetch(`${url}/categories`, { headers })
    .then(res => res.json())
    .then(({ categories }) => categories.map(({ name }) => name))
}

// Get all of the posts
export const getPosts = () => {
  return fetch(`${url}/posts`, { headers })
    .then(res => res.json())
}

// Get the details of a single post
export const getPostDetails = (id) => {
  return fetch(`${url}/posts/${id}`, { headers })
	.then(res => res.json())
}

// Add a new post
export const addNewPost = (post) => {
  return fetch(`${url}/posts`, {
    method: 'POST',
    headers,
    body: JSON.stringify(post)
  }).then(data => data.json())
}

// Vote on a post, takes in string 'upVote' or 'downVote'
export const addPostVote = (id, vote) => {
  return fetch(`${url}/posts/${id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ option: vote })
  }).then(data => data.json())
}

// Edit the details of an existing post
export const editPost = (id, title, body) => {
  return fetch(`${url}/posts/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      title: title,
      body: body
    })
  }).then(data => data.json())
}

// Sets the deleted flag for a post to 'true' and
// sets the parentDeleted flag for all child comments to 'true'
export const deletePost = (id) =>
  fetch(`${url}/posts/${id}`, {
    method: 'DELETE',
    headers,
  }).then(res => console.log(res))

// Get all the comments for a signle post
export const getComments = (id) => {
  return fetch (`${url}/posts/${id}/comments`, {
    headers,
  }).then(data => data.json())
}

// Add a comment to a post
export const addComment = (comment) => {
  return fetch(`${url}/comments`, {
    method: 'POST',
    headers,
    body: JSON.stringify(comment)
  }).then(data => data.json())
}

// Get the details for a single comment
export const getCommentDetails = (id) => {
  return fetch(`${url}/comments/${id}`, { headers })
  .then(res => res.json())
}

// Edit the details of an existing comment
export const editComment = (id, timestamp, body) => {
  return fetch(`${url}/comments/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      timestamp: timestamp,
      body: body
    })
  }).then(data => data.json())
}

// Sets a comment's deleted flag to `true`
export const deleteComment = (id) =>
  fetch(`${url}/comments/${id}`, {
    method: 'DELETE',
    headers,
  }).then(res => console.log(res))

// Vote on a comment
export const addCommentVote = (id, vote) => {
  return fetch(`${url}/comments/${id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ option: vote })
  }).then(data => data.json())
}