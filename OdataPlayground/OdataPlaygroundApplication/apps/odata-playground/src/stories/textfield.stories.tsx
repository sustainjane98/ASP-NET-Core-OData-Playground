import type { Story, StoryDefault } from '@ladle/react';
import { Textfield, TextfieldProps } from '@odata-playground/odata/common';
import { FormProvider, useForm } from 'react-hook-form';
import {
  FilterQueryOperators,
  FilterVariants,
} from '@odata-playground/odata/config';

export const Default: Story = () => (
  <Textfield
    placeholder="Lorem ipsum..."
    label="Test"
    name="example"
  ></Textfield>
);

export const WithAutoComplete: Story = () => (
  <Textfield
    placeholder="Lorem ipsum..."
    label="Test"
    name="example"
    autoComplete={[...FilterVariants, ...FilterQueryOperators]}
  ></Textfield>
);

export default {
  decorators: [
    (Component) => {
      const methods = useForm();
      return (
        <FormProvider {...methods}>
          <Component />
        </FormProvider>
      );
    },
  ],
} satisfies StoryDefault<TextfieldProps>;
