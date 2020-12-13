import React from "react";

function Navigation(props) {
  const { current, total, navigate } = props;
  return (
    <div className="nav">
      <p onClick={() => navigate(-1)}>{"<"}</p>
      <p>{current}</p>
      <p> /</p>
      <p> {total}</p>
      <p onClick={() => navigate(1)}>{">"}</p>
    </div>
  );
}

export default Navigation;
