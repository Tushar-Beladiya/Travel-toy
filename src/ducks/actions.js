import { bindActionCreators } from 'redux';
import * as auth from './auth/actions';
import * as profile from './profile/actions';
import * as trips from './trips/actions';
import {
  push
} from 'connected-react-router';

export default function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      goTo: (path) => (dispatch) => {
        dispatch(push(path))
      },
      ...auth,
      ...profile,
      ...trips,
    },
    dispatch
  );
}
