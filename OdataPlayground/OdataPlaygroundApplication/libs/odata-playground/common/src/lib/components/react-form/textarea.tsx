import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Textarea as TextareaCommon,
  TextareaProps,
} from '@odata-playground/common';

export const Textarea: React.FC<TextareaProps> = ({ ...areaProps }) => {
  const { register } = useFormContext();

  return <TextareaCommon {...areaProps} {...register(areaProps.name)} />;
};
