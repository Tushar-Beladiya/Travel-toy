import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import { format } from "date-fns";
import UpdateTrip from "../ProfileResp/UpdateTrip";
import actions from '../../../ducks/actions';
import { connect } from "react-redux";

function Trip({
  id,
  image,
  location,
  dateStart,
  dateEnd,
  tripDetailsClickHandler
}) {

  const [showModal, setShowModal] = useState(false);

  const dateFormat = (d) => {
    const date = new Date(d);
    const formattedDate = format(date, "MMM do, yy ");
    return formattedDate;
  };

  const clickHandler = () => {

    tripDetailsClickHandler(id);

    setShowModal(!showModal);
  }

  return (
    <>
      <div className="trip-image-container" onClick={clickHandler}>
        { /* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
        <Image src={image} className="trip-image" />
        <div className="w-100">
          <p className="trip-text">{location}</p>
        </div>
        <div className="w-100">
          <p className="trip-date">{dateFormat(dateStart)} to {dateFormat(dateEnd)}</p>
        </div>
      </div>
      <UpdateTrip tripId={id} showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}

export default connect(null, actions)(Trip);