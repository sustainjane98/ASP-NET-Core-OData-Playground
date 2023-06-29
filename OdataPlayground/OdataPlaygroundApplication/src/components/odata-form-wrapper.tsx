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
import { HeadSection } from "./head-section";
import { HttpMethod } from "../enums/httpMethod.enum";
import { useRequestOdata } from "../hooks/useRequestOdata.hook";

export interface OdataRequestForm {
  baseUrl: string;
  url: string;
  requestArea: string;
  responseArea: string;
  httpMethod: HttpMethod;
}

/**
 * An OdataFormWrapper React Component.
 * @author Jane Will
 * @version 0.1
 */
export const OdataFormWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const methods = useForm<OdataRequestForm>({
    defaultValues: {
      httpMethod: HttpMethod.GET,
      baseUrl: "",
      url: "",
      requestArea: "",
      responseArea: "",
    },
  });
  const onSubmit: SubmitHandler<OdataRequestForm> = (data) => console.log(data);

  const inputRef = React.createRef<HTMLInputElement>();

  const httpMethod = useWatch({ control: methods.control, name: "httpMethod" });

  const { data, isError, isSuccess, mutate } = useRequestOdata();

  useEffect(() => {
    if (data && isSuccess) {
      methods.setValue("responseArea", JSON.stringify(data));
    } else {
      methods.setValue("responseArea", "Something went wrong");
    }
  }, [data, isSuccess]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const odataPath = urlParams.get("odataPath");

    // eslint-disable-next-line no-restricted-globals
    methods.setValue("baseUrl", odataPath ?? location.origin, {
      shouldDirty: true,
    });
    // eslint-disable-next-line no-restricted-globals
    methods.setValue("url", odataPath ?? location.origin, {
      shouldDirty: true,
    });
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
            {
              children: "Send",
              onClick: () => {
                const url = methods.getValues("url");
                mutate({ httpMethod: httpMethod, url });
              },
            },
          ]}
          dropdownProps={[
            {
              name: "httpMethod",
              values: [
                { key: HttpMethod.GET, value: "GET" },
                { key: HttpMethod.POST, value: "POST" },
                { key: HttpMethod.PUT, value: "PUT" },
                { key: HttpMethod.PATCH, value: "PATCH" },
                { key: HttpMethod.DELETE, value: "DELETE" },
              ],
            },
          ]}
        />

        <HeadSection
          children={
            httpMethod === HttpMethod.GET && [
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
                <Pill
                  onClick={onPillClicked}
                  displayValue="Top"
                  urlPart="?top="
                />
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
              </div>,
              <div className="flex gap-2 flex-wrap">
                <Pill
                  variant={ButtonColorVariant.LIGHT}
                  onClick={onPillClicked}
                  displayValue="Equals"
                  urlPart="Name eq 'Customer 2'"
                />
                <Pill
                  variant={ButtonColorVariant.LIGHT}
                  onClick={onPillClicked}
                  displayValue="Less than"
                  urlPart="Age lt 2"
                />
                <Pill
                  variant={ButtonColorVariant.LIGHT}
                  onClick={onPillClicked}
                  displayValue="Greater than"
                  urlPart="Age gt 2"
                />
                <Pill
                  variant={ButtonColorVariant.LIGHT}
                  onClick={onPillClicked}
                  displayValue="And"
                  urlPart=" and "
                />
                <Pill
                  variant={ButtonColorVariant.LIGHT}
                  onClick={onPillClicked}
                  displayValue="Or"
                  urlPart=" or "
                />
                <Pill
                  variant={ButtonColorVariant.LIGHT}
                  onClick={onPillClicked}
                  displayValue="Greater than or equal to"
                  urlPart="Age ge 2"
                />
                <Pill
                  variant={ButtonColorVariant.LIGHT}
                  onClick={onPillClicked}
                  displayValue="Not equal"
                  urlPart="Name ne 'Customer 2'"
                />
                <Pill
                  variant={ButtonColorVariant.LIGHT}
                  onClick={onPillClicked}
                  displayValue="Ends with"
                  urlPart="endswith(VAT_Bus_Posting_Group,'RT')"
                />
                <Pill
                  variant={ButtonColorVariant.LIGHT}
                  onClick={onPillClicked}
                  displayValue="Starts with"
                  urlPart="startswith(Name, 'S')"
                />
                <Pill
                  variant={ButtonColorVariant.LIGHT}
                  onClick={onPillClicked}
                  displayValue="Substring of"
                  urlPart="substringof(Name, ‘urn’)"
                />
                <Pill
                  variant={ButtonColorVariant.LIGHT}
                  onClick={onPillClicked}
                  displayValue="Index of"
                  urlPart="indexof(Location_Code, ‘BLUE’) eq 0"
                />
                <Pill
                  variant={ButtonColorVariant.LIGHT}
                  onClick={onPillClicked}
                  displayValue="Replace"
                  urlPart="replace(City, 'Miami', 'Tampa') eq 'CODERED'"
                />
                <Pill
                  variant={ButtonColorVariant.LIGHT}
                  onClick={onPillClicked}
                  displayValue="Substring"
                  urlPart="substring(Location_Code, 5) eq 'RED'"
                />
                <Pill
                  variant={ButtonColorVariant.LIGHT}
                  onClick={onPillClicked}
                  displayValue="To lower"
                  urlPart="tolower(Location_Code) eq 'code red'"
                />
                <Pill
                  variant={ButtonColorVariant.LIGHT}
                  onClick={onPillClicked}
                  displayValue="To upper"
                  urlPart="toupper(FText) eq '2ND ROW'"
                />
                <Pill
                  variant={ButtonColorVariant.LIGHT}
                  onClick={onPillClicked}
                  displayValue="Trim"
                  urlPart="trim(FCode) eq 'CODE RED'"
                />{" "}
                <Pill
                  variant={ButtonColorVariant.LIGHT}
                  onClick={onPillClicked}
                  displayValue="Concat"
                  urlPart="concat(concat(FText, ', '), FCode) eq '2nd row, CODE RED'"
                />
                <Pill
                  variant={ButtonColorVariant.LIGHT}
                  onClick={onPillClicked}
                  displayValue="Round"
                  urlPart="round(FDecimal) eq 1"
                />
                <Pill
                  variant={ButtonColorVariant.LIGHT}
                  onClick={onPillClicked}
                  displayValue="Floor"
                  urlPart="floor(FDecimal) eq 0"
                />
                <Pill
                  variant={ButtonColorVariant.LIGHT}
                  onClick={onPillClicked}
                  displayValue="Ceiling"
                  urlPart="ceiling(FDecimal) eq 1"
                />
              </div>,
            ]
          }
        />

        {children}
      </FormProvider>
      <DevTool control={methods.control} placement="bottom-right" />
    </form>
  );
};
