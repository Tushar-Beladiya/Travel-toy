import axios from 'axios';
import { LOGOUT } from '../ducks/auth/types';

export default {
  setupInterceptors: (store) => {

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
      return response;
    }, function (error) {

      // dispatch logout action if server returns 403
      if (error.response.status === 403) {
        console.log(error.response);
        console.log("SESSION EXPIRED 403!");
        store.dispatch({ type: LOGOUT });
      }
      return Promise.reject(error);
    });
  }
};