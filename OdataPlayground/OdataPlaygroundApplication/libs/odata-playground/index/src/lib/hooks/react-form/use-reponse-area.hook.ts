import { UseFormReturn } from 'react-hook-form';
import { useUpdateEffect } from 'usehooks-ts';
import { useJSONFormat } from '@odata-playground/common';
import { AxiosError, AxiosResponse } from 'axios';
export const useReponseArea = <
  M extends AxiosResponse = AxiosResponse,
  T extends UseFormReturn = UseFormReturn
>(
  methods: T,
  axiosResponseData: M,
  isSuccess: boolean,
  error: AxiosError
) => {
  const prettifyJSON = useJSONFormat();
  useUpdateEffect(() => {
    if (!error && !axiosResponseData) {
      return;
    }
    const errorStatusCode = error?.request?.status;
    const errorStatusMessage = error?.request?.statusText;

    methods.setValue(
      'responseArea',
      prettifyJSON({
        data: axiosResponseData?.data ?? '',
        status: {
          code: axiosResponseData?.status ?? errorStatusCode,
          message: axiosResponseData?.statusText ?? errorStatusMessage,
        },
        responseHeaders: axiosResponseData?.headers,
        requestHeaders: axiosResponseData?.request?.headers,
      })
    );
  }, [methods, axiosResponseData, isSuccess, error?.message, error?.status]);
};
