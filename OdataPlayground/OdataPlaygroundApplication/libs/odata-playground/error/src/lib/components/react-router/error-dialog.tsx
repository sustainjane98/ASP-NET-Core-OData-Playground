import {
  DialogWithTitleAndDescription,
  DialogWithTitleAndDescriptionProps,
} from '@odata-playground/common';
import React from 'react';
import { useTranslation } from '@odata-playground/odata/i18n/config';
import { NamespacesEnum } from '@odata-playground/odata/i18n/config';
import { TranslationKeysOdataErrorEnum } from '@odata-playground/odata/i18n/config';
import { useRouteError } from 'react-router-dom';
import { DataTestids } from '@odata-playground/odata-e2e/data-testids';
import { DIALOG_SELECTOR } from '@odata-playground/odata/common';

export interface ErrorDialogProps {
  onClose: DialogWithTitleAndDescriptionProps['onClose'];
}

export const ErrorDialog: React.FC<ErrorDialogProps> = ({ onClose }) => {
  const { t } = useTranslation([NamespacesEnum.ODATA_ERROR]);

  const error = useRouteError();
  return (
    <DialogWithTitleAndDescription
      onClose={onClose}
      title={t(TranslationKeysOdataErrorEnum.ERROR)}
      description={String(error)}
      selector={DIALOG_SELECTOR}
      buttons={[
        {
          key: 'close-button',
          title: t(TranslationKeysOdataErrorEnum.CLOSE),
          onClick: onClose,
          dataTestId: DataTestids.ODATA_ERROR.CLOSE_BUTTON,
          id: 'close-button',
        },
      ]}
    />
  );
};
