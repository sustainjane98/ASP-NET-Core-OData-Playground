import React, { useEffect } from "react";
import { MainSection } from "../components/main-section";
import { OdataFormWrapper } from "../components/odata-form-wrapper";
import { OdataEndpointSection } from "../components/odata-endpoint-section";
import { useOdataScheme } from "../hooks/useOdataScheme.hook";
import { OdataEndpointSectionPlaceholderContainer } from "../components/odata-endpoint-section-placeholder-container";
import { ReactComponent as NoDataIllustration } from "../assets/undraw_no_data_re_kwbl.svg";
import { OdataConvertMapper } from "../services/mappers/odata-convert.mapper";
import { HttpMethod } from "../enums/httpMethod.enum";

const IndexPage: React.FC = () => {
  const { data, isLoading } = useOdataScheme();

  // eslint-disable-next-line no-lone-blocks
  {
    /*TODO: Put this in a separate hook */
  }
  useEffect(() => {
    const alertUser = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", alertUser);
    return () => window.removeEventListener("beforeunload", alertUser);
  });

  return (
    <>
      <main className="flex-1 flex p-6 gap-x-4">
        <MainSection>
          <OdataFormWrapper>
            <div className="h-10" />
            {data === undefined ||
              data === null ||
              ((data?.length ?? 0) === 0 && (
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
              <div className="flex gap-4 flex-wrap">
                {OdataConvertMapper.mapOdataDebugSchemeToOdataDebugGroups(
                  data
                )?.map(({ name, values }) => (
                  <OdataEndpointSection
                    title={name}
                    subPaths={values?.map(({ Pattern: url, HttpMethods }) => ({
                      displayValue: `${HttpMethods?.[0]} ${url}`,
                      urlPart: `/${url}`,
                      httpMethod: HttpMethods?.[0].toLowerCase() as HttpMethod,
                    }))}
                  />
                ))}
              </div>
            )}
          </OdataFormWrapper>
        </MainSection>
      </main>
    </>
  );
};

export default IndexPage;
