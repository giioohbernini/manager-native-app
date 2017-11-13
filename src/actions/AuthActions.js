import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from './types'

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  }
}

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  }
}

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER })

    if (validateUser(dispatch, email, password)) {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => loginUserSuccess(dispatch, user))
        .catch(error => {
          console.log(error)
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch(() => loginUserFail(dispatch))
        })
    }
  }
}

const validateUser = (dispatch, email, password) => {
  if (email === '') {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: 'Empty email'
    })
    return false
  }

  return true
}

const loginUserFail = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_FAIL,
    payload: 'Authentication Error'
  })
}

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  })

  Actions.main()
}
