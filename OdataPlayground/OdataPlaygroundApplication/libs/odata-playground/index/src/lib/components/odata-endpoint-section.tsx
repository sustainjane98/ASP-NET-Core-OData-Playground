import React from 'react';
import { LinkIcon } from '@heroicons/react/24/solid';
import {
  Pill,
  PillProps,
  Tooltip,
  Button,
  ButtonColorVariant,
  HttpMethod,
} from '@odata-playground/common';
import { useFormContext } from 'react-hook-form';

export interface Props {
  title: string;
  subPaths: (PillProps & {
    toolTip?: { id: string; title: string };
    httpMethod: HttpMethod;
    urlPart: string;
  })[];
}

/**
 * An OdataEndpointSection React Component.
 * @author Jane Will
 * @version 0.1
 */
export const OdataEndpointSection: React.FC<Props> = ({ title, subPaths }) => {
  const { setValue, getValues } = useFormContext();

  return (
    <div className="max-w-sm p-6 bg-gray-50 border border-gray-200 rounded-lg shadow block">
      <div className="flex">
        <span className="flex-1 mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
          {title}
        </span>
        <Button
          className="m-0 outline-none cursor-default"
          variant={ButtonColorVariant.TRANSPARENT}
          disableFocus
        >
          <LinkIcon width={20} />
        </Button>
      </div>
      {/*TODO: Fix grid so that all elements have same height and width */}
      <div className="flex gap-2 mt-2 flex-wrap">
        {subPaths.map(({ toolTip, httpMethod, urlPart, ...other }) => [
          <Pill
            key={other.displayValue}
            {...other}
            className="max-w-[200px] break-all"
            onClick={() => {
              let urlValue: string;

              if (httpMethod) {
                setValue('httpMethod', httpMethod);
              }

              urlValue = getValues('baseUrl');

              setValue('url', `${urlValue}${urlPart}`);
            }}
            data-tooltip-target={toolTip ? toolTip?.id ?? 'tooltip' : undefined}
          />,
          toolTip ? (
            <Tooltip id={toolTip?.id ?? 'tooltip'}>{toolTip?.title}</Tooltip>
          ) : undefined,
        ])}
      </div>
    </div>
  );
};
