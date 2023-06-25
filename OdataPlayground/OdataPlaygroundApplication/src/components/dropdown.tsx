import React, { PropsWithChildren } from "react";
import { Button, ButtonProps } from "./button";
import { useFormContext, useWatch } from "react-hook-form";

export interface Props extends PropsWithChildren, ButtonProps {
  name: string;
  values: { key: string; value: string }[];
  defaultValue: string;
}

export const Dropdown: React.FC<Props> = ({
  children,
  values,
  defaultValue,
  ...buttonProps
}) => {
  const { setValue, control } = useFormContext();

  const selectedValue = useWatch({ control, name: buttonProps.name });

  return (
    <div>
      <Button {...buttonProps}>{selectedValue ?? defaultValue}</Button>
      <div
        id="dropdown"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdown-button"
        >
          {values.map((e) => (
            <li>
              <Button
                onClick={() => {
                  setValue(buttonProps.name, e.key);
                }}
                disableFocus
                disablePadding
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {e.value}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
