import {
	ADD_POST
} from '../actions'

const initialPostState = {
    	author: null,
    	body: null,
    	category: null,
    	deleted: null,
    	id: null,
    	timestamp: null,
    	title: null,
}

function post (state = initialPostState, action) {
	const { author, body, category, deleted, id, timestamp, title } = action
    
    switch (action.type) {
      case 'ADD_POST':
    	return {
          ...state,
          [author]: ,
          [body]: ,
          [category]: ,
          [deleted]: ,
          [id]: ,
          [timestamp]: ,
          [title]: ,
        }
      default:
        return state
    }
}

export default post