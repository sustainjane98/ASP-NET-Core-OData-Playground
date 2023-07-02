import React from "react";
import { BorderArea } from "../components/common/border-area";
import { OdataPlayground } from "../components/index/odata-playground";
import { usePreventClosingBrowserWindow } from "../hooks/use-prevent-closing-browser-window.hook";

const IndexPage: React.FC = () => {
  usePreventClosingBrowserWindow();

  return (
    <main className="flex-1 flex p-6 gap-x-4">
      <BorderArea>
        <OdataPlayground />
      </BorderArea>
    </main>
  );
};

export default IndexPage;
