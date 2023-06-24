import React from "react";
import { useFormContext } from "react-hook-form";
import { mergeRefs } from "react-merge-refs";
import { Button, ButtonProps } from "./button";

export interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  buttonProps?: ButtonProps[];
  name: string;
}

/**
 * An TextField React Component.
 * @author Jane Will
 * @version 0.1
 */
export const TextField = React.forwardRef<HTMLInputElement, Props>(
  ({ label, buttonProps, ...inputProps }, ref) => {
    const { register } = useFormContext();
    const { ref: registerRef, ...other } = register(inputProps.name);

    return (
      <div>
        {label && (
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {label}
          </label>
        )}
        <div className="relative p-2.5 flex items-center bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-700 focus:border-cyan-700 w-full">
          <input
            className="py-2.5 border-none focus:outline-none focus:ring-0 bg-gray-100 w-full h-full block"
            {...other}
            {...inputProps}
            ref={mergeRefs([registerRef, ref])}
          ></input>

          {buttonProps &&
            buttonProps.map((b) => (
              <Button
                {...buttonProps}
                type="button"
                className=" text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                {b.children ?? b.title}
              </Button>
            ))}
        </div>
      </div>
    );
  }
);

TextField.displayName = "TextField";
