import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Textfield as TextfieldCommon,
  TextfieldProps as TextfieldPropsCommon,
} from '@odata-playground/common';
import { DropDownProps, Dropdown } from './dropdown';

export interface TextfieldProps
  extends Omit<TextfieldPropsCommon, 'onChange' | 'dropdowns'> {
  dropdownProps?: DropDownProps[];
}

/**
 * A Textfield React Component.
 * @author Jane Will
 * @version 0.1
 */
export const Textfield = React.forwardRef<HTMLInputElement, TextfieldProps>(
  ({ dropdownProps, ...props }, ref) => {
    const { register, setValue } = useFormContext();

    return (
      <TextfieldCommon
        dropdowns={dropdownProps?.map((dp, i) => (
          <Dropdown key={`dropdown${i}`} {...dp} />
        ))}
        {...props}
        {...register(props.name)}
        onChange={(name, key) => {
          setValue(name, key, { shouldDirty: true });
        }}
      />
    );
  }
);

Textfield.displayName = 'Textfield';
