import { useMutation } from 'react-query';
import { HttpMethod } from '@odata-playground/common';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { OdataScheme } from '@odata-playground/odata/common';

export const useRequestOdata = () =>
  useMutation<
    AxiosResponse<OdataScheme>,
    AxiosError,
    {
      httpMethod: HttpMethod;
      url: string;
      data?: object | string;
    },
    unknown
  >(async (val) => {
    return axios<OdataScheme>({
      method: val.httpMethod,
      url: val.url,
      data: val.data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
