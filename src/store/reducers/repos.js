const INITIAL_STATE = []

export default function repos (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_REPOS_SUCCESS':
      return [...state, action.payload.data]
    case 'REMOVE_REPOS':
      return state.filter(repos => repos.id !== action.payload.id)
    default:
      return state
  }
}
