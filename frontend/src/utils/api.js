const url = `${process.env.REACT_APP_BACKEND}`;

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCategories = () =>  {
	return fetch(`${url}/categories`, { headers, credentials: 'include' })
		.then(res => res.json())
  		.then(({ categories }) => categories.map(({ name }) => name))
}

