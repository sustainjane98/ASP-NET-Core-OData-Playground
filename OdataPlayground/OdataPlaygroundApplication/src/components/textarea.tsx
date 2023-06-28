import React from "react";
import { twMerge } from "tailwind-merge";
import { useFormContext } from "react-hook-form";

export interface Props
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  id: string;
  name: string;
  label?: string;
  readOnly?: boolean;
}

export const Textarea: React.FC<Props> = ({ label, ...areaProps }) => {
  const { register } = useFormContext();

  const { onChange, ...registerProps } = register(areaProps.name);

  return (
    <div className={areaProps.className}>
      {label && (
        <label
          htmlFor={areaProps.id}
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <textarea
        {...areaProps}
        {...registerProps}
        onChange={areaProps.readOnly ? undefined : onChange}
        className={twMerge(
          "block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-cyan-700 focus:border-cyan-700",
          areaProps.className
        )}
      ></textarea>
    </div>
  );
};

Textarea.defaultProps = { readOnly: false };
