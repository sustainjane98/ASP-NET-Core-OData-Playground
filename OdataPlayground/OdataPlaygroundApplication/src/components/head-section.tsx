import React, { PropsWithChildren } from "react";
import { Textarea } from "./textarea";

export const HeadSection: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex gap-x-4">
      {children ? (
        <div className="flex flex-1 flex-wrap gap-2">{children}</div>
      ) : (
        <Textarea
          rows={10}
          className="flex-1"
          id={"request-area"}
          name={"requestArea"}
        />
      )}
      <Textarea
        readOnly
        rows={10}
        className="flex-1"
        id={"response-area"}
        name={"responseArea"}
      />
    </div>
  );
};
