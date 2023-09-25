import { useContext } from 'react';
import { OdataEntityDefinitionsProviderContext } from '../../components/provider/odata-entity-definitions.provider';

export const useOdataEntityDefinitions = () =>
  useContext(OdataEntityDefinitionsProviderContext);
