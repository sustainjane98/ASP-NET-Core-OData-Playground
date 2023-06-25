import React from "react";

export interface Props {}

export const OdataEndpointSectionPlaceholder: React.FC<Props> = () => {
  const numberOfPills = Math.floor(Math.random() * 10);

  return (
    <div className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse inline-block">
      <div className="flex">
        <span className="flex-1 w-48 h-2.5 bg-gray-200 rounded-full" />
      </div>
      <div className="flex gap-2 mt-2 flex-wrap">
        {(() => {
          let res: React.ReactElement[] = [];

          for (let i = 0; i < numberOfPills; i++) {
            res.push(<div className="w-24 h-10 bg-gray-200 rounded-full" />);
          }
          return res;
        })()}
      </div>
    </div>
  );
};
