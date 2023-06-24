/* eslint-disable storybook/default-exports */
import type { Story } from "@ladle/react";
import { TextField } from "../components/TextField";
import { FormProvider, useForm } from "react-hook-form";

export const Default: Story = () => (
  <TextField
    placeholder="Lorem ipsum..."
    label="Test"
    name="example"
  ></TextField>
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
