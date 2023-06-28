import React from "react";
import { useFormContext } from "react-hook-form";
import { Button, ButtonProps } from "./button";
import { OdataRequestForm } from "./odata-form-wrapper";
import { HttpMethod } from "../enums/httpMethod.enum";

export interface Props extends ButtonProps {
  urlPart: string;
  httpMethod?: HttpMethod;
  displayValue: string;
  onClick?: () => void;
  resetToBaseUrl?: boolean;
}

/**
 * An Pill React Component.
 * @author Jane Will
 * @version 0.1
 */
export const Pill: React.FC<Props> = ({
  displayValue,
  urlPart,
  onClick,
  resetToBaseUrl,
  httpMethod,
  ...props
}) => {
  const { setValue, getValues } = useFormContext<OdataRequestForm>();

  return (
    <Button
      {...props}
      onClick={() => {
        let urlValue: string;

        if (httpMethod) {
          setValue("httpMethod", httpMethod);
        }

        if (resetToBaseUrl) {
          urlValue = getValues("baseUrl");
        } else {
          urlValue = getValues("url");
        }
        setValue("url", `${urlValue}${urlPart}`);

        onClick?.();
      }}
      className="rounded-full"
    >
      <span>{displayValue}</span>
    </Button>
  );
};

Pill.defaultProps = { resetToBaseUrl: false, httpMethod: HttpMethod.GET };
