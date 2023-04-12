import { useRef, MouseEvent, ReactNode } from "react";

interface ModalOverlayProps {
  onClose: () => void;
  children: ReactNode;
}

const ModalOverlay = ({ onClose, children }: ModalOverlayProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (event: MouseEvent) => {
    if (event.target === modalRef.current) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-75 bg-black"
      onClick={handleOverlayClick}
      ref={modalRef}
    >
      {children}
    </div>
  );
};

export default ModalOverlay;
