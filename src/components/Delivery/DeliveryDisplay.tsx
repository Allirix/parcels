import { FullDelivery } from "../../app/types";
import Parcel from "../Parcel";

const Address = ({ number, name }: FullDelivery) => (
  <div className="flex flex-col">
    <p
      className="text-xl font-bold font-mono text-gray-200"
      style={{ fontSize: "24px" }}
    >
      {number}
    </p>
    <p className="text-lg text-gray-400">{name}</p>
  </div>
);

const Notes = ({ notes }: FullDelivery) =>
  notes ? (
    <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
      <p className="text-gray-300">{notes}</p>
    </div>
  ) : null;

const Parcels = ({ parcels }: FullDelivery) => (
  <div className="flex gap-1">
    {parcels.map((parcel, key) => (
      <Parcel {...{ ...parcel }} key={key} />
    ))}
  </div>
);

const DeliveryDisplay = ({
  delivery,
  children,
}: {
  delivery: FullDelivery;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col border border-gray-700 rounded-lg p-4 bg-gray-800 ">
      <div className="flex justify-between items-center mb-4">
        <Address {...{ ...delivery }} />
        {children}
      </div>

      <div className="flex justify-between">
        <Notes {...{ ...delivery }} />
        <Parcels {...{ ...delivery }} />
      </div>
    </div>
  );
};

export default DeliveryDisplay;
