import React from 'react';
import { useFormContext } from 'react-hook-form';
import { OdataRequestForm } from '@odata-playground/odata/common';
import { HttpMethod } from '@odata-playground/common';
import { twMerge } from 'tailwind-merge';
import { Pill as PillCommon, PillProps } from '@odata-playground/common';
export interface Props extends PillProps {
  urlPart: string;
  httpMethod?: HttpMethod;
  resetToBaseUrl?: boolean;
}

/**
 * An Pill React Component.
 * @author Jane Will
 * @version 0.1
 */
export const Pill: React.FC<Props> = ({
  urlPart,
  onClick,
  resetToBaseUrl,
  httpMethod,
  ...props
}) => {
  const { setValue, getValues } = useFormContext<OdataRequestForm>();

  return (
    <PillCommon
      {...props}
      onClick={() => {
        let urlValue: string;

        if (httpMethod) {
          setValue('httpMethod', httpMethod);
        }

        if (resetToBaseUrl) {
          urlValue = getValues('baseUrl');
        } else {
          urlValue = getValues('url');
        }
        setValue('url', `${urlValue}${urlPart}`);

        onClick?.();
      }}
    />
  );
};

Pill.defaultProps = { resetToBaseUrl: false, httpMethod: HttpMethod.GET };
