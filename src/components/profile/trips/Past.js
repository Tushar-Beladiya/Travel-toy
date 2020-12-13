import React from "react";
import { connect } from 'react-redux';

import Trip from './Trip';
import { Row, Col, } from 'react-bootstrap';
import actions from '../../../ducks/actions';

function Past({
  pastTrips
}) {
  return (
    <div className="container-fluid">
      <Row className="trip-container">
        <Col md={6} className="trips-title mb-3">
          <h2 className="display-4">Past Trips</h2>
        </Col>
        <Row className="justify-content-md-center">
          {
            pastTrips.map((trip, i) => {
              return (
                <Col key={i} sm={6} md={3} className="d-flex justify-content-center mb-4">
                  <Trip id={trip.id} image={trip.picture} location={trip.location} dateStart={trip.dateStart} dateEnd={trip.dateEnd} />
                </Col>
              );
            })
          }
        </Row>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    pastTrips: state.trips.data.pastTrips,
  }
}

export default connect(mapStateToProps, actions)(Past);
