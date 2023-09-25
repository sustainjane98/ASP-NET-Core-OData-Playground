import { useUpdateEffect } from 'usehooks-ts';
import { OdataRequestForm } from '../../types/odata-request-form.type';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { useJSONFormat } from '@odata-playground/common';
import { useCollectionName } from './use-collection-name.hook';
import { HttpMethod } from '@odata-playground/common/enums';
import {
  findEntityTypeInCollection,
  findModelnameForOdataCollectionname,
  mapEntitySubtypes,
  mapSchemeToEntityTypes,
  useOdataMetadataScheme,
} from '@odata-playground/odata';
import { mapEntityTypeToJsonExample } from '../../mappers/entity-type-to-json-example.mapper';
import { mapOdataEntityTypeToEntityDefinition } from '../../mappers/odata-entity-type-to-entity-definition.mapper';
import { useOdataEntityDefinitions } from '../provider/use-odata-entity-definitions.hook';

export const useFetchEntityForRequestArea = (
  methods: UseFormReturn<OdataRequestForm, any, undefined>
) => {
  const { data: metadata } = useOdataMetadataScheme();

  const httpMethod = useWatch({ control: methods.control, name: 'httpMethod' });

  const prettifyJSON = useJSONFormat();

  const collName = useCollectionName(methods.control);

  const { both, isOverritten, setServer } = useOdataEntityDefinitions();

  useUpdateEffect(() => {
    if (metadata && httpMethod !== HttpMethod.GET && collName) {
      const entityTypes = mapSchemeToEntityTypes(metadata) ?? [];

      let entityType = findEntityTypeInCollection(entityTypes, collName);

      if (!entityType) {
        const resolvedEntityName = findModelnameForOdataCollectionname(
          collName,
          metadata
        );

        if (resolvedEntityName) {
          const entity = mapSchemeToEntityTypes(metadata) ?? [];
          entityType = findEntityTypeInCollection(entity, resolvedEntityName);
        } else {
          methods.setValue('requestArea', '');
          return;
        }
      }

      if (!entityType) {
        return;
      }

      entityType = mapEntitySubtypes(entityType, entityTypes);

      let odataEntityDefinitionsProviderContextDefinition =
        mapOdataEntityTypeToEntityDefinition(entityType);

      setServer(() => odataEntityDefinitionsProviderContextDefinition);

      if (isOverritten) {
        odataEntityDefinitionsProviderContextDefinition = both;
      }

      methods.setValue(
        'requestArea',
        prettifyJSON(
          mapEntityTypeToJsonExample(
            odataEntityDefinitionsProviderContextDefinition
          )
        )
      );
      return;
    }
    methods.setValue('requestArea', '');
  }, [httpMethod, methods, metadata, collName]);
};
