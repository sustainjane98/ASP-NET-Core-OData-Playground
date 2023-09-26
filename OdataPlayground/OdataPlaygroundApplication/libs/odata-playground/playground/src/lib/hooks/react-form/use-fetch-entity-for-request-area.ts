import { useUpdateEffect } from 'usehooks-ts';
import { OdataRequestForm } from '../../types/odata-request-form.type';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { useJSONFormat } from '@odata-playground/common';
import { useCollectionName } from './use-collection-name.hook';
import { HttpMethod } from '@odata-playground/common/enums';
import { useOdataJsonExampleValues } from '../react-query/use-odata-json-example-values.hook';

export const useFetchEntityForRequestArea = (
  methods: UseFormReturn<OdataRequestForm, any, undefined>
) => {
  const httpMethod = useWatch({ control: methods.control, name: 'httpMethod' });

  const prettifyJSON = useJSONFormat();

  const collName = useCollectionName(methods.control);

  const { data: odataJSONExampleValues, isFetched } =
    useOdataJsonExampleValues(collName);

  useUpdateEffect(() => {
    if (odataJSONExampleValues && httpMethod !== HttpMethod.GET && isFetched) {
      methods.setValue('requestArea', prettifyJSON(odataJSONExampleValues));
      return;
    }
    methods.setValue('requestArea', '');
  }, [httpMethod, methods, odataJSONExampleValues, isFetched]);
};
