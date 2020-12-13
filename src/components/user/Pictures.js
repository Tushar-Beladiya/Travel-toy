import React from "react";
import Info from "./Info";

function Pictures() {
  const coverStyle = {
    width: "100%",
    height: "30vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };


  return (
    <div className="pictures">
      <img className="hero" style={coverStyle} alt="hero" />
      <Info />
    </div >
  );
}

export default Pictures;
