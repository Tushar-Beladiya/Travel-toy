import React, { useRef, useState, useEffect } from 'react';
import { Container, Row, Col, Jumbotron, Image, Button } from 'react-bootstrap';
import './ProfileResp.scss';
import Info from '../../user/Info';
import defaultImg from '../../../assets/default.jpg';
import Map from '../../map/Map';
import beach from '../../../assets/beach.jpg';
import Upcoming from '../trips/Upcoming';
import Past from '../trips/Past';
import AddTrip from './AddTrip';
import EditProfile from './EditProfile';
import '../trips/Trips.scss'

import {
  Dropdown,
  Spinner,
} from 'react-bootstrap';

import { connect } from 'react-redux';
import actions from '../../../ducks/actions';


function ProfileResp({
  logout,
  profilePicture,
  backgroundPicture,
  updateBackgroundPicture,
  bgImgageLoading,
  getTrips,
}) {

  useEffect(() => {
    getTrips();
  }, []);

  const heroStyle = {
    backgroundImage: `url(${backgroundPicture ? backgroundPicture : beach})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: bgImgageLoading ? "0.5" : 1
  }

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <span style={{ 'cursor': 'pointer', width: '2rem', height: '2rem' }} className="material-icons">add_a_photo</span>
      {children}
    </a>
  ));

  const inputFileRef = useRef(null);

  const onFileChange = (e) => {
    console.log(e.target.files);

    updateBackgroundPicture(e.target.files[0]);
  }

  const handleBtnClick = () => {
    inputFileRef.current.click();
  }
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    <>
      <Container fluid className="profile-container">
        <Jumbotron fluid style={heroStyle} className="hero-image p-0 text-right pr-4 pt-2">
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle}>
            </Dropdown.Toggle>
            <Dropdown.Menu size="sm" title="">
              <input
                type="file"
                ref={inputFileRef}
                onChange={onFileChange}
                className="d-none"
              />
              <Dropdown.Item onClick={handleBtnClick}>Update Background Image</Dropdown.Item>
              <Dropdown.Item onClick={() => setShowUpdateModal(!showUpdateModal)}>Update Profile</Dropdown.Item>
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <EditProfile showModal={showUpdateModal} setShowModal={setShowUpdateModal} />

          <div className={bgImgageLoading ? "show-spinner" : "d-none"}>
            <Spinner animation="border" />
          </div>
        </Jumbotron>

        <Row className="border-bottom-prof">
          <Col xs={8} md={{ span: 5, offset: 1 }} className="profile-info">
            <Info />
          </Col>
          <Col xs={4} md={5} className="profile-pic">
            <Image src={profilePicture ? profilePicture : defaultImg} roundedCircle className="selfie" />
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 3, offset: 1 }} className="d-flex justify-content-center align-items-center">
            {/* <Button className="new-trip-btn" size="lg" variant="info" onClick={() => setShowModal(!showModal)}>
              <span>New Trip</span>
              <i className="material-icons pl-1" onClick={() => setShowModal(!showModal)}>add_circle_outline</i>
            </Button> */}
            <AddTrip showModal={showModal} setShowModal={setShowModal} />
          </Col>
        </Row>

        {/* TRIP */}
        <Upcoming newTrip={<i className="material-icons pl-1" onClick={() => setShowModal(!showModal)}>add_circle_outline</i>} />
        <Past />
            <Col md={{ span: 8, offset: 3 }} className="map-outside p-0">
              <Map />
            </Col>
      </Container>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    profilePicture: state.profile.data.profilePicture,
    backgroundPicture: state.profile.data.backgroundPicture,
    bgImgageLoading: state.profile.bgImgageLoading
  }
}

export default connect(
  mapStateToProps,
  actions
)(ProfileResp);
