import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/voylogo.svg";

function Header() {
  return (
    <div className="header">
      <Link to="/" className="home">
        <img src={Logo} alt="logo" className="logo" />
      </Link>
      <div className="logo-nav">
        <i className="material-icons">question_answer</i>
        <i className="material-icons">calendar_today</i>
        <i className="material-icons">flight_takeoff</i>
        <Link to="/profile">
          <i className="material-icons">face</i>
        </Link>
        <i className="material-icons">card_travel</i>
      </div>
    </div>
  );
}

export default Header;
