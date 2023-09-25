import React from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import {
  ButtonColorVariant,
  mapOdataDebugSchemeToTextFieldFilter,
  NoData,
  TextfieldFilters,
  TextfieldFiltersWithCommon,
} from '@odata-playground/common';
import { DevTool } from '@hookform/devtools';
import { RequestAndResponseArea } from './common/request-and-response-area';

import { useFetchEntityForRequestArea } from '../hooks/react-form/use-fetch-entity-for-request-area';
import { useFetchResponseInArea } from '../hooks/react-form/use-fetch-response-in-area';
import { useBaseUrl } from '@odata-playground/common';
import { OdataEndpointSectionPlaceholderContainer } from './common/odata-endpoint/odata-endpoint-section-placeholder-container';
import { OdataEndpointSections } from './common/odata-endpoint/odata-endpoint-sections';
import {
  TranslationKeysIndexEnum,
  useTranslation,
} from '@odata-playground/odata/i18n/config';
import { Textfield } from '@odata-playground/odata/common';
import { DataTestids } from '@odata-playground/odata-e2e/data-testids';
import { IndexRequestAndReponseFormData } from '../enums/index-request-and-reponse-form-data.enum';
import { OdataRequestForm } from '../types/odata-request-form.type';
import { HttpMethod } from '@odata-playground/common/enums';
import { useOdataScheme } from '@odata-playground/odata';
import { AxiosResponse } from 'axios';
import { OdataScheme } from '@odata-playground/odata';
import { odataPlaygroundEntityTypesWrapper } from './common/odata-playground-entity-types-wrapper';
export interface Props {
  textfieldAutocomplete: TextfieldFilters;
}

/**
 * An OdataFormWrapper React Component.
 * @author Jane Will
 * @version 0.1
 */
export const OdataPlayground: React.FC<Props> =
  odataPlaygroundEntityTypesWrapper(({ textfieldAutocomplete }) => {
    const { data, isLoading } = useOdataScheme();

    const methods = useForm<OdataRequestForm>({
      defaultValues: {
        [IndexRequestAndReponseFormData.HTTP_METHOD]: HttpMethod.GET,
        [IndexRequestAndReponseFormData.BASE_URL]: '',
        [IndexRequestAndReponseFormData.URL]: '',
        [IndexRequestAndReponseFormData.REQUEST_AREA]: '',
        [IndexRequestAndReponseFormData.RESPONSE_AREA]: '',
      },
    });

    const inputRef = React.createRef<HTMLInputElement>();
    const httpMethod = useWatch({
      control: methods.control,
      name: 'httpMethod',
    });
    const mutate = useFetchResponseInArea<
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      AxiosResponse<OdataScheme> | undefined,
      typeof methods
    >(methods);
    useBaseUrl(methods);
    useFetchEntityForRequestArea(methods);

    const { t } = useTranslation(['index']);

    return (
      <form className="flex flex-col gap-y-2 flex-1 h-full">
        <FormProvider {...methods}>
          <Textfield
            dataTestId={DataTestids.Index.URL_TEXTFIELD}
            ref={inputRef}
            id="odata-url-field"
            name={IndexRequestAndReponseFormData.URL}
            placeholder={t(TranslationKeysIndexEnum.PLEASE_INSERT_TEXT)}
            autoComplete={[
              ...textfieldAutocomplete,
              ...mapOdataDebugSchemeToTextFieldFilter(data),
            ].map(
              (tf) =>
                ({
                  ...tf,
                  id: `textfield-autocomplete-${tf.key}`,
                  name: `textfield-autocomplete-${tf.key}`,
                  dataTestId:
                    DataTestids.Index.URL_TEXTFIELD_AUTOCOMPLETE_OPTION(tf.key),
                } as TextfieldFiltersWithCommon[0])
            )}
            additionalAutocompleteFilters={({ httpMethod }) => {
              const httpMethodVal = methods.getValues('httpMethod');

              return (httpMethod ?? 'GET') === httpMethodVal.toUpperCase();
            }}
            buttonProps={[
              {
                dataTestId: DataTestids.Index.CANCEL_BUTTON,
                name: 'url-cancel-button',
                id: 'url-cancel-button',
                children: t(TranslationKeysIndexEnum.CANCEL),
                onClick: () => {
                  const baseUrl = methods.getValues('baseUrl');
                  methods.setValue('url', baseUrl);
                },
                variant: ButtonColorVariant.LIGHT,
              },
              {
                dataTestId: DataTestids.Index.SEND_BUTTON,
                name: 'url-send-button',
                id: 'url-send-button',
                children: t(TranslationKeysIndexEnum.SEND),
                onClick: () => {
                  const url = methods.getValues('url');
                  const requestArea =
                    httpMethod !== HttpMethod.GET
                      ? methods.getValues('requestArea')
                      : undefined;
                  mutate({ httpMethod: httpMethod, url, data: requestArea });
                },
              },
            ]}
            dropdownProps={[
              {
                id: 'httpMethod-dropdown',
                dataTestId: DataTestids.Index.DROPDOWN_HTTP_METHOD(),
                name: IndexRequestAndReponseFormData.HTTP_METHOD,
                handleChange: () => {
                  const baseUrl = methods.getValues('baseUrl');
                  methods.setValue('url', baseUrl);
                },
                values: [
                  {
                    key: HttpMethod.GET,
                    value: 'GET',
                    id: 'httpOption-get',
                    name: 'httpOption-get',
                    dataTestId: DataTestids.Index.DROPDOWN_HTTP_METHOD(
                      HttpMethod.GET
                    ),
                  },
                  {
                    key: HttpMethod.POST,
                    value: 'POST',
                    id: 'httpOption-post',
                    name: 'httpOption-post',
                    dataTestId: DataTestids.Index.DROPDOWN_HTTP_METHOD(
                      HttpMethod.POST
                    ),
                  },
                  {
                    key: HttpMethod.PUT,
                    value: 'PUT',
                    id: 'httpOption-put',
                    name: 'httpOption-put',
                    dataTestId: DataTestids.Index.DROPDOWN_HTTP_METHOD(
                      HttpMethod.PUT
                    ),
                  },
                  {
                    key: HttpMethod.PATCH,
                    value: 'PATCH',
                    id: 'httpOption-patch',
                    name: 'httpOption-patch',
                    dataTestId: DataTestids.Index.DROPDOWN_HTTP_METHOD(
                      HttpMethod.PATCH
                    ),
                  },
                  {
                    key: HttpMethod.DELETE,
                    value: 'DELETE',
                    id: 'httpOption-delete',
                    name: 'httpOption-delete',
                    dataTestId: DataTestids.Index.DROPDOWN_HTTP_METHOD(
                      HttpMethod.DELETE
                    ),
                  },
                ],
              },
            ]}
          />
          <RequestAndResponseArea />
          <div className="h-10" />
          {data === undefined ||
            data === null ||
            ((data?.length ?? 0) === 0 && <NoData />)}
          {isLoading ? (
            <OdataEndpointSectionPlaceholderContainer />
          ) : (
            <OdataEndpointSections />
          )}
        </FormProvider>
        <DevTool control={methods.control} placement="bottom-right" />
      </form>
    );
  });
