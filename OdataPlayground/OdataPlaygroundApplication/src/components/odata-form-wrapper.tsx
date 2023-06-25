import React, { PropsWithChildren, useEffect } from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import { Textfield } from "./textfield";
import { Pill } from "./pill";
import { ButtonColorVariant } from "./button";
import { DevTool } from "@hookform/devtools";

export interface OdataRequestForm {
  baseUrl: string;
  url: string;
  select: string[];
  where: string[];
  expand: string[];
  filter: string[];
  orderby: string[];
  stop: string[];
  skip: string[];
  count: string[];
  httpMethod: string;
}

/**
 * An OdataFormWrapper React Component.
 * @author Jane Will
 * @version 0.1
 */
export const OdataFormWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const methods = useForm<OdataRequestForm>({
    defaultValues: {
      httpMethod: "get",
    },
  });
  const onSubmit: SubmitHandler<OdataRequestForm> = (data) => console.log(data);

  const inputRef = React.createRef<HTMLInputElement>();

  const httpMethod = useWatch({ control: methods.control, name: "httpMethod" });

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    methods.setValue("baseUrl", `${location.origin}`, { shouldDirty: true });
    // eslint-disable-next-line no-restricted-globals
    methods.setValue("url", `${location.origin}`, { shouldDirty: true });
  }, [methods]);

  const onPillClicked = () => {
    inputRef.current?.focus();
  };

  return (
    <form
      className="flex flex-col gap-y-2 flex-1 h-full"
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <FormProvider {...methods}>
        <Textfield
          ref={inputRef}
          id="odata-url-field"
          name="url"
          placeholder="Bite Url eingeben..."
          buttonProps={[
            {
              children: "Cancel",
              onClick: () => {
                const baseUrl = methods.getValues("baseUrl");
                methods.setValue("url", baseUrl);
              },
              variant: ButtonColorVariant.LIGHT,
            },
            { children: "Send", onClick: () => {} },
          ]}
          dropdownProps={[
            {
              name: "httpMethod",
              values: [
                { key: "get", value: "GET" },
                { key: "post", value: "POST" },
                { key: "patch", value: "PATCH" },
                { key: "delete", value: "DELETE" },
              ],
              defaultValue: "GET",
            },
          ]}
        />
        {httpMethod === "get" && (
          <div className="flex gap-2 flex-wrap">
            <Pill
              onClick={onPillClicked}
              displayValue="Filter"
              urlPart="?filter="
            />
            <Pill
              onClick={onPillClicked}
              displayValue="Select"
              urlPart="?select="
            />
            <Pill
              onClick={onPillClicked}
              displayValue="Expand"
              urlPart="?expand="
            />
            <Pill
              onClick={onPillClicked}
              displayValue="Order By"
              urlPart="?orderby="
            />
            <Pill onClick={onPillClicked} displayValue="Top" urlPart="?top=" />
            <Pill
              onClick={onPillClicked}
              displayValue="Skip"
              urlPart="?skip="
            />
            <Pill
              onClick={onPillClicked}
              displayValue="Search"
              urlPart="?search="
            />
          </div>
        )}
        {children}
      </FormProvider>
      <DevTool control={methods.control} placement="bottom-right" />
    </form>
  );
};
