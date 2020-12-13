import axios from 'axios';
import { push } from 'connected-react-router';

import {
  SIGN_UP_FULFILLED,
  SIGN_UP_REJECTED,
  SIGN_UP_PENDING,
  GET_AUTH_SUCCESS,
  LOGIN_FULFILLED,
  LOGIN_PENDING,
  LOGIN_REJECTED,
  LOGIN_CHANGE,
  LOGIN_FORM_RESET,
  LOGOUT
} from './types';

export const getAuth = () => {
  return async (dispatch) => {
    console.log(1);

    try {
      axios.get('/api/auth/session')
        .then(response => {
          console.log(response);
          dispatch({
            type: GET_AUTH_SUCCESS,
            payload: response.data.data
          });
        })
        .catch(err => {
          throw err;
        });

    } catch (err) {
      console.log(err);
    }

    // handleError({}, 'Not found error');
  }
}

export const signupUser = (data) => {
  return async (dispatch, getState) => {

    // const data = getState();
    console.log("signup action");
    console.log(data);

    // const isValid = !getState().form.signup.syncErrors;

    // if (!isValid) {
    // handleError({}, 'Signup Form is not valid');
    // return;
    // }

    // api request

    const { firstName, lastName, email, password } = data;

    dispatch({
      type: SIGN_UP_PENDING
    });

    axios.post('/api/auth/register', { firstName, lastName, email, password })
      .then(response => {
        console.log('Signed In');
        console.log(response);

        dispatch({
          type: SIGN_UP_FULFILLED,
          payload: response.data.data
        });
        // dispatch(signupReset());
        dispatch(push('/profile'));
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: SIGN_UP_REJECTED,
          payload: err.response.data.message || "Signup Failed"
        });
      });
    // toast(response.message, { type: 'success' });
  }
}

export const loginChange = (data) => {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_CHANGE,
      payload: data
    })
  }
}

export const loginUser = () => {
  return async (dispatch, getState) => {

    const data = getState().auth.loginFormData;
    console.log(data);

    dispatch({
      type: LOGIN_PENDING
    });

    // api request
    axios.post('/api/auth/login', { email: data.email, password: data.password })
      .then(response => {
        console.log('success')
        console.log(response.data);

        dispatch({
          type: LOGIN_FULFILLED,
          payload: response.data.data
        });
        dispatch(loginReset());
        dispatch(push('/profile'));
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_REJECTED,
          payload: err.response.data.message || "Login Failed"
        });
      });
  }
}

export const loginReset = () => {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_FORM_RESET
    })
  }
}

export const logout = () => {
  return async (dispatch) => {

    axios.post('/api/auth/logout')
      .then(response => {
        console.log('success')
        console.log(response);

        dispatch({
          type: LOGOUT
        });
        dispatch(push('/'));
      });
  }
}