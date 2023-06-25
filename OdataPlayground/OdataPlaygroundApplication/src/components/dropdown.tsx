import React, { PropsWithChildren, useState } from "react";
import { Button, ButtonColorVariant, ButtonProps } from "./button";
import { useFormContext, useWatch } from "react-hook-form";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";

export interface Props extends PropsWithChildren, ButtonProps {
  name: string;
  values: { key: string; value: string }[];
  placeholderValue?: string;
}

export const Dropdown: React.FC<Props> = ({
  children,
  values,
  placeholderValue,
  ...buttonProps
}) => {
  const { setValue } = useFormContext();

  const selectedValue = useWatch({ name: buttonProps.name });

  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      className="relative inline-block"
      onBlur={() => {
        window.setTimeout(() => setOpen(false), 200);
      }}
    >
      <Button
        {...buttonProps}
        variant={ButtonColorVariant.LIGHT}
        icons={[<ChevronDownIcon key={"chevron-down"} width={15} />]}
        onClick={() => {
          setOpen((open) => !open);
        }}
      >
        {values.find(({ key }) => key === selectedValue)?.value ??
          placeholderValue}
      </Button>

      {open && (
        <div
          className={classNames(
            "absolute top-full max-w-full bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
          )}
        >
          <ul
            className={"py-2 text-sm text-gray-700 dark:text-gray-200"}
            aria-labelledby="dropdown-button"
          >
            {values.map(({ key, value }, i) => (
              <li key={`dropdown-element-${i}`}>
                <Button
                  variant={ButtonColorVariant.TRANSPARENT}
                  onClick={() => {
                    setValue(buttonProps.name, key, { shouldDirty: true });
                    setOpen(false);
                  }}
                  disableFocus
                  disablePadding
                  className="block px-4 py-2 hover:bg-gray-100 w-full 10"
                >
                  {value}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
