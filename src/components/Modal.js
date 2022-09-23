import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function LaunchModal({ body, title, show, handleClose, handleAction }) {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleAction}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LaunchModal;
