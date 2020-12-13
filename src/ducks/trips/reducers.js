import {
  INIT_STATE,
  GET_TRIPS_SUCCESS,
  ADD_TRIP_CHANGE,
  ADD_TRIP_SUCCESS,
  ADD_TRIP_FORM_RESET,
  ADD_TRIP_FAILED,
  ADD_TRIP_PENDING,
  ADD_TRIP_IMG_PREVIEW,
  UPDATE_TRIP_FORM_INIT,
  UPDATE_TRIP_CHANGE,
  UPDATE_TRIP_PENDING,
  UPDATE_TRIP_SUCCESS,
  UPDATE_TRIP_FAILED,
  UPDATE_TRIP_FORM_RESET,
  UPDATE_TRIP_IMG_PREVIEW,
  REMOVE_TRIP_FROM_STATE,
  DELETE_TRIP_PENDING,
  DELETE_TRIP_SUCCESS,
  DELETE_TRIP_FAILED,
} from './types';

const initialState = {
  addTripFormData: {
    location: '',
    picture: '',
    dateStart: '',
    dateEnd: '',
    errorMsg: '',
    picturePreviewUrl: ''
  },
  updateTripFormData: {
    id: '',
    location: '',
    picture: '',
    dateStart: '',
    dateEnd: '',
    errorMsg: '',
    picturePreviewUrl: ''
  },
  data: {
    pastTrips: [],
    upcomingTrips: []
  },
  addTripPending: false,
  updateTripPending: false,
  deleteTripPending: false,
  deleteTripErrorMsg: ''
};

const isDatePast = (date) => {
  return new Date(date).getTime() < Date.now()
}

const tripsReducer = (state = initialState, action) => {

  switch (action.type) {
    case GET_TRIPS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        addTripFormData: {
          ...state.addTripFormData, ...action.payload
        }
      };

    case ADD_TRIP_CHANGE:
      return {
        ...state,
        addTripFormData: {
          ...state.addTripFormData,
          ...action.payload
        }
      };

    case ADD_TRIP_IMG_PREVIEW:
      return {
        ...state,
        addTripFormData: {
          ...state.addTripFormData,
          picturePreviewUrl: action.payload
        }
      };

    case ADD_TRIP_PENDING:
      return {
        ...state,
        addTripPending: true
      }

    case ADD_TRIP_SUCCESS:
      const newState = {
        ...state,
        data: {
          ...state.data
        },
        addTripFormData: {
          ...state.addTripFormData,
          errorMsg: ""
        },
        addTripPending: false
      };

      if (isDatePast(action.payload.dateStart)) {
        newState.data.pastTrips = [
          ...newState.data.pastTrips,
          action.payload
        ]
      } else {
        newState.data.upcomingTrips = [
          ...newState.data.upcomingTrips,
          action.payload
        ]
      }

      return newState;

    case ADD_TRIP_FAILED:
      return {
        ...state,
        addTripFormData: {
          ...state.addTripFormData,
          errorMsg: action.payload
        },
        addTripPending: false
      };

    case ADD_TRIP_FORM_RESET:
      return {
        ...state,
        addTripFormData: {
          ...initialState.addTripFormData
        }
      };

    case UPDATE_TRIP_CHANGE:
      return {
        ...state,
        updateTripFormData: {
          ...state.updateTripFormData,
          ...action.payload
        }
      };

    case UPDATE_TRIP_FORM_INIT:
      return {
        ...state,
        updateTripFormData: {
          ...action.payload,
          picturePreviewUrl: action.payload.picture
        }
      };

    case UPDATE_TRIP_IMG_PREVIEW:
      return {
        ...state,
        updateTripFormData: {
          ...state.updateTripFormData,
          picturePreviewUrl: action.payload
        }
      };

    case UPDATE_TRIP_PENDING:
      return {
        ...state,
        updateTripPending: true
      }

    case UPDATE_TRIP_SUCCESS:
      const updatedState = {
        ...state,
        data: {
          ...state.data
        },
        updateTripFormData: {
          ...state.updateTripFormData,
          errorMsg: ""
        },
        updateTripPending: false
      };

      if (isDatePast(action.payload.dateStart)) {
        updatedState.data.pastTrips = [
          ...updatedState.data.pastTrips,
          action.payload
        ]
      } else {
        updatedState.data.upcomingTrips = [
          ...updatedState.data.upcomingTrips,
          action.payload
        ]
      }
      return updatedState;

    case UPDATE_TRIP_FAILED:
      return {
        ...state,
        updateTripFormData: {
          ...state.updateTripFormData,
          errorMsg: action.payload
        },
        updateTripPending: false
      };

    case UPDATE_TRIP_FORM_RESET:
      return {
        ...state,
        updateTripFormData: {
          ...initialState.updateTripFormData
        }
      };

    case DELETE_TRIP_PENDING:
      return {
        ...state,
        deleteTripPending: true
      }

    case DELETE_TRIP_SUCCESS:
      return {
        ...state,
        deleteTripPending: false
      }

    case DELETE_TRIP_FAILED:
      return {
        ...state,
        deleteTripPending: false,
        deleteTripErrorMsg: action.payload
      }

    case REMOVE_TRIP_FROM_STATE:
      return {
        ...state,
        data: {
          upcomingTrips: state.data.upcomingTrips.filter((trip) => trip.id !== action.payload),
          pastTrips: state.data.pastTrips.filter((trip) => trip.id !== action.payload),
        }
      };

    case INIT_STATE:
      return initialState;

    default:
      return state;
  }
}

export default tripsReducer;