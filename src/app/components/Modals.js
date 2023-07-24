import React from 'react';
import Modal from 'react-bootstrap/Modal';

const Modals = ({ handleClose, show, children }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        //aria-labelledby="contained-modal-title-vcenter"
        aria-labelledby="myLargeModalLabel"
        centered>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};

export default Modals;
