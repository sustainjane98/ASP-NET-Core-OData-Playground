import React, { useState } from 'react';
import {
  Dropdown as DropdownCommon,
  DropDownProps as DropDownPropsCommon,
} from '@odata-playground/common';
import { useFormContext, useWatch } from 'react-hook-form';

export type DropDownProps = Omit<DropDownPropsCommon, 'selectedValue'>;

export const Dropdown: React.FC<Omit<DropDownProps, 'selectedValue'>> = ({
  onChange,
  ...props
}) => {
  const { setValue } = useFormContext();

  const selectedValue = useWatch({ name: props.name });

  return (
    <DropdownCommon
      {...props}
      selectedValue={selectedValue}
      onChange={(name, key) => {
        onChange?.(name, key);
        setValue(name, key, { shouldDirty: true });
      }}
    />
  );
};
