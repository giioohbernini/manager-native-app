import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './src/reducers'
import firebase from 'firebase'
import ReduxThunk from 'redux-thunk'
import Router from './src/Router'


class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyDb0ajTxCfSSYTGZo1ziRRZXs59wNBWsU4',
      authDomain: 'manager-c855d.firebaseapp.com',
      databaseURL: 'https://manager-c855d.firebaseio.com',
      projectId: 'manager-c855d',
      storageBucket: 'manager-c855d.appspot.com',
      messagingSenderId: '381573513331'
    }

    firebase.initializeApp(config);
  }
  render () {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}

export default App
