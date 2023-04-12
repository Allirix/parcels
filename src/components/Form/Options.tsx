type OptionsProps = {
  options: string[];
  activeOption: string;
  onSelect: (option: string) => void;
  title?: string;
};

export default function Options({
  options,
  activeOption,
  onSelect,
  title = "Title",
}: OptionsProps) {
  return (
    <div className="w-full">
      <label className="block text-gray-500 text-sm mb-2 uppercase">
        {title}
      </label>
      <div className="flex w-full rounded-lg overflow-hidden border border-gray-300">
        {options.map((option) => (
          <label key={option} className="flex-1">
            <input
              type="radio"
              value={option}
              checked={option === activeOption}
              onChange={() => onSelect(option)}
              className="sr-only"
            />
            <span
              className={`block min-w-12 px-4 py-3 font-bold text-center ${
                option === activeOption
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
