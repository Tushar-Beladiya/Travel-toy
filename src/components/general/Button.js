import React from "react";

function Button(props) {
  const { title, onClick, className } = props;
  return (
    <button className={className} onClick={onClick}>
      {title}
    </button>
  );
}

export default Button;
