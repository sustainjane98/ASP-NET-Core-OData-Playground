import { useUpdateEffect } from 'usehooks-ts';
import { OdataRequestForm } from '../../types/odata-request-form.type';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { HttpMethod, useJSONFormat } from '@odata-playground/common';
import {
  EntityType,
  findEntityTypeInCollection,
  mapEntityTypeToJsonExample,
  mapSchemeToEntityTypes,
} from '@odata-playground/odata/common';
import { useCollectionName } from './use-collection-name.hook';
import { OdataMetadataScheme } from '@odata-playground/odata/common';
import { findModelnameForOdataCollectionname } from '@odata-playground/odata/common';

export const useRequestArea = (
  methods: UseFormReturn<OdataRequestForm, any, undefined>,
  metadata?: OdataMetadataScheme
) => {
  const httpMethod = useWatch({ control: methods.control, name: 'httpMethod' });

  const prettifyJSON = useJSONFormat();

  const collName = useCollectionName(methods.control);

  useUpdateEffect(() => {
    if (metadata && httpMethod !== HttpMethod.GET && collName) {
      const entity = mapSchemeToEntityTypes(metadata) ?? [];

      let entityType = findEntityTypeInCollection(entity, collName);

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

      methods.setValue(
        'requestArea',
        prettifyJSON(mapEntityTypeToJsonExample(entityType as EntityType))
      );
      return;
    }
    methods.setValue('requestArea', '');
  }, [httpMethod, methods, metadata, collName]);
};
