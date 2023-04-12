import { useLocationList } from "../../app/selectors/locations.selector";
import InputBox from "../../components/Form/InputBox";
import Items from "./Items";
import { LocationFormProps } from "./types";

export const LocationForm = ({ formData, handleChange }: LocationFormProps) => {
  return (
    <form>
      <InputBox
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        placeholder="Enter location name..."
        autoFocus={true}
        name="name"
        title="*Name:"
      />

      <InputBox
        value={formData.type}
        onChange={(e) => handleChange("type", e.target.value)}
        placeholder="(optional) e.g. st, av, rd..."
        autoFocus={true}
        name="type"
        title="Type:"
      />
      <InputBox
        value={formData.suburb}
        onChange={(e) => handleChange("suburb", e.target.value)}
        placeholder="Enter suburb name..."
        autoFocus={true}
        name="suburb"
        title="*Suburb:"
      />
    </form>
  );
};

export const LocationTable = () => {
  const locationList = useLocationList();
  return <Items items={locationList as Record<string, string>[]} />;
};
