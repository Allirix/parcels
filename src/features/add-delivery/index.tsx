import { useState } from "react";
import Modal from "../../components/Modal";
import AddAddress from "./AddAddress";
import AddNotes from "./AddNotes";
import AddParcels from "./AddParcels";
import { useAddDelivery } from "../../app/selectors/history.selectors";
import { Parcel } from "../../app/types";

const steps = [
  { title: "Delivery to?", component: AddAddress, id: "addressId" },
  { title: "Add Parcel(s)", component: AddParcels, id: "parcels" },
  { title: "Notes", component: AddNotes, id: "notes" },
];

const emptyDelivery = {
  addressId: "",
  parcels: [] as Parcel[],
  notes: "",
};

export default function AddDelivery({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [delivery, setDelivery] = useState(emptyDelivery);

  const addDelivery = useAddDelivery();

  const StepComponent = steps[step].component;

  const updateDelivery = (name: string, value: string | Parcel[]) => {
    setDelivery((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const onNext = () => {
    if (step === steps.length - 1) {
      addDelivery(delivery);
      onClose();
      setDelivery(emptyDelivery);
      setStep(0);
    } else {
      setStep(step + 1);
    }
  };

  const onPrevious = () => {
    if (step === 0) {
      onClose();
      setDelivery(emptyDelivery);
      setStep(0);
    } else {
      // avoids accidntaly rewriting of existing parcels when changing address
      step === 1 && updateDelivery("parcels", []);

      setStep(step - 1);
    }
  };

  return (
    <Modal
      onClose={onClose}
      title={steps[step].title}
      onNext={step === 0 ? null : onNext}
      onPrevious={step === 0 ? null : onPrevious}
    >
      <StepComponent
        delivery={delivery}
        updateDelivery={updateDelivery}
        onNext={onNext}
      />
    </Modal>
  );
}
