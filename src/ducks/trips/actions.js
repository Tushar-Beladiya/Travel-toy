import axios from 'axios';
import { push } from 'connected-react-router';

import {
  INIT_STATE,
  GET_TRIPS_SUCCESS,
  ADD_TRIP_CHANGE,
  ADD_TRIP_SUCCESS,
  ADD_TRIP_FORM_RESET,
  ADD_TRIP_FAILED,
  ADD_TRIP_IMG_PREVIEW,
  UPDATE_TRIP_CHANGE,
  UPDATE_TRIP_PENDING,
  UPDATE_TRIP_SUCCESS,
  UPDATE_TRIP_FAILED,
  UPDATE_TRIP_FORM_RESET,
  UPDATE_TRIP_IMG_PREVIEW,
  UPDATE_TRIP_FORM_INIT,
  DELETE_TRIP_PENDING,
  DELETE_TRIP_SUCCESS,
  DELETE_TRIP_FAILED,
  REMOVE_TRIP_FROM_STATE,
  ADD_TRIP_PENDING,
} from './types';

export const getTrips = () => {
  return async (dispatch) => {

    axios.get(`/api/trip`)
      .then(response => {
        console.log(response);

        const upcomingTrips = response.data.data.filter((trip) => new Date(trip.dateStart).getTime() > Date.now());

        const pastTrips = response.data.data.filter((trip) => new Date(trip.dateStart).getTime() < Date.now());

        dispatch({
          type: GET_TRIPS_SUCCESS,
          payload: {
            id: response.data.data.id,
            upcomingTrips,
            pastTrips
          }
        });
        // dispatch(profileFormReset());
        // dispatch(push('/profile'));
      })
      .catch(err => console.log(err));
    // toast(response.message, { type: 'success' });
  }
}

export const addTripChange = (data) => {
  return async (dispatch) => {
    dispatch({
      type: ADD_TRIP_CHANGE,
      payload: data
    })
  }
}

export const addTripImgPreview = (url) => {
  return async (dispatch) => {
    dispatch({
      type: ADD_TRIP_IMG_PREVIEW,
      payload: url
    });
  }
}

export const addNewTrip = () => {
  return async (dispatch, getState) => {

    const data = getState().trips.addTripFormData;
    console.log(data);

    const {
      location,
      picture,
      dateStart,
      dateEnd,
    } = data;

    if (!location) {
      return dispatch({
        type: ADD_TRIP_FAILED,
        payload: "Location is required"
      });
    }

    if (!dateStart || !dateEnd) {
      return dispatch({
        type: ADD_TRIP_FAILED,
        payload: "Must select valid date range"
      });
    }

    const formData = new FormData();
    formData.append('location', location);

    if (picture)
      formData.append('picture', picture, picture.name);

    formData.append('dateStart', dateStart.toISOString());
    formData.append('dateEnd', dateEnd.toISOString());

    dispatch({
      type: ADD_TRIP_PENDING,
    });

    axios.post('/api/trip', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log(response);

        dispatch({
          type: ADD_TRIP_SUCCESS,
          payload: response.data.data
        });
        dispatch(addTripFormReset());
        // dispatch(push('/profile'));
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: ADD_TRIP_FAILED,
          payload: err.response.data.message || "Add New Trip Failed"
        });
      });
  }
}

export const addTripFormReset = () => {
  return async (dispatch) => {
    dispatch({
      type: ADD_TRIP_FORM_RESET
    })
  }
}

export const updateTripChange = (data) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_TRIP_CHANGE,
      payload: data
    })
  }
}

export const updateTripImgPreview = (url) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_TRIP_IMG_PREVIEW,
      payload: url
    });
  }
}

export const updateTrip = () => {
  return async (dispatch, getState) => {

    const data = getState().trips.updateTripFormData;

    console.log(data);

    const {
      id,
      location,
      picture,
      dateStart,
      dateEnd,
    } = data;

    if (!location) {
      return dispatch({
        type: UPDATE_TRIP_FAILED,
        payload: "Location is required"
      });
    }

    if (!dateStart || !dateEnd) {
      return dispatch({
        type: UPDATE_TRIP_FAILED,
        payload: "Must select valid date range"
      });
    }

    const formData = new FormData();
    formData.append('location', location);

    if (picture && picture.name) {
      formData.append('picture', picture, picture.name);
    }

    formData.append('dateStart', new Date(dateStart).toISOString());
    formData.append('dateEnd', new Date(dateEnd).toISOString());
    formData.append('tripId', id);

    dispatch({
      type: UPDATE_TRIP_PENDING,
    });

    // update trip
    axios.put('/api/trip', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log(response);
        dispatch(removeTripFromState(response.data.data.id));

        dispatch({
          type: UPDATE_TRIP_SUCCESS,
          payload: response.data.data
        });

        dispatch(addTripFormReset());
        // dispatch(push('/profile'));
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: UPDATE_TRIP_FAILED,
          payload: err.response.data.message || "Update Trip Failed"
        });
      });
    // toast(response.message, { type: 'success' });
  }
}

export const updateTripFormReset = () => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_TRIP_FORM_RESET
    });
  }
}

export const tripDetailsClickHandler = (tripId) => {
  return async (dispatch, getState) => {

    const data = getState().trips.data;

    let trip;

    data.pastTrips.forEach((el) => {
      if (el.id === tripId) {
        trip = el;
      }
    });

    data.upcomingTrips.forEach((el) => {
      if (el.id === tripId) {
        trip = el;
      }
    });

    console.log(trip);

    dispatch({
      type: UPDATE_TRIP_FORM_INIT,
      payload: trip
    });
  }
}

export const deleteTrip = (tripId) => {
  return async (dispatch) => {

    if (!tripId) {
      return dispatch({
        type: DELETE_TRIP_FAILED,
        payload: "delete trip failed"
      });
    }

    dispatch({
      type: DELETE_TRIP_PENDING,
    });

    axios.delete(`/api/trip/${tripId}`)
      .then(response => {
        console.log(response);
        dispatch(removeTripFromState(tripId));
        dispatch({
          type: DELETE_TRIP_SUCCESS,
          // payload: response.data.data
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: DELETE_TRIP_FAILED,
          payload: err.response.data.message
        });
        // toast(response.message, { type: 'success' });
      })
  }
}

export const removeTripFromState = (tripId) => {
  return async (dispatch) => {
    dispatch({
      type: REMOVE_TRIP_FROM_STATE,
      payload: tripId
    });
  }
}


export const initTripState = () => {
  return async (dispatch) => {
    dispatch({
      type: INIT_STATE
    });
  }
}