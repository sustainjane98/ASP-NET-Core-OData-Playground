import React from "react";

export interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  label?: string;
  placeholderOption?: string;
  options: { key: string; value: number | string }[];
}

/**
 * An Select React Component.
 * @author Jane Will
 * @version 0.1
 */
export const Select: React.FC<Props> = ({
  label,
  placeholderOption,
  options,
  ...selectProps
}) => {
  return (
    <div className="flex-1">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
      )}
      <select
        {...selectProps}
        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {placeholderOption && <option selected>{placeholderOption}</option>}

        {options.map(({ value, key }) => (
          <option value={key}>{value}</option>
        ))}
      </select>
    </div>
  );
};
