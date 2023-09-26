import { useOdataEntityDefinition } from './use-odata-entity-definition.hook';
import { useQuery } from 'react-query';
import { ReactQueryKeys } from '../../enums/react-query-keys.emum';
import { mapEntityTypeToJsonExample } from '../../mappers/entity-type-to-json-example.mapper';

export const useOdataJsonExampleValues = (entityName: string) => {
  const { data: entityDefinition } = useOdataEntityDefinition(entityName);

  return useQuery(
    ReactQueryKeys.ODATA_JSON_EXAMPLE_VALUES + entityName,
    () => {
      if (!entityDefinition)
        throw new Error('Entity Definition is missing, please check');
      return mapEntityTypeToJsonExample(entityDefinition);
    },
    { enabled: !!entityDefinition && !!entityName }
  );
};
