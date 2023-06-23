import React from "react";
import { LinkIcon } from "@heroicons/react/24/solid";
import { Pill, Props as PillProps } from "./pill";
export interface Props {
  title: string;
  subPaths: PillProps[];
}

/**
 * An OdataEndpointSection React Component.
 * @author Jane Will
 * @version 0.1
 */
export const OdataEndpointSection: React.FC<Props> = ({ title, subPaths }) => {
  return (
    <div className="max-w-sm p-6 bg-gray-50 border border-gray-200 rounded-lg shadow block">
      <div className="flex">
        <span className="flex-1 mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
          {title}
        </span>
        <button className="m-0 outline-none">
          <LinkIcon width={20} />
        </button>
      </div>
      <div className="flex gap-2 mt-2">
        {subPaths.map((a) => (
          <Pill {...a} />
        ))}
      </div>
    </div>
  );
};
