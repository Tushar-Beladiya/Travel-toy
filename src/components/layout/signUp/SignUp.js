import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import './SignUp.scss';
import pic1 from '../../../assets/video/cost.png';
import pic2 from '../../../assets/video/notifications.png';
import { connect } from 'react-redux';
import actions from '../../../ducks/actions';

function SignUp({
  signupUser,
  isSignupPending,
  signupErrorMsg
}) {

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
    <Container fluid className="signup-container">
      <Row>
        <Col md={6} className="signup-box">
          <h5 className="display-4">Join The Club</h5>
          <Form className="sign-form">
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control type="name" placeholder="First Name" onChange={changeHandler} id="firstName" value={firstName} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="name" placeholder="Last Name" onChange={changeHandler} id="lastName" value={lastName} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={changeHandler} id="email" value={email} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={changeHandler} id="password" value={password} />
            </Form.Group>
            <Button variant="primary" style={{backgroundColor: '#ffd6ba', border: '3px solid white', color: 'grey'}} disabled={isSignupPending ? true : false} onClick={submitHandler}>
              <span className="pr-1">Sign Up</span>
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

            </Button>
            <div style={{ height: "10px" }} className="text-danger pt-3">{signupErrorMsg}</div>
          </Form>
        </Col>
        <Col md={6} className="info-box">
          <h5 className="display-4">Coming Soon</h5>
          <Row className="info-container">
            <Col md={{ span: 4, offset: 0 }} className="preview">
              <img src={pic1} alt="" />
              <h4>Cost Splitting</h4>
            </Col>
            <Col md={{ span: 4, offset: 0 }} className="preview">
              <img src={pic2} alt="" />
              <h4>Notifications</h4>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    // signupFormData: state.signup.signupFormData,
    isSignupPending: state.auth.isSignupPending,
    signupErrorMsg: state.auth.signupErrorMsg
  }
}

export default connect(
  mapStateToProps,
  actions
)(SignUp);
