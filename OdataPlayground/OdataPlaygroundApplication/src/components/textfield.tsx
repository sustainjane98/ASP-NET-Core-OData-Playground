import React, { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { mergeRefs } from "react-merge-refs";
import { Button, ButtonColorVariant, ButtonProps } from "./button";
import { Dropdown, Props as DropdownProps } from "./dropdown";
import {
  TextfieldFilter,
  TextfieldFilters,
} from "../types/textfield-filter.type";

export interface TextfieldProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "autoComplete"
  > {
  label?: string;
  autoComplete?: TextfieldFilters;
  additionalAutocompleteFilters?: (value: TextfieldFilter) => boolean;
  buttonProps?: (ButtonProps & { direction?: "right" | "left" })[];
  dropdownProps?: DropdownProps[];
  name: string;
}

/**
 * An Textfield React Component.
 * @author Jane Will
 * @version 0.1
 */
export const Textfield = React.forwardRef<HTMLInputElement, TextfieldProps>(
  (
    {
      label,
      buttonProps,
      dropdownProps,
      additionalAutocompleteFilters,
      autoComplete,
      ...inputProps
    },
    ref
  ) => {
    const { register, setValue } = useFormContext();
    const { ref: registerRef, ...other } = register(inputProps.name);

    const inputRef = React.createRef<HTMLInputElement>();

    const leftButtons = buttonProps?.filter((e) => e.direction === "left");
    const rightButtons = buttonProps?.filter((e) => e.direction !== "left");

    const currentValue = useWatch({ name: inputProps.name });

    const [inputSelected, setInputSelected] = useState<boolean>(false);

    const [autoCompleteToDisplay, setAutoCompleteToDisplay] =
      useState<typeof autoComplete>(autoComplete);

    useEffect(() => {
      setAutoCompleteToDisplay(
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
        }) ?? []
      );
    }, [additionalAutocompleteFilters, autoComplete, currentValue]);

    let id: number | undefined;

    return (
      <div
        className="relative"
        onClick={() => {
          window.clearTimeout(id);
          id = undefined;
          setInputSelected(true);
        }}
        onBlur={() => {
          id = window.setTimeout(() => setInputSelected(false), 200);
        }}
      >
        {label && (
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {label}
          </label>
        )}
        <div className="relative z-10 p-2.5 flex gap-x-2 items-center bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-700 focus:border-cyan-700 w-full">
          <div className="flex gap-x-2">
            {dropdownProps?.map((dp, i) => (
              <Dropdown key={`dropdown${i}`} {...dp} />
            ))}
            {leftButtons &&
              leftButtons.map((b, index) => (
                <Button key={`button-${index}`} {...b} type="button">
                  {b.children ?? b.title}
                </Button>
              ))}
          </div>
          <input
            className="py-2.5 border-none focus:outline-none focus:ring-0 bg-gray-100 w-full h-full block"
            {...other}
            {...inputProps}
            ref={mergeRefs([registerRef, ref, inputRef])}
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
              {autoCompleteToDisplay?.map(({ key, value }, i) => (
                <li
                  key={`autocomplete-${key}-${i}`}
                  className={"hover:text-cyan-800"}
                >
                  <Button
                    variant={ButtonColorVariant.TRANSPARENT}
                    className={"w-full p-0 focus:ring-0"}
                    onClick={() => {
                      window.clearTimeout(id);
                      id = undefined;

                      setInputSelected(true);
                      setValue(inputProps.name, currentValue + key, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      });
                      inputRef.current?.focus();
                    }}
                  >
                    {value ?? key}
                  </Button>
                </li>
              ))}
            </ul>
          )}
      </div>
    );
  }
);

Textfield.displayName = "Textfield";
