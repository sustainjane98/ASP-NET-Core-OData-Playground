import { FormProvider, useForm } from 'react-hook-form';

export default (defaultValues: Record<string, any> = {}) =>
  (Story: any) => {
    const methods = useForm({ defaultValues });

    return (
      <FormProvider {...methods}>
        <Story />
      </FormProvider>
    );
  };
