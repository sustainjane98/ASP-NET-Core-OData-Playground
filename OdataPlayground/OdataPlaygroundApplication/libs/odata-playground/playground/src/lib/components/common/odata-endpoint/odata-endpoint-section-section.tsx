import React from 'react';
import {
  Button,
  ButtonColorVariant,
  CommonElementProps,
  Pill,
} from '@odata-playground/common';
import { HttpMethod } from '@odata-playground/common/enums';
import { twMerge } from 'tailwind-merge';
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';
export type OdataEndpointSectionSectionProps = Omit<
  CommonElementProps,
  'name'
> & {
  method: HttpMethod;
  urlPart: string;
  className: string;
  onClick?: () => void;
};

export const OdataEndpointSectionSection: React.FC<
  OdataEndpointSectionSectionProps
> = ({ id, dataTestId, onClick, className, method, urlPart }) => {
  return (
    <div
      id={id}
      data-test-id={dataTestId}
      className={twMerge(
        'p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm flex min-w-[300px]',
        className
      )}
    >
      <div className={'w-full flex items-center gap-x-2'}>
        <Pill
          dataTestId={'pill-' + dataTestId}
          id={'pill-' + id}
          displayValue={method.toUpperCase()}
          disableFocus
          className="hover:bg-cyan-700 cursor-default"
        />

        <h3 className="font-medium text-lg flex-1">{urlPart}</h3>
        <Button
          id={''}
          dataTestId={''}
          className={'p-0'}
          variant={ButtonColorVariant.TRANSPARENT}
          disableFocus
          onClick={onClick}
        >
          <ArrowUpCircleIcon width={25} />
        </Button>
      </div>
    </div>
  );
};
