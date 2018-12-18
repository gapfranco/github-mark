import React from 'react'
import PropTypes from 'prop-types'

import { Container, Repository } from './styles'

const CompareList = ({ repositories, removeRepos }) => (
  <Container>
    {repositories.map(repository => (
      <Repository key={repository.id}>
        <header>
          <img src={repository.avatar_url} alt={repository.login} />
          <strong>{repository.name}</strong>
          <small>{repository.login}</small>
          <button onClick={() => removeRepos(repository.id)}>Remover</button>
        </header>

        <ul>
          <li>
            {repository.stargazers_count} <small>stars</small>
          </li>
          <li>
            {repository.forks_count} <small>forks</small>
          </li>
          <li>
            {repository.open_issues_count} <small>issues</small>
          </li>
          <li>
            {repository.lastCommit} <small>last commit</small>
          </li>
        </ul>
      </Repository>
    ))}
  </Container>
)

CompareList.propTypes = {
  removeRepos: PropTypes.func.isRequired,
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      login: PropTypes.string,
      avatar_url: PropTypes.string,
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      pushed_at: PropTypes.string
    })
  ).isRequired
}

export default CompareList
