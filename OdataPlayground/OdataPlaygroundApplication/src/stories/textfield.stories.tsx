/* eslint-disable storybook/default-exports */
import type { Story, StoryDefault } from "@ladle/react";
import { Textfield, TextfieldProps } from "../components/textfield";
import { FormProvider, useForm } from "react-hook-form";

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
    autoComplete={[
      { selector: /\?filter=$/, key: "eq" },
      { selector: /\?$/, key: "filter=" },
    ]}
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
