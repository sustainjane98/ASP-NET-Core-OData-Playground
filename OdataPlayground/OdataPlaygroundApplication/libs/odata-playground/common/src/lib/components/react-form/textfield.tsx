import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Textfield as TextfieldCommon,
  TextfieldProps as TextfieldPropsCommon,
} from '@odata-playground/common';
import { DropDownProps, Dropdown } from './dropdown';
import { mergeRefs } from 'react-merge-refs';

export interface TextfieldProps
  extends Omit<TextfieldPropsCommon, 'handleChange' | 'dropdowns'> {
  dropdownProps?: DropDownProps[];
}

/**
 * A Textfield React Component.
 * @author Jane Will
 * @version 0.1
 */
export const Textfield = React.forwardRef<HTMLInputElement, TextfieldProps>(
  ({ dropdownProps, ...props }, ref) => {
    const { register, setValue, getValues } = useFormContext();

    const { ref: registerRef, ...otherRegister } = register(props.name);

    return (
      <TextfieldCommon
        dropdowns={dropdownProps?.map((dp, i) => (
          <Dropdown
            key={`dropdown${i}`}
            {...dp}
            handleChange={(name, key) => {
              const oldValue = getValues(props.name);

              setValue(name, oldValue + key);
            }}
          />
        ))}
        {...props}
        {...otherRegister}
        ref={mergeRefs([ref, registerRef])}
        handleChange={(name, key) => {
          setValue(name, key, { shouldDirty: true });
        }}
      />
    );
  }
);

Textfield.displayName = 'Textfield';
