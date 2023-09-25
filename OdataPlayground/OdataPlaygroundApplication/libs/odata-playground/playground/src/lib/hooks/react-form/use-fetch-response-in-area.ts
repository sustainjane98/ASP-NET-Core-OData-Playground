import { UseFormReturn } from 'react-hook-form';
import { useUpdateEffect } from 'usehooks-ts';
import { useJSONFormat } from '@odata-playground/common';
import { AxiosError, AxiosResponse } from 'axios';
import { useRequestOdata } from '@odata-playground/odata';
export const useFetchResponseInArea = <
  M extends AxiosResponse = AxiosResponse,
  T extends UseFormReturn = UseFormReturn
>(
  methods: T
) => {
  const {
    error,
    data: odataRequestResponseData,
    isSuccess,
    mutate,
  } = useRequestOdata();

  const prettifyJSON = useJSONFormat();
  useUpdateEffect(() => {
    if (!error && !odataRequestResponseData) {
      return;
    }
    const errorStatusCode = error?.request?.status;
    const errorStatusMessage = error?.request?.statusText;

    methods.setValue(
      'responseArea',
      prettifyJSON({
        data: odataRequestResponseData?.data ?? error?.response?.data ?? '',
        status: {
          code: odataRequestResponseData?.status ?? errorStatusCode,
          message: odataRequestResponseData?.statusText ?? errorStatusMessage,
        },
        responseHeaders: odataRequestResponseData?.headers,
        requestHeaders: odataRequestResponseData?.request?.headers,
      })
    );
  }, [
    methods,
    odataRequestResponseData,
    isSuccess,
    error?.message,
    error?.status,
  ]);

  return mutate;
};
