import { useQuery } from 'react-query';
import { useOdataPath } from '../../use-odata-path.hook';
import axios from 'axios';
import { OdataMetadataScheme } from '@odata-playground/odata/common';

export const useOdataMetadataScheme = () => {
  const odataPath = useOdataPath();
  return useQuery('odata-metadata-scheme', async () => {
    return (
      await axios.get<OdataMetadataScheme>(
        odataPath ? `${odataPath}/$metadata` : '/$metadata',
        {
          headers: {
            Accept: 'application/json',
          },
        }
      )
    ).data;
  });
};
