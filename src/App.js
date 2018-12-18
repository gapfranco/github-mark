import React, { Component, Fragment } from 'react'
import { Provider } from 'react-redux'

import './config/reactotron'
import store from './store'

import GlobalStyle from './styles/global'
import Main from './pages/Main'

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Fragment>
          <GlobalStyle />
          <Main />
        </Fragment>
      </Provider>
    )
  }
}

export default App
