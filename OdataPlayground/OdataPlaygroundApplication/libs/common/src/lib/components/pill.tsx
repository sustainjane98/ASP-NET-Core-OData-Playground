import React from 'react';
import { Button, ButtonProps } from './button';
import { twMerge } from 'tailwind-merge';

export interface Props extends ButtonProps {
  displayValue: string;
  onClick?: () => void;
}

/**
 * An Pill React Component.
 * @author Jane Will
 * @version 0.1
 */
export const Pill: React.FC<Props> = ({ displayValue, ...props }) => {
  return (
    <Button {...props} className={twMerge('rounded-full', props.className)}>
      <span>{displayValue}</span>
    </Button>
  );
};
