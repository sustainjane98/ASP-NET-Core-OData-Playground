import React from 'react';
import { DialogWrapperTitle } from '@odata-playground/common';

export interface EditEntityDialogProps {
  onClose: () => void;
}

export const EditEntityDialog: React.FC<EditEntityDialogProps> = ({
  onClose,
}) => {
  return (
    <DialogWrapperTitle
      title={'Test123!!'}
      onClose={onClose}
    ></DialogWrapperTitle>
  );
};
