import React from 'react';
import { twMerge } from 'tailwind-merge';
import classNames from 'classnames';

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

export const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ label, ...areaProps }, ref) => {
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
          ref={ref}
          onChange={areaProps.readOnly ? undefined : areaProps.onChange}
          className={twMerge(
            classNames(
              'block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-cyan-700 focus:border-cyan-700',
              { 'cursor-not-allowed': areaProps.disabled }
            ),
            areaProps.className
          )}
        ></textarea>
      </div>
    );
  }
);

Textarea.defaultProps = { readOnly: false };
