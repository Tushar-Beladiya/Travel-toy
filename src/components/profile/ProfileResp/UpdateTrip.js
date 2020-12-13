import React, { useRef, useState, useEffect } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import actions from '../../../ducks/actions';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import defaultImg from '../../../assets/default.jpg';

function UpdateTrip({
  tripId,
  showModal,
  setShowModal,
  updateTripFormData,
  updateTripChange,
  updateTrip,
  picture,
  updateTripImgPreview,
  deleteTrip,
  updateTripPending,
  deleteTripPending,
  deleteTripErrorMsg
}) {

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);

  useEffect(() => {

    if (new Date(updateTripFormData.dateStart)) {
      setDateRange([{
        startDate: new Date(updateTripFormData.dateStart).getTime(),
        endDate: new Date(updateTripFormData.dateEnd).getTime(),
        key: 'selection'
      }])
    }

  }, [updateTripFormData]);


  // console.log(dateRange);

  const changeHandler = (e) => {
    updateTripChange({
      [e.target.name]: e.target.value
    });
  }

  const handleSubmitClick = () => {

    console.log(dateRange);
    updateTripFormData.dateStart = dateRange[0].startDate;
    updateTripFormData.dateEnd = dateRange[0].endDate;

    updateTrip();
  }

  const handleDeleteClick = () => {

    deleteTrip(tripId);
  }

  const inputFileRef = useRef(null);

  const onFileChange = (e) => {
    console.log(e.target.files);

    const imgUrl = URL.createObjectURL(e.target.files[0]);
    updateTripChange({ picture: e.target.files[0] });

    console.log(imgUrl);
    updateTripImgPreview(imgUrl);
  }

  const handleBtnClick = () => {
    inputFileRef.current.click();
  }

  return (
    <div>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        dialogClassName="modal-90w"
        aria-labelledby="modal-styling-title"
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <div className="container rounded bg-white mt-2 mb-2">
            <div className="row">
              <div className="col-md-4 border-right">
                <div className="d-flex flex-column align-items-center text-center px-sm-3 py-sm-3">
                  <img alt="" className="rounded-circle mt-md-5 edit-profile-image" src={updateTripFormData.picturePreviewUrl ? updateTripFormData.picturePreviewUrl : defaultImg} />
                  <button className="btn btn-primary image-upload-btn mt-4" type="button" onClick={handleBtnClick}>
                    <input
                      type="file"
                      ref={inputFileRef}
                      onChange={onFileChange}
                      className="d-none"
                    />
                    <i className="material-icons">camera</i>&nbsp;
                    <span>Update Picture</span>
                  </button>
                </div>
              </div>

              <div className="col-md-8 border-right pl-0 pl-sm-2">
                <div className="px-sm-3 py-sm-3">
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <label className="labels">Location *</label>
                      <input type="text" className="form-control" placeholder="Location" name="location" value={updateTripFormData.location} onChange={changeHandler} />
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-12">
                      <label className="labels d-block">Date Range *</label>

                      <DateRange
                        editableDateInputs={true}
                        onChange={item => setDateRange([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={dateRange}
                      />
                    </div>
                  </div>

                  <div className="my-3 text-left">
                    <div className="trip-btn-group">
                      <button className="btn-sm btn-danger profile-button" type="button" onClick={handleDeleteClick} style={{backgroundColor: "red !important"}}>
                        <span className="pr-1">Delete Trip</span>
                        {
                          deleteTripPending ?
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            /> : ""
                        }

                      </button>
                      <button className="btn-sm btn-primary profile-button" type="button" onClick={handleSubmitClick}>

                        <span className="pr-1">Update Trip</span>
                        {
                          updateTripPending ?
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            /> : ""
                        }
                      </button>
                    </div>
                    <div style={{ height: "10px" }} className="text-danger pt-3">{updateTripFormData.errorMsg || deleteTripErrorMsg}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    updateTripFormData: state.trips.updateTripFormData,
    picture: state.trips.data.picture,
    updateTripPending: state.trips.updateTripPending,
    deleteTripPending: state.trips.deleteTripPending,
    deleteTripErrorMsg: state.trips.deleteTripErrorMsg,
  }
}

export default connect(mapStateToProps, actions)(UpdateTrip);
