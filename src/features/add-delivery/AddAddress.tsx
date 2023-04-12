import { useEffect, useState } from "react";
import {
  useAddAddress,
  useAddressList,
} from "../../app/selectors/addresses.selector";
import { useLocationList } from "../../app/selectors/locations.selector";
import { Delivery, FullAddress } from "../../app/types";
import { getAddressId, getLocationId } from "../../app/utils";
import { filterAddressList } from "./utils";
import { BsChevronRight } from "react-icons/bs";
import { SelectBox } from "../../components/Form/InputOptions";

const AddressOptionItem = ({ option }: { option: FullAddress }) => (
  <>
    <div className="font-bold min-w-8 mr-4">{option.number}</div>
    <div className="flex-grow text-left">{option.name}</div>
    <div>
      <BsChevronRight />
    </div>
  </>
);

type AddAddressProps = {
  updateDelivery: (key: string, value: string) => void;
  delivery: Delivery;
  onNext: () => void;
};

const AddAddress = ({ updateDelivery, delivery, onNext }: AddAddressProps) => {
  const addAddress = useAddAddress();
  const [inputValue, setInputValue] = useState(delivery.addressId);
  const [options, setOptions] = useState<FullAddress[]>([]);
  const addresses = useAddressList();
  const locations = useLocationList();

  const handleInputChange = (event: any) => setInputValue(event.target.value);

  const handleOptionSelect = (value: FullAddress) => {
    const address = { number: value.number, locationId: getLocationId(value) };
    updateDelivery("addressId", getAddressId(address));
    onNext();
  };

  useEffect(() => {
    if (!inputValue) return setOptions([]);
    setOptions(filterAddressList(addresses, locations, inputValue));
  }, [inputValue, addresses, locations]);

  return (
    <SelectBox
      value={inputValue}
      onChange={handleInputChange}
      title=""
      placeholder="Enter address..."
      autoFocus={true}
      name="addressId"
      options={options}
      OptionItem={AddressOptionItem}
      handleOptionSelect={handleOptionSelect}
    />
  );
};

export default AddAddress;
