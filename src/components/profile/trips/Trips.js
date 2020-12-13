import React from "react";
import New from "./New";
import Upcoming from "./Upcoming";
import Past from "./Past";
import "./Trips.scss";

function Trips() {
  return (
    <div className="trips">
      <div className="white-underline" />
      <New />
      <Upcoming />
      <Past />
    </div>
  );
}

export default Trips;
