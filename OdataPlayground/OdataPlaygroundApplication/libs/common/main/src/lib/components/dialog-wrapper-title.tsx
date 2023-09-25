import { DialogWrapper, DialogWrapperProps } from './dialog-wrapper';
import { Button, ButtonColorVariant } from './button';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { DataTestids } from '@odata-playground/odata-e2e/data-testids';
import React from 'react';

export interface DialogWrapperTitleProps extends DialogWrapperProps {
  title: string;
  onClose: () => void;
}

export const DialogWrapperTitle: React.FC<DialogWrapperTitleProps> = ({
  selector,
  title,
  onClose,
  children,
}) => {
  return (
    <DialogWrapper selector={selector} dialogClassName="pt-12">
      <Button
        id="dialog-title-close-button"
        dataTestId={DataTestids.COMMON.DIALOG_TITLE_CLOSE_BUTTON}
        onClick={onClose}
        variant={ButtonColorVariant.TRANSPARENT}
        disablePadding
        disableFocus
        className="absolute right-2 top-2"
      >
        <XMarkIcon width={30} />
      </Button>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900">
        {title}
      </h5>
      {children}
    </DialogWrapper>
  );
};
