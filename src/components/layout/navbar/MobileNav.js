import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from '../../../ducks/actions';

function MobileNav({
  isAuth,
  logout,
}) {
  return (
    <div>
      <Navbar expand="md" className="d-md-none mobile-nav-bar">

        <Link to="/">Travel Voy</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/quiz">Quiz</Link>
            <Link className="nav-link" to="/video">Itinerary Builder</Link>
            {isAuth ?
              (<>
                <Link className="nav-link" to="/profile">Profile</Link>
                <Link className="nav-link" onClick={logout}>Logout</Link>
              </>)
              :
              <Link className="nav-link" to="/login">Login</Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth
  }
}

export default connect(mapStateToProps, actions)(MobileNav);
