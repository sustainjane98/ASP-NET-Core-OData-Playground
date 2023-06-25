/* eslint-disable storybook/default-exports */
import type { Story } from "@ladle/react";
import { Textfield } from "../components/textfield";
import { FormProvider, useForm } from "react-hook-form";

export const Default: Story = () => (
  <Textfield
    placeholder="Lorem ipsum..."
    label="Test"
    name="example"
  ></Textfield>
);

Default.decorators = [
  (Component) => {
    const methods = useForm();

    return (
      <FormProvider {...methods}>
        <Component />
      </FormProvider>
    );
  },
];
