const url = `${process.env.REACT_APP_BACKEND}`;

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
  return fetch(`${url}/categories`, { headers, credentials: 'include' })
    .then(res => res.json())
    .then(({ categories }) => categories.map(({ name }) => name))
}

// Get all of the posts
export const getPosts = () => {
  return fetch(`${url}/posts`, { headers, credentials: 'include' })
    .then(res => res.json())
}

// Get the details of a single post
export const getPostDetails = (id) => {
  return fetch(`${url}/posts/${id}`, { headers, credentials: 'include' })
	.then(res => res.json())
}

// Add a new post
export const addNewPost = (post) => {
  return fetch(`${url}/posts`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify(post)
  }).then(data => data.json())
}

// Vote on a post, takes in string 'upVote' or 'downVote'
export const addPostVote = (id, vote) => {
  return fetch(`${url}/posts/${id}`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify({ option: vote })
  }).then(data => data.json())
}

// Edit the details of an existing post
export const editPost = (id, title, body) => {
  return fetch(`${url}/posts/${id}`, {
    method: 'PUT',
    headers,
    credentials: 'include',
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
    credentials: 'include'
  }).then(res => console.log(res))