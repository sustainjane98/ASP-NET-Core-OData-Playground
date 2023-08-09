import { useUpdateEffect } from 'usehooks-ts';
import { OdataRequestForm } from '@odata-playground/odata/index';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { HttpMethod, useJSONFormat } from '@odata-playground/common';
import {
  findEntityTypeInCollection,
  mapEntityTypeToJsonExample,
  mapSchemeToEntityTypes,
} from '@odata-playground/odata/common';
import { useCollectionName } from './use-collection-name.hook';
import { OdataMetadataScheme } from '../../../../../common/src/lib/types/odata-metadata-scheme.type';

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

      const entityType = findEntityTypeInCollection(entity, collName);

      if (!entityType) {
        methods.setValue('requestArea', '');
        return;
      }

      methods.setValue(
        'requestArea',
        prettifyJSON(mapEntityTypeToJsonExample(entityType))
      );
      return;
    }
    methods.setValue('requestArea', '');
  }, [httpMethod, methods, metadata, collName]);
};
