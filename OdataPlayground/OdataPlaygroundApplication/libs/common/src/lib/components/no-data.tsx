import React from 'react';
import { ReactComponent as NoDataIllustration } from '../assets/undraw_no_data_re_kwbl.svg';

export const NoData = () => {
  return (
    <div className="flex-1 flex justify-center items-center w-full min- h-full">
      <div className="flex flex-col items-center">
        <NoDataIllustration width={200} height={200} />
        <span className="text-base font-medium ml-12 mt-6">
          No Data available
        </span>
      </div>
    </div>
  );
};
