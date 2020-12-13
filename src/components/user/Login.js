import React, { useState } from "react";
// import axios from 'axios';
// import { Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Button, Spinner } from 'react-bootstrap';
// import Button from '../general/Button';
// import SideNav from '../layout/sideNav/SideNav';
// import Header from "../layout/header/Header";
// import Button from "../general/Button";
// import { Link } from "react-router-dom";
import SignUp from './SignUp';
import Overlay from '../general/Overlay';
import './Login.scss';
import { connect } from 'react-redux';
import actions from '../../ducks/actions';
import { Redirect } from 'react-router-dom';

function Login({
  isAuth,
  loginChange,
  loginUser,
  loginFormData,
  isLoginPending,
  loginErrorMsg
}) {

  //show sign up state
  const [signUp, setSignUp] = useState(false);
  const signUpHandler = () => {
    setSignUp(!signUp)
  }

  //login text handler
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const changeHandler = (e) => {
    loginChange({
      [e.target.name]: e.target.value
    });
  }

  const submitLogin = () => {

    loginUser();
  }

  if (isAuth) {
    return <Redirect to="/profile" />
  }

  return (
    <Container fluid className="login-container p-0">
      <Row className="top-row">
        <Col sm={6} className="hero-left" />
        <Col sm={6} className="login-right p-0">
          <div className="input-container">
            <h1 className="heading">Welcome Back</h1>
            <input type="text" className="input" placeholder="email" id="email" name="email" onChange={changeHandler} value={loginFormData.email} />
            <input type="password" className="input" placeholder="password" id="password" name="password" onChange={changeHandler} value={loginFormData.password} />
            <p className="forgot">Forgot Password?</p>
            <button className="mt-2 mx-2 log-button" variant="primary" disabled={isLoginPending ? true : false} onClick={submitLogin}>
              <span className="">Login</span>
              {
                isLoginPending ?
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  /> : ""
              }

            </button>
            <div style={{ height: "10px", marginTop: "2rem" }} className="text-danger pt-3">{loginErrorMsg}</div>
          </div>
        </Col>
      </Row>
      <Row className="bottom-row">
        <Col sm={6} className="login-left p-0">

          {signUp ?
            <>
              <Overlay onClick={signUpHandler} />
              <SignUp />
            </> :
            <div className="new-user m-0">
              <h4 className="display-4">New User?</h4>
              <button onClick={signUpHandler}>Sign up</button>
            </div>
          }
        </Col>
        <Col sm={6} className="hero-right" />
      </Row>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    loginFormData: state.auth.loginFormData,
    isLoginPending: state.auth.isLoginPending,
    loginErrorMsg: state.auth.loginFormData.errorMsg
  }
}

export default connect(
  mapStateToProps,
  actions
)(Login);
