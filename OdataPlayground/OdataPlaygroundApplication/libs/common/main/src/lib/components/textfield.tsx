import React, { useState } from 'react';
import { useWatch } from 'react-hook-form';
import { mergeRefs } from 'react-merge-refs';
import { Button, ButtonColorVariant, ButtonProps } from './button';
import {
  TextfieldFilter,
  TextfieldFiltersWithCommon,
} from 'libs/odata-playground/common/src';
import { CommonElementProps } from '../types/common-elements-props.type';

export interface TextfieldProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    > &
      CommonElementProps,
    'autoComplete'
  > {
  label?: string;
  autoComplete?: TextfieldFiltersWithCommon;
  additionalAutocompleteFilters?: (value: TextfieldFilter) => boolean;
  buttonProps?: (ButtonProps & { direction?: 'right' | 'left' })[];
  dropdowns?: React.ReactElement[];
  name: string;
  handleChange?: (name: string, key: string) => void;
}

/**
 * A Textfield React Component.
 * @author Jane Will
 * @version 0.1
 */
export const Textfield = React.forwardRef<HTMLInputElement, TextfieldProps>(
  (
    {
      label,
      handleChange,
      buttonProps,
      dropdowns,
      additionalAutocompleteFilters,
      autoComplete,
      id,
      dataTestId,
      ...inputProps
    },
    ref
  ) => {
    const inputRef = React.createRef<HTMLInputElement>();

    const leftButtons = buttonProps?.filter((e) => e.direction === 'left');
    const rightButtons = buttonProps?.filter((e) => e.direction !== 'left');

    const currentValue = useWatch({ name: inputProps.name });

    const [inputSelected, setInputSelected] = useState<boolean>(false);

    const autoCompleteToDisplay =
      autoComplete?.filter?.(({ selector, httpMethod, ...other }) => {
        return (
          selector.test(currentValue) &&
          (additionalAutocompleteFilters?.({
            selector,
            httpMethod,
            ...other,
          }) ??
            true)
        );
      }) ?? [];

    let timeoutId: number | undefined;

    return (
      <div
        id={id}
        data-test-id={dataTestId}
        className="relative"
        onClick={() => {
          window.clearTimeout(timeoutId);
          timeoutId = undefined;
          setInputSelected(true);
        }}
        onBlur={() => {
          timeoutId = window.setTimeout(() => setInputSelected(false), 200);
        }}
      >
        {label && (
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {label}
          </label>
        )}
        <div className="relative z-10 p-2.5 flex gap-x-2 items-center bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-700 focus:border-cyan-700 w-full">
          <div className="flex gap-x-2">
            {dropdowns}
            {leftButtons &&
              leftButtons.map((b, index) => (
                <Button key={`button-${index}`} {...b} type="button">
                  {b.children ?? b.title}
                </Button>
              ))}
          </div>
          <input
            className="py-2.5 border-none focus:outline-none focus:ring-0 bg-gray-100 w-full h-full block"
            {...inputProps}
            onChange={({ target: { value } }) => {
              handleChange?.(inputProps.name, value);
            }}
            ref={mergeRefs([ref, inputRef])}
          ></input>
          <div className="flex gap-x-2">
            {rightButtons &&
              rightButtons.map((b, index) => (
                <Button
                  key={`button-${index}`}
                  {...b}
                  onClick={(ev) => {
                    ev.stopPropagation();
                    b?.onClick?.(ev);
                  }}
                  type="button"
                >
                  {b.children ?? b.title}
                </Button>
              ))}
          </div>
        </div>
        {autoCompleteToDisplay &&
          autoCompleteToDisplay.length > 0 &&
          inputSelected && (
            <ul className="absolute top-[calc(100%_-_2px)] p-2.5 flex flex-col gap-y-2.5 max-h-72 overflow-scroll w-full border-b border-l border-r border-gray-200 bg-gray-50 text-gray-900 text-sm rounded-b-lg">
              {autoCompleteToDisplay?.map(
                ({ key, value, dataTestId, id, name }, i) => (
                  <li
                    key={`autocomplete-${key}-${i}`}
                    className={'hover:text-cyan-800'}
                  >
                    <Button
                      dataTestId={dataTestId}
                      name={name}
                      id={id}
                      variant={ButtonColorVariant.TRANSPARENT}
                      className={'w-full p-0 focus:ring-0'}
                      onClick={() => {
                        window.clearTimeout(timeoutId);
                        timeoutId = undefined;

                        setInputSelected(true);
                        handleChange?.(inputProps.name, currentValue + key);
                        inputRef.current?.focus();
                      }}
                    >
                      {value ?? key}
                    </Button>
                  </li>
                )
              )}
            </ul>
          )}
      </div>
    );
  }
);

Textfield.displayName = 'Textfield';
