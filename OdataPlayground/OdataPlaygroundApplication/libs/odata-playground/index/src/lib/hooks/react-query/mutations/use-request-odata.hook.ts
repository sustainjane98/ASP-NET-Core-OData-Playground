import { useMutation } from 'react-query';
import { HttpMethod } from '@odata-playground/common';
import axios from 'axios';
import { OdataScheme } from '../../../types/odata-scheme.type';

export const useRequestOdata = () =>
  useMutation(
    async (val: { httpMethod: HttpMethod; url: string; data?: any }) => {
      return (
        await axios<OdataScheme>({
          method: val.httpMethod as string,
          url: val.url,
          data: val.data,
          headers: {
            'Content-Type': 'application/json',
          },
        })
      ).data;
    }
  );
