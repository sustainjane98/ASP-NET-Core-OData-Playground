import React, { PropsWithChildren } from "react";

export interface Props extends PropsWithChildren {}

/**
 * An MainSection React Component.
 * @author Jane Will
 * @version 0.1
 */
export const MainSection: React.FC<Props> = ({ children }) => {
  return (
    <div className="border border-cyan-700 rounded-md flex-1 w-full h-full px-4 py-6">
      {children}
    </div>
  );
};
