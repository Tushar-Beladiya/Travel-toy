import React from 'react';
import { connect } from 'react-redux';
// import actions from '../../actions';

import { Route, Redirect } from 'react-router';

function PrivateRoute({ isAuth, component: Component, ...rest }) {
  // console.log(props);
  return (

    <Route {...rest} render={(props) => isAuth ?
      (<Component {...props} />)
      : (<Redirect to="/login"></Redirect>)
    } />
  );
}


const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth
  }
}

export default connect(
  mapStateToProps,
  // actions
)(PrivateRoute);