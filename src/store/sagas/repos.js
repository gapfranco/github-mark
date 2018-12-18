import { call, put } from 'redux-saga/effects'
import moment from 'moment'

import api from '../../services/api'
import { addReposSuccess } from '../actions/repos'

export function * addRepos (action) {
  const { data } = yield call(api.get, `/repos/${action.payload.repos}`)
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
  yield put(addReposSuccess(reposData))
}
