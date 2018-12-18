import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import moment from 'moment'

import { bindActionCreators } from 'redux'
import * as reposActions from '../../store/actions/repos'

// import api from '../../services/api'
import logo from '../../assets/logo.png'
import CompareList from '../../components/CompareList'
import { Container, Form } from './styles'

class Main extends Component {
  static propTypes = {
    addRepos: PropTypes.func.isRequired,
    removeRepos: PropTypes.func.isRequired,
    repositories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        owner: PropTypes.shape({
          login: PropTypes.string,
          avatar_url: PropTypes.string,
          stargazers_count: PropTypes.number,
          forks_count: PropTypes.number,
          open_issues_count: PropTypes.number,
          pushed_at: PropTypes.string
        })
      })
    ).isRequired
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
    // r.lastCommit = moment(r.pushed_at).fromNow()
    this.props.addReposRequest(this.state.repositoryInput)
    // this.setState({ loading: true })
    // try {
    //   const { data: repository } = await api.get(`repos/${this.state.repositoryInput}`)
    //   repository.lastCommit = moment(repository.pushed_at).fromNow()
    //   this.setState({
    //     repositoryInput: '',
    //     repositoryError: false,
    //     repositories: [...this.state.repositories, repository]
    //   })
    // } catch (err) {
    //   this.setState({ repositoryError: true })
    // } finally {
    //   this.setState({ loading: false })
    // }
  }

  handleRemoveRepository = id => {
    this.props.removeRepos(id)
  }

  render () {
    console.log(this.props)
    return (
      <Container>
        <img src={logo} alt='Github mark' />

        <Form withError={this.state.repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type='text'
            placeholder='usuário/repositório'
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type='submit'>
            {this.state.loading ? <i className='fa fa-spinner fa-pulse' /> : 'OK'}
          </button>
        </Form>
        <CompareList
          repositories={this.props.repositories}
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
