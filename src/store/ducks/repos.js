
// Types
export const Types = {
  ADD_REQUEST: 'repos/ADD_REQUEST',
  ADD_SUCCESS: 'repos/ADD_SUCCESS',
  ADD_FAILURE: 'repos/ADD_FAILURE',
  REMOVE: 'repos/REMOVE'
}

// reducers

const INITIAL_STATE = {
  loading: false,
  data: [],
  error: null
}

export default function repos (state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return { ...state, loading: true }
    case Types.ADD_SUCCESS:
      return { ...state, loading: false, error: null, data: [...state.data, action.payload.data] }
    case Types.ADD_FAILURE:
      return { ...state, loading: false, error: action.payload.error }
    case Types.REMOVE:
      return state.filter(repos => repos.id !== action.payload.id)
    default:
      return state
  }
}

// Actions

export const Creators = {
  addReposRequest: repos => ({
    type: Types.ADD_REQUEST,
    payload: { repos }
  }),

  addReposSuccess: data => ({
    type: Types.ADD_SUCCESS,
    payload: { data }
  }),

  addReposFailure: error => ({
    type: Types.ADD_FAILURE,
    payload: error
  }),

  removeRepos: id => ({
    type: Types.REMOVE,
    payload: { id }
  })
}
