import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
// import Button from '../general/Button';
import { Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './SignUp.scss';
import { connect } from 'react-redux';
import actions from '../../ducks/actions';

function SignUp(props) {

  const { signupUser, isSignupPending, signupErrorMsg } = props;

  //change text handler
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const changeHandler = (e) => {
    switch (e.target.id) {
      case 'firstName':
        setFirstname(e.target.value);
        break;
      case 'lastName':
        setLastName(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      default:
    }
  }

  const submitHandler = () => {
    signupUser({ firstName, lastName, email, password });
  }

  return (
    <div className="sign-up">
      <h2>Sign Up</h2>
      <input type="text" className="input" placeholder="first name" id="firstName" onChange={changeHandler} value={firstName} />
      <input type="text" className="input" placeholder="last name" id="lastName" onChange={changeHandler} value={lastName} />
      <input type="text" className="input" placeholder="email" id="email" onChange={changeHandler} value={email} />
      <input type="password" className="input" placeholder="password" id="password" onChange={changeHandler} value={password} />
      <button className="mt-2 px-2 sign-up-button" variant="primary" disabled={isSignupPending ? true : false} onClick={submitHandler}>
        <span className="">Signup</span>
        {
          isSignupPending ?
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            /> : ""
        }

      </button>
      <div style={{ height: "10px", marginTop: "2rem" }} className="text-danger pt-3">{signupErrorMsg}</div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isSignupPending: state.auth.isSignupPending,
    signupErrorMsg: state.auth.signupErrorMsg
  }
}

export default connect(
  mapStateToProps,
  actions
)(SignUp);
