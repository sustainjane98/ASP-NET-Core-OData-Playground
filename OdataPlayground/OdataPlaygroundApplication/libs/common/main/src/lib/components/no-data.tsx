import React from 'react';
import { UndrawNoDataIllustration } from '../assets/icons/vectors/generated';

export const NoData = () => {
  return (
    <div className="flex-1 flex justify-center items-center w-full min- h-full">
      <div className="flex flex-col items-center">
        <UndrawNoDataIllustration width={200} height={200} />
        <span className="text-base font-medium ml-12 mt-6">
          No Data available
        </span>
      </div>
    </div>
  );
};
