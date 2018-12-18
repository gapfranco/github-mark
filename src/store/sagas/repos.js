import { call, put, select } from 'redux-saga/effects'
import moment from 'moment'

import api from '../../services/api'
import { Creators as ReposActions } from '../ducks/repos'

export function * addRepos (action) {
  try {
    const { data } = yield call(api.get, `/repos/${action.payload.repos}`)

    const isDuplicated = yield select(state => state.repos.data.find(rep => rep.id === data.id))
    if (!isDuplicated) {
      const reposData = {
        id: data.id,
        name: data.name,
        login: data.login,
        avatar_url: data.owner.avatar_url,
        stargazers_count: data.stargazers_count,
        forks_count: data.forks_count,
        open_issues_count: data.open_issues_count,
        lastCommit: moment(data.pushed_at).fromNow()
      }
      yield put(ReposActions.addReposSuccess(reposData))
    } else {
      yield put(ReposActions.addReposFailure({ error: 'Duplicated' }))
    }
  } catch (error) {
    yield put(ReposActions.addReposFailure({ error }))
  }
}
