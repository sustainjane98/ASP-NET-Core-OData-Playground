import axios from 'axios';
import { useQuery } from 'react-query';
import { useOdataPath } from '../../use-odata-path.hook';
import { OdataDebugScheme } from '@odata-playground/odata/common';

export const useOdataScheme = () => {
  const odataPath = useOdataPath();

  return useQuery('odata-scheme', async () => {
    return (
      await axios.get<OdataDebugScheme | null>(
        odataPath ? `${odataPath}/$odata` : '/$odata'
      )
    ).data;
  });
};
