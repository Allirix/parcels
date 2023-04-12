import InputBox, { InputBoxProps } from "./InputBox";

type UnknownOption = any;

interface InputOptionProps {
  options: UnknownOption[];
  OptionItem: ({ option }: { option: UnknownOption }) => JSX.Element;
  handleOptionSelect: (option: UnknownOption) => void;
}

const InputOptions = ({
  options,
  OptionItem,
  handleOptionSelect,
}: InputOptionProps) => {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden mt-2">
      {/* Display all the options */}
      {options.map((option, id) => (
        <div
          className="flex text-black items-center px-4 py-2 border-b-2 border-gray-200 hover:bg-gray-50 cursor-pointer"
          onClick={() => handleOptionSelect(option)}
          key={id}
        >
          <OptionItem option={option} />
        </div>
      ))}
    </div>
  );
};

export default InputOptions;

export const SelectBox = ({
  value,
  onChange,
  placeholder = "Enter value...",
  title = "",
  name,
  autoFocus = true,
  options,
  handleOptionSelect,
  OptionItem,
}: InputOptionProps & InputBoxProps) => {
  return (
    <div>
      <InputBox
        value={value}
        onChange={onChange}
        title={title}
        placeholder={placeholder}
        autoFocus={autoFocus}
        name={name}
      />
      <InputOptions
        options={options}
        handleOptionSelect={handleOptionSelect}
        OptionItem={OptionItem}
      />
    </div>
  );
};
