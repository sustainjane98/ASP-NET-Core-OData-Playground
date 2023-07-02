/* eslint-disable storybook/default-exports */
import type { Story, StoryDefault } from "@ladle/react";
import { Textfield, TextfieldProps } from "../components/common/textfield";
import { FormProvider, useForm } from "react-hook-form";
import { FilterVariants } from "../data/filter-variants";
import { FilterQueryOperators } from "../data/filter-query-operators";

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
