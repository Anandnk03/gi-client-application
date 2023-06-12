import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalsAdd = ({ addclose, sees, children }) => {
  return (
    <>
      {/* <Modal
        shows={shows}
        onHide={setLgShow}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Large Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={setLgShow}>
            Close
          </Button>
          <Button variant="primary" onClick={setLgShow}>
            Update..
          </Button>
        </Modal.Footer>
      </Modal> */}
      <Modal sees={sees} onHide={addclose}>
        <Modal.Header closeButton>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={addclose}>
            Close
          </Button>
          <Button variant="primary" onClick={addclose}>
            Update..
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalsAdd;
