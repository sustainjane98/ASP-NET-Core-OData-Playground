import React from "react";
import { useFormContext } from "react-hook-form";
import { OdataRequestForm } from "./OdataFormWrapper";

export interface Props {
  urlPart: string;
  displayValue: string;
  onClick?: () => void;
}

/**
 * An Pill React Component.
 * @author Jane Will
 * @version 0.1
 */
export const Pill: React.FC<Props> = ({ displayValue, urlPart, onClick }) => {
  const { setValue, getValues } = useFormContext<OdataRequestForm>();

  return (
    <button
      onClick={() => {
        const urlValue = getValues("url");
        setValue("url", `${urlValue}${urlPart}`);

        onClick?.();
      }}
      className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 font-medium rounded-full text-sm px-5 py-2.5"
    >
      <span>{displayValue}</span>
    </button>
  );
};
