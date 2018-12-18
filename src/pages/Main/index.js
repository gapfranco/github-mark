import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import moment from 'moment'

import { bindActionCreators } from 'redux'
import { Creators as reposActions } from '../../store/ducks/repos'

// import api from '../../services/api'
import logo from '../../assets/logo.png'
import CompareList from '../../components/CompareList'
import { Container, Form } from './styles'

class Main extends Component {
  static propTypes = {
    addReposRequest: PropTypes.func.isRequired,
    removeRepos: PropTypes.func.isRequired,
    repositories: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.oneOfType([null, PropTypes.string]),
      data: PropTypes.arrayOf(
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
    })
  }

  componentWillMount () {
    this.setState({
      loading: false,
      repositoryError: false,
      repositoryInput: '',
      repositories: []
    })
  }

  handleAddRepository = async e => {
    e.preventDefault()
    this.props.addReposRequest(this.state.repositoryInput)
    this.setState({ repositoryInput: '' })
  }

  handleRemoveRepository = id => {
    this.props.removeRepos(id)
  }

  render () {
    return (
      <Container>
        <img src={logo} alt='Github mark' />

        <Form withError={!!this.props.repositories.error} onSubmit={this.handleAddRepository}>
          <input
            type='text'
            placeholder='usuário/repositório'
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type='submit'>
            {this.props.repositories.loading ? <i className='fa fa-spinner fa-pulse' /> : 'OK'}
          </button>
        </Form>
        <CompareList
          repositories={this.props.repositories.data}
          removeRepos={this.handleRemoveRepository}
        />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  repositories: state.repos
})

const mapDispatchToProps = dispatch => bindActionCreators(reposActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
