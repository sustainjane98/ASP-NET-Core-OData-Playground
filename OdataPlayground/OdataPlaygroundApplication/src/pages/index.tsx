import React from "react";
import { NavigationTabHeader } from "../components/navigation-tab-header";
import { MainSection } from "../components/main-section";
import { OdataFormWrapper } from "../components/odata-form-wrapper";
import { OdataEndpointSection } from "../components/odata-endpoint-section";
import { useOdataScheme } from "../hooks/useOdataScheme.hook";
import { OdataEndpointSectionPlaceholderContainer } from "../components/odata-endpoint-section-placeholder-container";
import { ReactComponent as NoDataIllustration } from "../assets/undraw_no_data_re_kwbl.svg";
import { OdataScheme } from "../types/odata-scheme.type";

const IndexPage: React.FC = () => {
  const { data, isLoading } = useOdataScheme();

  return (
    <>
      <NavigationTabHeader />
      <main className="flex-1 flex p-6 gap-x-4">
        <MainSection>
          <OdataFormWrapper>
            <div className="h-10" />
            {data === undefined ||
              data === null ||
              (((data as OdataScheme)?.value?.length ?? 0) === 0 && (
                <div className="flex-1 flex justify-center items-center w-full min- h-full">
                  <div className="flex flex-col items-center">
                    <NoDataIllustration width={200} height={200} />
                    <span className="text-base font-medium ml-12 mt-6">
                      No Data available
                    </span>
                  </div>
                </div>
              ))}
            {isLoading ? (
              <OdataEndpointSectionPlaceholderContainer />
            ) : (
              (data as OdataScheme)?.value?.map(({ name, url }) => (
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
              ))
            )}
          </OdataFormWrapper>
        </MainSection>
      </main>
    </>
  );
};

export default IndexPage;
