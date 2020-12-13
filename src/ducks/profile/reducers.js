import {
  PROFILE_CHANGE,
  PROFILE_UPDATED,
  PROFILE_FORM_RESET,
  PROFILE_UPDATE_FAILED,
  GET_PROFILE_SUCCESS,
  PROFILE_UPDATE_PENDING,
  PROFILE_PICTURE_UPDATED,
  BACKGROUND_PICTURE_UPDATED,
  BACKGROUND_PICTURE_UPDATE_PENDING
} from './types';

const initialState = {
  profileFormData: {
    firstName: '',
    lastName: '',
    email: '',
    homeCity: '',
    travelerType: '',
    errorMsg: ''
  },
  data: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    homeCity: '',
    travelerType: '',
    profilePicture: '',
    backgroundPicture: ''
  },
  bgImgageLoading: false,
  profileUpdatePending: false
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        profileFormData: {
          ...state.profileFormData, ...action.payload
        }
      };

    case PROFILE_CHANGE:
      return {
        ...state,
        profileFormData: {
          ...state.profileFormData, ...action.payload
        }
      };

    case PROFILE_UPDATE_PENDING:
      return {
        ...state,
        profileUpdatePending: true
      };

    case PROFILE_UPDATE_FAILED:
      return {
        ...state,
        profileFormData: {
          ...state.profileFormData,
          errorMsg: action.payload
        },
        profileUpdatePending: false
      }

    case PROFILE_UPDATED:
      return {
        ...state,
        data: action.payload,
        profileFormData: {
          ...state.profileFormData, ...action.payload
        },
        profileUpdatePending: false
      };

    case PROFILE_FORM_RESET:
      return {
        ...state,
        loginFormData: {
          ...initialState.loginFormData
        }
      };

    case PROFILE_PICTURE_UPDATED:
      return {
        ...state,
        data: {
          ...state.data,
          profilePicture: action.payload
        }
      };

    case BACKGROUND_PICTURE_UPDATE_PENDING:
      return {
        ...state,
        bgImgageLoading: true
      };

    case BACKGROUND_PICTURE_UPDATED:
      return {
        ...state,
        data: {
          ...state.data, backgroundPicture: action.payload
        },
        bgImgageLoading: false
      };

    default:
      return state;
  }
}

export default profileReducer;