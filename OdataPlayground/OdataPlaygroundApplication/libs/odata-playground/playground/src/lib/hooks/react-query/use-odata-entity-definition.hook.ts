import {
  findEntityTypeInCollection,
  findModelnameForOdataCollectionname,
  mapEntitySubtypes,
  mapSchemeToEntityTypes,
  useOdataMetadataScheme,
} from '@odata-playground/odata';
import { useQuery } from 'react-query';
import { mapOdataEntityTypeToEntityDefinition } from '../../mappers/odata-entity-type-to-entity-definition.mapper';
import { ReactQueryKeys } from '../../enums/react-query-keys.emum';

export const useOdataEntityDefinition = (entityName: string) => {
  const { data: metadata } = useOdataMetadataScheme();

  return useQuery(
    ReactQueryKeys.ODATA_ENTITY_DEFINITION + entityName,
    async () => {
      if (!metadata) throw new Error('Metadata not resolved');
      const entityTypes = mapSchemeToEntityTypes(metadata) ?? [];
      let entityType = findEntityTypeInCollection(entityTypes, entityName);

      if (!entityType) {
        const resolvedEntityName = findModelnameForOdataCollectionname(
          entityName,
          metadata
        );

        if (resolvedEntityName) {
          const entity = mapSchemeToEntityTypes(metadata) ?? [];
          entityType = findEntityTypeInCollection(entity, resolvedEntityName);
        } else {
          return null;
        }

        if (!entityType) {
          return null;
        }
      }

      entityType = mapEntitySubtypes(entityType, entityTypes);

      return mapOdataEntityTypeToEntityDefinition(entityType);
    },
    { enabled: !!entityName, refetchOnWindowFocus: false, retry: false }
  );
};
