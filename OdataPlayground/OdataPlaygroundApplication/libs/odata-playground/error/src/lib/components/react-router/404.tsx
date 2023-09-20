import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import {
  BorderArea,
  Button,
  ButtonColorVariant,
} from '@odata-playground/common';
import { UndrawTakenReYn20 as AliensIllustration } from '../../assets/icons/vectors//generated';
import {
  NamespacesEnum,
  TranslationKeysOdataCommonEnum,
  useTranslation,
} from '@odata-playground/odata/i18n/config';
import { DataTestids } from '@odata-playground/odata-e2e/data-testids';
import { ErrorDialog } from './error-dialog';

export const SomethingWentWrong: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const { t } = useTranslation([NamespacesEnum.ODATA_COMMON]);
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <main className="flex-1 flex p-6 gap-x-4">
      <BorderArea>
        <div className="flex items-center w-full h-full">
          <div>
            <AliensIllustration width={400} height={400} />
          </div>
          <div className="flex justify-center items-center flex-1">
            <div className="format">
              <h1>{t(TranslationKeysOdataCommonEnum.UNKNOWN_ERROR)}</h1>
              <p>{t(TranslationKeysOdataCommonEnum.EXPLAINING_ERROR_TEXT)}</p>
              <div className={'flex gap-x-2'}>
                <Button
                  onClick={() =>
                    navigate({
                      pathname: location.pathname,
                      hash: location.hash,
                      search: location.search,
                    })
                  }
                  id="something-went-wrong-reload-button"
                  dataTestId={
                    DataTestids.ODATA_COMMON.SOMETHING_WENT_WRONG_RELOAD_BUTTON
                  }
                >
                  {t(TranslationKeysOdataCommonEnum.RELOAD)}
                </Button>
                <Button
                  variant={ButtonColorVariant.LIGHT}
                  onClick={() => setOpenDialog((prev) => !prev)}
                  id="something-went-wrong-reload-button"
                  dataTestId={
                    DataTestids.ODATA_COMMON
                      .SOMETHING_WENT_WRONG_SHOW_ERROR_BUTTON
                  }
                >
                  {t(TranslationKeysOdataCommonEnum.SHOW_ERROR)}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </BorderArea>
      {openDialog && <ErrorDialog onClose={() => setOpenDialog(false)} />}
    </main>
  );
};
