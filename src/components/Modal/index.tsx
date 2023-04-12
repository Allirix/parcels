import React, { useRef } from "react";
import ModalOverlay from "./ModalOverlay";
import ModalContent from "./ModalContent";

const Modal = ({ title, children, onClose, onPrevious, onNext }) => {
  return (
    <ModalOverlay onClose={onClose}>
      <ModalContent
        title={title}
        onClose={onClose}
        onPrevious={onPrevious}
        onNext={onNext}
      >
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
