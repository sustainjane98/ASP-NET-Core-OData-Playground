import React from 'react';
import {
  Dropdown as DropdownCommon,
  DropDownProps as DropDownPropsCommon,
} from '@odata-playground/common';
import { useFormContext, useWatch } from 'react-hook-form';
import { CommonElementPropsWithName } from '@odata-playground/common';

export type DropDownProps = Omit<DropDownPropsCommon, 'selectedValue'> &
  CommonElementPropsWithName;

export const Dropdown: React.FC<Omit<DropDownProps, 'selectedValue'>> = ({
  handleChange,
  ...props
}) => {
  const { setValue } = useFormContext();

  const selectedValue = useWatch({ name: props.name });

  return (
    <DropdownCommon
      {...props}
      selectedValue={selectedValue}
      handleChange={(key) => {
        handleChange?.(props.name, key);
        setValue(props.name, key, { shouldDirty: true });
      }}
    />
  );
};
