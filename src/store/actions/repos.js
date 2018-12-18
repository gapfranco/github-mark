export const addReposRequest = repos => ({
  type: 'ADD_REPOS_REQUEST',
  payload: { repos }
})

export const addReposSuccess = data => ({
  type: 'ADD_REPOS_SUCCESS',
  payload: { data }
})

export const removeRepos = id => ({
  type: 'REMOVE_REPOS',
  payload: { id }
})
