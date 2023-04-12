import { BsArrowReturnLeft, BsCheck2 } from "react-icons/bs";
import { useToggleDeliveredAt } from "../../app/selectors/deliveries.selector";
import { FullDelivery } from "../../app/types";
import { DeliveryAction } from "../../components/Delivery/DeliveryAction";
import DeliveryDisplay from "../../components/Delivery/DeliveryDisplay";
import { useState, useRef } from "react";
import { LoadingWithTimer } from "../../components/Loading";

const ToggleDeliveryState = ({ delivery }: { delivery: FullDelivery }) => {
  const toggleDeliveredAt = useToggleDeliveredAt();

  const [isLoading, setIsLoading] = useState(false);

  const timeoutRef = useRef(null);

  const handleClick = () => {
    setIsLoading((state) => !state);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;

      return setIsLoading(false);
    }

    timeoutRef.current = setTimeout(() => {
      toggleDeliveredAt(delivery);
      setIsLoading(false);
      timeoutRef.current = null;
      clearTimeout(timeoutRef.current);
    }, 3000);
  };
  return (
    <DeliveryAction
      label={
        isLoading ? (
          <>
            Undo?
            <LoadingWithTimer />
          </>
        ) : delivery.deliveredAt ? (
          <BsArrowReturnLeft size={25} />
        ) : (
          <BsCheck2 size={25} />
        )
      }
      onClick={handleClick}
      className={
        delivery.deliveredAt
          ? "bg-red-500 text-white"
          : "bg-green-500 text-white"
      }
    />
  );
};

const Delivery = ({ delivery }: { delivery: FullDelivery }) => {
  return (
    <DeliveryDisplay delivery={delivery}>
      <ToggleDeliveryState delivery={delivery} />
    </DeliveryDisplay>
  );
};

export default Delivery;
