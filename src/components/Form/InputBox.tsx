import { ChangeEventHandler } from "react";

export interface InputBoxProps {
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  title: string;
  placeholder: string;
  type?: string;
  autoFocus?: boolean;
  name?: string;
}

const InputBox = ({
  value,
  onChange,
  placeholder,
  title,
  type = "text",
  autoFocus = false,
  name,
}: InputBoxProps) => (
  <div className="mb-4">
    <label
      htmlFor={title}
      className="block text-gray-500 text-sm mb-2 uppercase"
    >
      {title}
    </label>
    <input
      id={title}
      type={type}
      className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white text-gray-800 font-semibold text-lg rounded-lg"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoFocus={autoFocus}
      name={name}
    />
  </div>
);

export default InputBox;
