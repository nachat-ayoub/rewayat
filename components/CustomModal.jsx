import { Modal } from "flowbite-react";

const CustomModal = ({ children, title, show, onClose, popup, size }) => {
  return (
    <Modal
      show={show}
      onClose={onClose}
      popup={popup ?? true}
      size={size ?? "2xl"}
    >
      {title ? (
        <Modal.Header className="text-center">
          <div className="text-base text-center w-full">{title}</div>
        </Modal.Header>
      ) : (
        <Modal.Header />
      )}
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default CustomModal;
