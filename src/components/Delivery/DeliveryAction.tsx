type DeliveryActionProps = {
  label: string | JSX.Element;
  className: string;
  onClick: () => void;
};

export const DeliveryAction = ({
  label,
  className,
  onClick,
}: DeliveryActionProps) => {
  return (
    <button className={`py-2 px-4 rounded-lg ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};
