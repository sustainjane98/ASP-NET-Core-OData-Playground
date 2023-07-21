import React from 'react';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from 'react-hook-form';
import { ButtonColorVariant, NoData } from '@odata-playground/common';
import { DevTool } from '@hookform/devtools';
import { RequestAndResponseArea } from './request-and-response-area';

import {
  useRequestArea,
  useOdataMetadataScheme,
  useOdataScheme,
  useReponseArea,
  useRequestOdata,
  OdataRequestForm,
} from '@odata-playground/odata/common';
import { useBaseUrl, HttpMethod } from '@odata-playground/common';
import { OdataEndpointSectionPlaceholderContainer } from './odata-endpoint-section-placeholder-container';
import { OdataEndpointSections } from './odata-endpoint-sections';
import { useTranslation } from 'react-i18next';
import { mapOdataDebugSchemeToTextfieldFilter } from '@odata-playground/odata/common';
import { Textfield } from '@odata-playground/odata/common';

export interface Props {
  textfieldAutocomplete: any;
}

/**
 * An OdataFormWrapper React Component.
 * @author Jane Will
 * @version 0.1
 */
export const OdataPlayground: React.FC<Props> = ({ textfieldAutocomplete }) => {
  const { data, isLoading } = useOdataScheme();
  const { data: metadata } = useOdataMetadataScheme();
  const methods = useForm<OdataRequestForm>({
    defaultValues: {
      httpMethod: HttpMethod.GET,
      baseUrl: '',
      url: '',
      requestArea: '',
      responseArea: '',
    },
  });
  const onSubmit: SubmitHandler<OdataRequestForm> = (data) => console.log(data);
  const inputRef = React.createRef<HTMLInputElement>();
  const httpMethod = useWatch({ control: methods.control, name: 'httpMethod' });
  const {
    data: odataRequestResponseData,
    isSuccess,
    mutate,
  } = useRequestOdata();

  useReponseArea(methods, odataRequestResponseData, isSuccess);
  useBaseUrl(methods);
  useRequestArea(methods, metadata);

  const { t } = useTranslation(['index']);

  return (
    <form
      className="flex flex-col gap-y-2 flex-1 h-full"
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <FormProvider {...methods}>
        <Textfield
          ref={inputRef}
          id="odata-url-field"
          name="url"
          placeholder={t('please_insert_text')}
          autoComplete={[
            ...textfieldAutocomplete,
            ...mapOdataDebugSchemeToTextfieldFilter(data),
          ]}
          additionalAutocompleteFilters={({ httpMethod }) => {
            const httpMethodVal = methods.getValues('httpMethod');

            return (httpMethod ?? 'GET') === httpMethodVal.toUpperCase();
          }}
          buttonProps={[
            {
              children: 'Cancel',
              onClick: () => {
                const baseUrl = methods.getValues('baseUrl');
                methods.setValue('url', baseUrl);
              },
              variant: ButtonColorVariant.LIGHT,
            },
            {
              children: 'Send',
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
              name: 'httpMethod',
              handleChange: () => {
                const baseUrl = methods.getValues('baseUrl');
                methods.setValue('url', baseUrl);
              },
              values: [
                { key: HttpMethod.GET, value: 'GET' },
                { key: HttpMethod.POST, value: 'POST' },
                { key: HttpMethod.PUT, value: 'PUT' },
                { key: HttpMethod.PATCH, value: 'PATCH' },
                { key: HttpMethod.DELETE, value: 'DELETE' },
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
};
