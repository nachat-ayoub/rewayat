import { Modal } from "flowbite-react";

const CustomModal = ({ children, title, show, onClose }) => {
  return (
    <Modal popup={true} show={show} onClose={onClose}>
      {title ? <Modal.Header>{title}</Modal.Header> : <Modal.Header />}
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default CustomModal;
