import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import actions from '../../ducks/actions';

function Auth(props) {
  const { getAuth } = props;
  console.log(props);
  useEffect(() => {
    getAuth();
  }, [getAuth]);

  return (<></>);
}

export default connect(
  null,
  actions
)(Auth);