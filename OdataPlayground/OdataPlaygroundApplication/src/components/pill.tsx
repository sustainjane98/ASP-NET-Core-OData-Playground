import React from "react";
import { useFormContext } from "react-hook-form";
import { OdataRequestForm } from "./odata-form-wrapper";

export interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  urlPart: string;
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
  ...props
}) => {
  const { setValue, getValues } = useFormContext<OdataRequestForm>();

  return (
    <button
      {...props}
      onClick={() => {
        let urlValue: string;
        if (resetToBaseUrl) {
          urlValue = getValues("baseUrl");
        } else {
          urlValue = getValues("url");
        }
        setValue("url", `${urlValue}${urlPart}`);

        onClick?.();
      }}
      className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 font-medium rounded-full text-sm px-5 py-2.5"
    >
      <span>{displayValue}</span>
    </button>
  );
};

Pill.defaultProps = { resetToBaseUrl: false };
