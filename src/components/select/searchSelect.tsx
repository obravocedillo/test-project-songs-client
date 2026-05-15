import { useState, useEffect, useRef } from "react";

interface ISearchSelectProps<T extends Record<string, any>> {
  queryTrigger: (args: { key: string; search: string }) => void;
  searchKey: string;
  labelKey: keyof T;
  onChange: (value: T) => void;
  placeholder?: string;
  data?: T[];
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const SearchSelect = <T extends Record<string, any>>({
  queryTrigger,
  searchKey,
  labelKey,
  onChange,
  placeholder = "Search...",
  data = [],
  isLoading = false,
  fullWidth = false,
}: ISearchSelectProps<T>) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (!value) {
      setIsOpen(false);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      queryTrigger({ key: searchKey, search: value });
      setIsOpen(true);
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleSelect = (item: T) => {
    setInputValue(String(item[labelKey]));
    setIsOpen(false);
    onChange(item);
  };

  return (
    <div className={`relative ${fullWidth ? "w-full" : ""}`}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-blue-500"
      />

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg max-h-60 overflow-auto">
          {isLoading && (
            <li className="px-3 py-2 text-sm text-gray-500">Loading...</li>
          )}
          {!isLoading && data.length === 0 && (
            <li className="px-3 py-2 text-sm text-gray-500">No results</li>
          )}
          {!isLoading &&
            data.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelect(item)}
                className="px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer"
              >
                {String(item[labelKey])}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
