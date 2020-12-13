import axios from 'axios';

import {
  PROFILE_CHANGE,
  PROFILE_UPDATED,
  PROFILE_FORM_RESET,
  GET_PROFILE_SUCCESS,
  PROFILE_UPDATE_PENDING,
  PROFILE_UPDATE_FAILED,
  PROFILE_PICTURE_UPDATED,
  BACKGROUND_PICTURE_UPDATED,
  BACKGROUND_PICTURE_UPDATE_PENDING
} from './types';

export const getProfile = (id) => {
  return async (dispatch) => {

    axios.get(`/api/profile/${id}`)
      .then(response => {
        console.log(response);
        dispatch({
          type: GET_PROFILE_SUCCESS,
          payload: response.data.data
        });
        // dispatch(profileFormReset());
        // dispatch(push('/profile'));
      })
      .catch(err => console.log(err));
    // toast(response.message, { type: 'success' });


  }
}

export const profileChange = (data) => {
  return async (dispatch) => {
    dispatch({
      type: PROFILE_CHANGE,
      payload: data
    })
  }
}

export const profileUpdate = () => {
  return async (dispatch, getState) => {

    const data = getState().profile.profileFormData;
    const userId = getState().profile.data.id;

    console.log(data);

    const {
      firstName,
      lastName,
      homeCity,
      travelerType
    } = data;

    dispatch({
      type: PROFILE_UPDATE_PENDING
    });

    axios.put('/api/profile', { id: userId, firstName, lastName, homeCity, travelerType })
      .then(response => {
        console.log(response);

        dispatch({
          type: PROFILE_UPDATED,
          payload: response.data.data
        });
        // dispatch(profileFormReset());
        // dispatch(push('/profile'));
      })
      .catch((err) => {
        dispatch({
          type: PROFILE_UPDATE_FAILED,
          payload: err.response.data.message || "Profile update failed"
        });
      });
    // toast(response.message, { type: 'success' });
  }
}

export const profileFormReset = () => {
  return async (dispatch) => {
    dispatch({
      type: PROFILE_FORM_RESET
    })
  }
}

export const updateProfilePicture = (file) => {
  return async (dispatch, getState) => {

    const userId = getState().profile.data.id;

    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('id', userId);

    const response = await axios.put('/api/profile/profile-picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    console.log('success', response);

    dispatch({
      type: PROFILE_PICTURE_UPDATED,
      payload: response.data.data
    });

  }
}

export const updateBackgroundPicture = (file) => {
  return async (dispatch, getState) => {

    const userId = getState().profile.data.id;

    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('id', userId);

    dispatch({
      type: BACKGROUND_PICTURE_UPDATE_PENDING,
    });

    const response = await axios.put('/api/profile/background-picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    console.log('success', response);

    dispatch({
      type: BACKGROUND_PICTURE_UPDATED,
      payload: response.data.data
    });

  }
}