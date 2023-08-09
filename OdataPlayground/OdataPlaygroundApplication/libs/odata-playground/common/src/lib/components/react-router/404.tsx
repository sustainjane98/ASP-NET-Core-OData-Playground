import { useLocation, useNavigate, useRouteError } from 'react-router-dom';
import React from 'react';
import { BorderArea, Button } from '@odata-playground/common';
import { ReactComponent as AliensIllustration } from '../../assets/undraw_taken_re_yn20.svg';
import { useTranslation } from '@odata-playground/odata/i18n/config';
import { NamespacesEnum } from '../../../../../i18n/config/src/lib/enums/translation-keys/namespaces.enum';
import { TranslationKeysOdataCommonEnum } from '../../../../../i18n/config/src/lib/enums/translation-keys/translation-keys-odata-common.enum';
import { DataTestids } from '@odata-playground/odata-e2e/data-testids';
export const SomethingWentWrong: React.FC = () => {
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
            </div>
          </div>
        </div>
      </BorderArea>
    </main>
  );
};
