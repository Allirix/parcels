import React, { ReactNode } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

const ModalHeader = ({ title, onClose }: ModalHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-medium text-white">{title}</h2>
      <button className="text-gray-400 hover:text-gray-200" onClick={onClose}>
        <AiOutlineClose />
      </button>
    </div>
  );
};

interface ModalFooterProps {
  onPrevious?: () => void;
  onNext?: () => void;
}

const ModalFooter = ({ onPrevious, onNext }: ModalFooterProps) => {
  return (
    <div className="flex justify-between mt-6">
      {onPrevious && (
        <button
          className="flex-1 mr-2 py-3 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 focus:outline-none text-white font-medium rounded-lg shadow-md transition duration-300 ease-in-out"
          onClick={onPrevious}
        >
          Previous
        </button>
      )}
      {onNext && (
        <button
          className="flex-1 ml-2 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-none text-white font-medium rounded-lg shadow-md transition duration-300 ease-in-out"
          onClick={onNext}
        >
          Next
        </button>
      )}
    </div>
  );
};

interface ModalContentProps extends ModalHeaderProps, ModalFooterProps {
  children: ReactNode;
}

const ModalContent = ({
  title,
  children,
  onClose,
  onPrevious,
  onNext,
}: ModalContentProps) => {
  return (
    <div className="bg-gray-900 rounded-lg w-full max-w-md p-6 relative shadow-lg m-1">
      <ModalHeader title={title} onClose={onClose} />
      <div className="py-4 text-white">{children}</div>
      <ModalFooter onPrevious={onPrevious} onNext={onNext} />
    </div>
  );
};

export default ModalContent;
