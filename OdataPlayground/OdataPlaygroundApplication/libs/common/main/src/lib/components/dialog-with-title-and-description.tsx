import { DialogWrapper, DialogWrapperProps } from './dialog-wrapper';
import { Button, ButtonColorVariant, ButtonProps } from './button';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { DataTestids } from '../../../../../odata-playground-e2e/data-testids/src';

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
      <p>{description}</p>
      {buttons?.map((button) => (
        <Button {...button} />
      ))}
    </DialogWrapper>
  );
};
