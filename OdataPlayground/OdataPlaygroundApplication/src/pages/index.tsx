import React from "react";
import { NavigationTabHeader } from "../components/NavigationTabHeader";
import { MainSection } from "../components/MainSection";
import { OdataFormWrapper } from "../components/OdataFormWrapper";
import { OdataEndpointSection } from "../components/ODataEndpointSection";

const IndexPage: React.FC = () => (
  <>
    <NavigationTabHeader />
    <main className="flex-1 flex p-6 gap-x-4">
      <MainSection>
        <OdataFormWrapper>
          <div className="h-10" />
          <OdataEndpointSection
            title="Customers"
            subPaths={[{ displayValue: "GetAll", urlPart: "/customers" }]}
          />
        </OdataFormWrapper>
      </MainSection>
    </main>
  </>
);

export default IndexPage;
