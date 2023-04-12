import { useEffect, useState } from "react";
import Options from "../../components/Form/Options";
import Parcel, {
  colorList as COLORS,
  typeList,
  sizeList,
} from "../../components/Parcel";
import {
  Delivery,
  Parcel as ParcelType,
  ParcelSize,
  FullDelivery,
} from "../../app/types";
import { useDelivery } from "../../app/selectors/deliveries.selector";
import InputBox from "../../components/Form/InputBox";

interface AddParcelProps {
  updateDelivery: (key: string, value: string | ParcelType[]) => void;
  delivery: Delivery;
}

const AddParcel = ({ updateDelivery, delivery }: AddParcelProps) => {
  const parcels = delivery.parcels || ([] as ParcelType[]);
  const existingDelivery =
    useDelivery(delivery.addressId) || ({} as FullDelivery);

  useEffect(() => {
    if (!parcels.length && existingDelivery.parcels) {
      updateDelivery("parcels", existingDelivery.parcels);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [parcelData, setParcelData] = useState<ParcelType>({
    count: 1,
    type: "BOX",
    size: "M",
  });

  const handleAddParcelWColor = (color: string) => {
    updateDelivery("parcels", [...parcels, { ...parcelData, color }]);
  };

  const handleRemoveParcel = (index: number) => {
    updateDelivery(
      "parcels",
      parcels.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="flex flex-col space-y-2">
      <Options
        options={typeList}
        activeOption={parcelData.type}
        onSelect={(v) => setParcelData({ ...parcelData, type: v })}
        title=""
      />
      <div className="flex space-x-2">
        <Options
          options={sizeList}
          activeOption={parcelData.size}
          onSelect={(v) =>
            setParcelData({ ...parcelData, size: v as ParcelSize })
          }
          title="How large?"
        />
        <InputBox
          value={parcelData.count}
          onChange={({ target }) =>
            setParcelData({ ...parcelData, count: Number(target.value) })
          }
          title="How many?"
          placeholder="Enter parcel count..."
          type="numeric"
          name="parcelCount"
        />
      </div>

      <div className="flex flex-wrap justify-between">
        {COLORS.map((color) => (
          <button
            key={color}
            className="mr-2 mb-2"
            style={{ backgroundColor: color }}
            onClick={() => handleAddParcelWColor(color)}
          >
            <Parcel {...parcelData} color={color} />
          </button>
        ))}
      </div>

      <label className="block text-gray-500 text-sm mb-2 uppercase">
        Parcels on this delivery
      </label>

      <div className="flex flex-wrap items-center gap-2 p-2 bg-slate-50">
        {parcels.map((parcel: ParcelType, index: number) => (
          <div
            className="flex space-x-2 items-center cursor-pointer"
            key={index}
            onClick={() => handleRemoveParcel(index)}
          >
            <Parcel {...parcel} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddParcel;
