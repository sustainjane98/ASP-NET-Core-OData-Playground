import axios from 'axios';
import { useQuery } from 'react-query';
import { useOdataPath } from '../../use-odata-path.hook';
import { OdataDebugScheme } from '../../../types/odata-debug-scheme';
import { ReactQueryKeys } from '../../../enums/react-query-keys.enum';

export const useOdataScheme = () => {
  const odataPath = useOdataPath();

  return useQuery(ReactQueryKeys.ODATA_SCHEME, async () => {
    return (
      await axios.get<OdataDebugScheme | null>(
        odataPath ? `${odataPath}/$odata` : '/$odata'
      )
    ).data;
  });
};
