import { useSuburbList } from "../../app/selectors/suburbs.selector";
import InputBox from "../../components/Form/InputBox";
import Items from "./Items";
import { LocationFormProps } from "./types";

export const SuburbForm = ({ formData, handleChange }: LocationFormProps) => {
  return (
    <form>
      <InputBox
        value={formData.suburb}
        onChange={(e) => handleChange("name", e.target.value)}
        placeholder="Enter suburb name..."
        autoFocus={true}
        name="name"
        title=""
      />
    </form>
  );
};

export const SuburbTable = () => {
  const suburbList = useSuburbList();
  return <Items items={suburbList as Record<string, string>[]} />;
};
