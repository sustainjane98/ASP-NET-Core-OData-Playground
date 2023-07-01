import React, { PropsWithChildren } from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import { Textfield } from "./textfield";
import { ButtonColorVariant } from "./button";
import { DevTool } from "@hookform/devtools";
import { HeadSection } from "./head-section";
import { HttpMethod } from "../enums/httpMethod.enum";
import { useRequestOdata } from "../hooks/useRequestOdata.hook";
import { FilterVariants } from "../data/filter-variants";
import { FilterQueryOperators } from "../data/filter-query-operators";
import { useBaseUrl } from "../hooks/use-base-url.hook";
import { useReponseArea } from "../hooks/use-reponse-area.hook";
import { useOdataScheme } from "../hooks/useOdataScheme.hook";
import { OdataConvertMapper } from "../services/mappers/odata-convert.mapper";

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
  const { data } = useOdataScheme();
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
  const {
    data: odataRequestResponseData,
    isSuccess,
    mutate,
  } = useRequestOdata();

  useReponseArea(methods, odataRequestResponseData, isSuccess);
  useBaseUrl(methods);

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
          autoComplete={[
            ...FilterVariants,
            ...FilterQueryOperators,
            {
              selector: /https*:\/\/[A-Za-z]*:*\d{1,4}\/.+\/$/,
              key: "$count",
              value: "count",
            },
            ...OdataConvertMapper.mapOdataSchemeToFilters(data),
          ]}
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
                const requestArea =
                  httpMethod !== HttpMethod.GET
                    ? methods.getValues("requestArea")
                    : undefined;
                mutate({ httpMethod: httpMethod, url, data: requestArea });
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
        <HeadSection />
        {children}
      </FormProvider>
      <DevTool control={methods.control} placement="bottom-right" />
    </form>
  );
};
