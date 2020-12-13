import React, { useState, useEffect } from "react";

function TextCarousel() {
  const itemsList = [
    "Where are you going?",
    "What are you doing?",
    "Who are you with?",
    "Travel Voy",
  ];
  const [items, updateItems] = useState(itemsList);
  const [current, updateCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (current < 3) {
        updateCurrent(current + 1)
      } else if (current === 3) {
        updateCurrent(0);
      }
    }, 3000);
    return () => clearInterval(interval);
  })

  const plusOne = (num) => {
    console.log("c", current);
    console.log("l", items.length);
    if (current === items.length - 1) {
      return;
    } else {
      updateCurrent(current + num);
    }
  };

  const lessOne = (num) => {
    if (current === 0) {
      return;
    } else {
      updateCurrent(current + num);
    }
  };

  const dotsMap = () =>
    items.map((e, index) => {
      if (current === index) {
        return <i className="material-icons">flight_takeoff</i>;
      } else {
        return <i className="material-icons">flight_land</i>;
      }
    });

  return (
    <div className="text-carousel">
      <p className={ 'selected'}>{items[current]}</p>
      <div className="dots">
        {
          <i
            className={`material-icons ${current === 0 ? "hide" : null}`}
            onClick={() => lessOne(-1)}
          >
            keyboard_arrow_left
          </i>
        }
        {dotsMap()}
        {
          <i
            className={`material-icons ${
              current === items.length - 1 ? "hide" : null
            }`}
            onClick={() => plusOne(+1)}
          >
            keyboard_arrow_right
          </i>
        }
      </div>
    </div>
  );
}

export default TextCarousel;
