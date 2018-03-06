export const ADD_POST = 'ADD_POST'

export function addPost ({ author, body, category, deleted, id, timestamp, title, voteScore }) {
	return {
  	type: ADD_POST,
  	author,
  	body,
  	category,
  	deleted,
  	id,
  	timestamp,
  	title,
    voteScore,
  }
}