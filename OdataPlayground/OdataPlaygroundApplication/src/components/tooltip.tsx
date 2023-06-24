import React from "react";

export interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

/**
 * An ToolTip React Component.
 * @author Jane Will
 * @version 0.1
 */
export const ToolTip: React.FC<Props> = ({ children, ...props }) => {
  return (
    <div
      id="tooltip"
      role="tooltip"
      {...props}
      className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip"
    >
      {children}
      <div className="tooltip-arrow" data-popper-arrow></div>
    </div>
  );
};
