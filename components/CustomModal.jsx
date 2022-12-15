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
        <Modal.Header className="text-center dark:bg-gray-500">
          <div className="text-base text-center w-full">{title}</div>
        </Modal.Header>
      ) : (
        <Modal.Header className="dark:bg-gray-500" />
      )}
      <Modal.Body className="dark:bg-gray-500 rounded-b">{children}</Modal.Body>
    </Modal>
  );
};

export default CustomModal;
