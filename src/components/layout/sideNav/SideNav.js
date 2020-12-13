import React from 'react';
import './SideNav.scss';
import { Link } from "react-router-dom";

function SideNav() {
  return (
    <div className="side-nav d-none d-md-block">
      <div className="logo-container">
        <Link to="/quiz">
          <i className="material-icons">help_outline</i>
        </Link>
        <Link to="/video">
          <i className="material-icons">ondemand_video</i>
        </Link>
        <Link to="/profile">
          <i className="material-icons">face</i>
        </Link>
        <Link to="/" className="home">
          <i className="material-icons">home</i>
        </Link>
      </div>
    </div>
  );
}

export default SideNav;
