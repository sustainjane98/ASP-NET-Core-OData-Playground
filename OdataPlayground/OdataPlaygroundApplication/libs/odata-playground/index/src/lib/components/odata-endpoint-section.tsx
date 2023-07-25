import React from 'react';
import { LinkIcon } from '@heroicons/react/24/solid';
import {
  Pill,
  PillProps,
  Tooltip,
  Button,
  ButtonColorVariant,
  HttpMethod,
  CommonElementProps,
} from '@odata-playground/common';
import { useFormContext } from 'react-hook-form';
import { DataTestids } from '@odata-playground/odata-e2e/data-testids';

export interface Props extends Omit<CommonElementProps, 'name'> {
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
export const OdataEndpointSection: React.FC<Props> = ({
  id,
  dataTestId,
  title,
  subPaths,
}) => {
  const { setValue, getValues } = useFormContext();

  const buttonId = `${id}-odata-endpoint-section-link-icon-button`;

  // @ts-ignore
  return (
    <div
      id={id}
      data-test-id={dataTestId}
      className="max-w-sm p-6 bg-gray-50 border border-gray-200 rounded-lg shadow block"
    >
      <div className="flex">
        <span className="flex-1 mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
          {title}
        </span>
        <Button
          className="m-0 outline-none cursor-default"
          variant={ButtonColorVariant.TRANSPARENT}
          disableFocus
          dataTestId={
            dataTestId +
            DataTestids.Index.ODATA_ENDPOINT_SECTION_LINK_ICON_BUTTON
          }
          name={buttonId}
          id={buttonId}
        >
          <LinkIcon width={20} />
        </Button>
      </div>
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
