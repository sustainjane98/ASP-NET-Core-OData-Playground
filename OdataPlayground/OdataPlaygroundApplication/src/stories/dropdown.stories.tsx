import { Story } from "@ladle/react";
import { Dropdown, Props } from "../components/common/dropdown";
import { FormProvider, useForm } from "react-hook-form";
import { StoryDefault } from "@ladle/react/typings-for-build/app/exports";

export const Default: Story = () => (
  <Dropdown
    name={"example"}
    values={[
      { key: "example1", value: "Example 1" },
      { key: "example2", value: "Example 2" },
      { key: "example3", value: "Example 3" },
      { key: "example4", value: "Example 4" },
    ]}
    defaultValue={"Test"}
  />
);

export default {
  decorators: [
    (Component) => {
      const methods = useForm({
        defaultValues: { example: "example1" },
      });
      return (
        <FormProvider {...methods}>
          <Component />
        </FormProvider>
      );
    },
  ],
} satisfies StoryDefault<Props>;
