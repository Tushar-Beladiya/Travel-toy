import React from "react";
import { connect } from 'react-redux';
import Trip from './Trip';
import actions from '../../../ducks/actions';
import { Row, Col, } from 'react-bootstrap';


function Upcoming({
  upcomingTrips,
  newTrip
}) {

  return (
    <div className="container-fluid">
      <Row className="trip-container">
        <Col md={7} className="trips-title mb-3">
          <h2 className="display-4">Upcoming Trips {newTrip}</h2>
        </Col>

        <Row className="justify-content-md-center">
          {
            upcomingTrips.map((trip, i) => {
              return (
                <Col sm={6} md={3} key={i} className="d-flex justify-content-center mb-4">
                  <Trip id={trip.id} image={trip.picture} location={trip.location} dateStart={trip.dateStart} dateEnd={trip.dateEnd} />
                </Col>
              );
            })
          }
        </Row>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    upcomingTrips: state.trips.data.upcomingTrips,
  }
}

export default connect(mapStateToProps, actions)(Upcoming);
