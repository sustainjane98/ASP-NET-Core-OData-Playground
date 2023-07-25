import { FieldValues, UseFormReturn } from 'react-hook-form';
import { useUpdateEffect } from 'usehooks-ts';
import { useJSONFormat } from '@odata-playground/common';

export const useReponseArea = <M, T extends FieldValues = FieldValues>(
  methods: UseFormReturn<T>,
  data: M,
  isSuccess: boolean
) => {
  const prettifyJSON = useJSONFormat();
  useUpdateEffect(() => {
    if (data && isSuccess) {
      methods.setValue('responseArea' as any, prettifyJSON(data) as any);
    } else {
      methods.setValue('responseArea' as any, 'Something went wrong' as any);
    }
  }, [methods, data, isSuccess]);
};
