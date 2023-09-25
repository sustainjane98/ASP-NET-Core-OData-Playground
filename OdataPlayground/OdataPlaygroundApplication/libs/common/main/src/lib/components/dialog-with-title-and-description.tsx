import { DialogWrapperProps } from './dialog-wrapper';
import { Button, ButtonProps } from './button';
import { DialogWrapperTitle } from './dialog-wrapper-title';
import * as React from 'react';

export interface DialogWithTitleAndDescriptionProps
  extends Omit<DialogWrapperProps, 'children'> {
  title: string;
  description: string;
  buttons?: ButtonProps[];
  onClose: () => void;
}

export const DialogWithTitleAndDescription: React.FC<
  DialogWithTitleAndDescriptionProps
> = ({ selector, title, description, buttons, onClose }) => {
  return (
    <DialogWrapperTitle
      selector={selector}
      dialogClassName="pt-12"
      title={title}
      onClose={onClose}
    >
      <p>{description}</p>
      {buttons?.map((button) => (
        <Button {...button} />
      ))}
    </DialogWrapperTitle>
  );
};
