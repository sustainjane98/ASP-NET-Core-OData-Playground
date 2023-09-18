import { useUpdateEffect } from 'usehooks-ts';
import { OdataRequestForm } from '../../types/odata-request-form.type';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { useJSONFormat } from '@odata-playground/common';
import {
  findEntityTypeInCollection,
  mapEntityTypeToJsonExample,
  mapSchemeToEntityTypes,
} from '@odata-playground/odata/common';
import { useCollectionName } from './use-collection-name.hook';
import { OdataMetadataScheme } from '@odata-playground/odata/common';
import { findModelnameForOdataCollectionname } from '@odata-playground/odata/common';
import { HttpMethod } from '@odata-playground/common/enums';
import { mapEntitySubtypes } from '@odata-playground/odata/common';

export const useRequestArea = (
  methods: UseFormReturn<OdataRequestForm, any, undefined>,
  metadata?: OdataMetadataScheme
) => {
  const httpMethod = useWatch({ control: methods.control, name: 'httpMethod' });

  const prettifyJSON = useJSONFormat();

  const collName = useCollectionName(methods.control);

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

      mapEntitySubtypes(entityType, entityTypes);

      methods.setValue(
        'requestArea',
        prettifyJSON(mapEntityTypeToJsonExample(entityType.Property))
      );
      return;
    }
    methods.setValue('requestArea', '');
  }, [httpMethod, methods, metadata, collName]);
};
