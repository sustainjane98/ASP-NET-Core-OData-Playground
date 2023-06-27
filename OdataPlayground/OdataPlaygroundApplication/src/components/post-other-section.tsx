import React from "react";
import { Textarea } from "./textarea";

export interface Props {}

export const PostOtherSection: React.FC<Props> = (props) => {
  return (
    <div className="flex gap-x-4">
      <Textarea
        rows={10}
        className="flex-1"
        id={"request-area"}
        name={"requestArea"}
      />
      <Textarea
        rows={10}
        className="flex-1"
        id={"response-area"}
        name={"responseArea"}
      />
    </div>
  );
};
