import {
  GET_POSTS,
  ADD_POST,
  VOTE_POST,
} from '../actions'


function posts (state = {}, action) {
  const { post, posts, vote } = action

  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts
      }
    case ADD_POST:
      return Object.assign({}, state, {
        posts: [
          ...state.posts,
          post
        ]
      })
    case VOTE_POST:
      return Object.assign({}, state, {
        posts: state.posts.map((p) => {
          if (p.id === post.id) {
            if (vote === 'upVote') {
              return Object.assign({}, p, {
                voteScore: p.voteScore + 1
              })
            } else {
              return Object.assign({}, p, {
                voteScore: p.voteScore - 1
              })
            }
          }
          return p
        })
      })
    default:
      return state
  }
}

export default posts