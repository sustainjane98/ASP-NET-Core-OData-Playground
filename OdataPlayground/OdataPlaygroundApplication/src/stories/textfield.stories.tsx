/* eslint-disable storybook/default-exports */
import type { Story, StoryDefault } from "@ladle/react";
import { Props, Textfield } from "../components/textfield";
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
      { key: /\?filter$/, value: "eq" },
      { key: /\?.*$/, value: "filter=" },
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
} satisfies StoryDefault<Props>;
