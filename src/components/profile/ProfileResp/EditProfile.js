import React, { useState, useRef } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import './EditProfile.scss';
import { connect } from 'react-redux';
import actions from '../../../ducks/actions';
import defaultImg from '../../../assets/default.jpg';


function EditProfile({
  showModal,
  setShowModal,
  profileFormData,
  profileChange,
  profileUpdate,
  updateProfilePicture,
  profilePicture,
  profileUpdatePending
}) {

  const changeHandler = (e) => {
    profileChange({
      [e.target.name]: e.target.value
    });
  }

  const submitProfile = () => {
    profileUpdate();
  }

  const inputFileRef = useRef(null);

  const onFileChange = (e) => {
    console.log(e.target.files);

    updateProfilePicture(e.target.files[0]);

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
                <div className="d-flex flex-column align-items-center text-center p-3 py-3">
                  <img alt="" className="rounded-circle mt-md-5 edit-profile-image" src={profilePicture ? profilePicture : defaultImg} />

                  <button className="btn btn-primary image-upload-btn mt-4" type="button" onClick={handleBtnClick}>
                    <input
                      type="file"
                      ref={inputFileRef}
                      onChange={onFileChange}
                      className="d-none"
                    />
                    <i className="material-icons">camera</i>&nbsp;
                    <span>Change Photo</span>
                  </button>
                </div>
              </div>
              <div className="col-md-8 border-right">
                <div className="p-sm-3 py-3 py-sm-5">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Profile Settings</h4>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-6">
                      <label className="labels">Name</label>
                      <input type="text" className="form-control" placeholder="first name" name="firstName" value={profileFormData.firstName} onChange={changeHandler} />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">Last Name</label>
                      <input type="text" className="form-control" placeholder="lastname" name="lastName" value={profileFormData.lastName} onChange={changeHandler} />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <label className="labels">Email ID</label>
                      <input type="text" className="form-control" disabled="disabled" placeholder="enter email id" name="email" value={profileFormData.email} onChange={changeHandler} />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <label className="labels">Home City</label>
                      <input type="text" className="form-control" placeholder="home city" name="homeCity" value={profileFormData.homeCity} onChange={changeHandler} />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <label className="labels">Traveler Type</label>
                      <input type="text" className="form-control" placeholder="traveler type" name="travelerType" value={profileFormData.travelerType} onChange={changeHandler} />
                    </div>
                  </div>
                  <div className="mt-4 mt-sm-5 text-center">
                    <button className="btn btn-primary profile-button" type="button" onClick={submitProfile}>

                      <span className="pr-1">Save Profile</span>
                      {
                        profileUpdatePending ?
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          /> : ""
                      }
                    </button>
                    <div style={{ height: "10px" }} className="text-danger pt-3">{profileFormData.errorMsg}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    profileFormData: state.profile.profileFormData,
    profilePicture: state.profile.data.profilePicture,
    profileUpdatePending: state.profile.profileUpdatePending,
  }
}

export default connect(
  mapStateToProps,
  actions
)(EditProfile);
