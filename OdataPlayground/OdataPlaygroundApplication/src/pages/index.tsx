import React from "react";
import { NavigationTabHeader } from "../components/NavigationTabHeader";
import { MainSection } from "../components/MainSection";
import { OdataFormWrapper } from "../components/OdataFormWrapper";
import { OdataEndpointSection } from "../components/ODataEndpointSection";
import { useOdataScheme } from "../hooks/useOdataScheme.hook";

const IndexPage: React.FC = () => {
  const { data } = useOdataScheme();

  return (
    <>
      <NavigationTabHeader />
      <main className="flex-1 flex p-6 gap-x-4">
        <MainSection>
          <OdataFormWrapper>
            <div className="h-10" />
            {data?.value.map(({ name, url }) => (
              <OdataEndpointSection
                title={name}
                subPaths={[
                  {
                    displayValue: "GetAll",
                    urlPart: `/${url}`,
                    toolTip: {
                      id: `tooltip-get-all-${name}`,
                      title: `GET '/${url}'`,
                    },
                  },
                  {
                    displayValue: "GetById",
                    urlPart: `/${url}($id)`,
                    toolTip: {
                      id: `tooltip-get-by-id-${name}`,
                      title: `GET '/${url}($id)'`,
                    },
                  },
                  {
                    displayValue: "Create",
                    urlPart: `/${url}`,
                    toolTip: {
                      id: `tooltip-post-${name}`,
                      title: `POST '/${url}($id)'`,
                    },
                  },
                  {
                    displayValue: "Update",
                    urlPart: `/${url}`,
                    toolTip: {
                      id: `tooltip-put-${name}`,
                      title: `PUT '/${url}($id)'`,
                    },
                  },
                  {
                    displayValue: "UpdatePartial",
                    urlPart: `/${url}`,
                    toolTip: {
                      id: `tooltip-patch-${name}`,
                      title: `PATCH '/${url}($id)'`,
                    },
                  },
                  {
                    displayValue: "DeleteById",
                    urlPart: `/${url}($id)`,
                    toolTip: {
                      id: `tooltip-delete-${name}`,
                      title: `DELETE '/${url}($id)'`,
                    },
                  },
                ]}
              />
            ))}
          </OdataFormWrapper>
        </MainSection>
      </main>
    </>
  );
};

export default IndexPage;
