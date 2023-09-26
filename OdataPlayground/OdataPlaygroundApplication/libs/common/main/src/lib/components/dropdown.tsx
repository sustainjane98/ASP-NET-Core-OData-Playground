import React, { PropsWithChildren, useState } from 'react';
import { Button, ButtonColorVariant, ButtonProps } from './button';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { CommonElementPropsWithName } from '../types/common-elements-props.type';
import { twMerge } from 'tailwind-merge';

export interface Props extends PropsWithChildren, Omit<ButtonProps, 'name'> {
  values: ({ key: string; value: string } & CommonElementPropsWithName)[];
  handleChange?: (key: string, value: string) => void;
  placeholderValue?: string;
  selectedValue: string;
  className?: string;
}

export const Dropdown: React.FC<Props> = ({
  children,
  values,
  handleChange,
  placeholderValue,
  selectedValue,
  id,
  dataTestId,
  className,
  ...buttonProps
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      id={id}
      data-test-id={dataTestId}
      className={twMerge('relative inline-block', className)}
      onBlur={() => {
        window.setTimeout(() => setOpen(false), 200);
      }}
    >
      <Button
        {...buttonProps}
        id={`${id}-button`}
        name={`${id}-button`}
        dataTestId={`${dataTestId}-button`}
        variant={ButtonColorVariant.LIGHT}
        icons={[<ChevronDownIcon key={'chevron-down'} width={15} />]}
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
            'absolute top-full max-w-full bg-white divide-y divide-gray-100 rounded-lg shadow w-44'
          )}
        >
          <ul
            className={'py-2 text-sm text-gray-700 dark:text-gray-200'}
            aria-labelledby="dropdown-button"
          >
            {values.map(({ key, value, id, name, dataTestId }, i) => (
              <li key={`dropdown-element-${i}`}>
                <Button
                  id={id}
                  name={name}
                  dataTestId={dataTestId}
                  variant={ButtonColorVariant.TRANSPARENT}
                  onClick={() => {
                    handleChange?.(key, value);
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
