import {
  SIGN_UP_FULFILLED,
  SIGN_UP_REJECTED,
  SIGN_UP_PENDING,
  GET_AUTH_SUCCESS,
  LOGIN_CHANGE,
  LOGIN_PENDING,
  LOGIN_REJECTED,
  LOGIN_FULFILLED,
  LOGIN_FORM_RESET,
  LOGOUT
} from './types';

const initialState = {
  isAuth: false,
  user: null,
  loginFormData: {
    email: '',
    password: '',
    errorMsg: ''
  },
  isSignupPending: false,
  isLoginPending: false,
  signupErrorMsg: ''
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_AUTH_SUCCESS:

      console.log('GET_AUTH_SUCCESS')
      return {
        ...state,
        isAuth: true,
        user: action.payload,
      };

    case SIGN_UP_PENDING:
      return {
        ...state,
        isSignupPending: true
      }
    case SIGN_UP_REJECTED:
      return {
        ...state,
        isSignupPending: false,
        signupErrorMsg: action.payload
      }

    case SIGN_UP_FULFILLED:
      return {
        ...state,
        isAuth: true,
        user: action.payload,
        isSignupPending: false,
        signupErrorMsg: ''
      };

    case LOGIN_CHANGE:
      return {
        ...state,
        loginFormData: { ...state.loginFormData, ...action.payload }
      };

    case LOGIN_PENDING:
      return {
        ...state,
        isLoginPending: true
      };

    case LOGIN_FORM_RESET:
      return {
        ...state,
        loginFormData: { ...initialState.loginFormData }
      };

    case LOGIN_REJECTED:
      return {
        ...state,
        loginFormData: {
          ...state.loginFormData,
          errorMsg: action.payload
        },
        isLoginPending: false
      }

    case LOGIN_FULFILLED:
      return {
        ...state,
        isAuth: true,
        user: action.payload,
        isLoginPending: false
      };

    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default authReducer;