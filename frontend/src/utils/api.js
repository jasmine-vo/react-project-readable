const url = `${process.env.REACT_APP_BACKEND}`;

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
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