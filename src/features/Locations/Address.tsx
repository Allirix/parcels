import { useAddressList } from "../../app/selectors/addresses.selector";
import InputBox from "../../components/Form/InputBox";
import Items from "./Items";
import { LocationFormProps } from "./types";

export const AddressForm = ({ formData, handleChange }: LocationFormProps) => {
  return (
    <form>
      <InputBox
        value={formData.number}
        onChange={(e) => handleChange("number", e.target.value)}
        placeholder="e.g. 12, 15a, 1/45..."
        autoFocus={true}
        name="number"
        title="Number:"
      />
      <InputBox
        value={formData.locationId}
        onChange={(e) => handleChange("name", e.target.value)}
        placeholder="Enter location..."
        autoFocus={true}
        name="name"
        title="*Location:"
      />
    </form>
  );
};

export const AddressTable = () => {
  const addressList = useAddressList();
  return (
    <Items
      items={
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        addressList.map(({ position, ...address }) => address) as Record<
          string,
          string
        >[]
      }
      passedKeys={["number", "name", "type", "suburb"]}
    />
  );
};
