import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import { DIALOG_SELECTOR } from '@odata-playground/odata/common';

export interface DialogWrapperProps extends PropsWithChildren {
  selector?: string;
  containerClassName?: string;
  dialogClassName?: string;
}

export const DialogWrapper: React.FC<DialogWrapperProps> = ({
  children,
  selector,
  dialogClassName,
  containerClassName,
}) => {
  return createPortal(
    <div
      className={twMerge(
        'w-screen h-screen flex justify-center items-center bg-black/50',
        containerClassName
      )}
    >
      <div
        className={twMerge(
          'format max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow relative',
          dialogClassName
        )}
      >
        {children}
      </div>
    </div>,
    document.querySelector(selector ?? DIALOG_SELECTOR) ?? document.body
  );
};
