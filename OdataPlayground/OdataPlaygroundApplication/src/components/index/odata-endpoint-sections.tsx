import { OdataEndpointSection } from "./odata-endpoint-section";
import { HttpMethod } from "../../enums/http-method.enum";
import React from "react";
import { useOdataScheme } from "../../hooks/use-odata-scheme.hook";
import { mapOdataDebugSchemeToOdataDebugGroups } from "../../utils/mapper";

export const OdataEndpointSections = () => {
  const { data } = useOdataScheme();
  return (
    <div className="flex gap-4 flex-wrap">
      {mapOdataDebugSchemeToOdataDebugGroups(data)?.map(({ name, values }) => (
        <OdataEndpointSection
          key={name}
          title={name}
          subPaths={values?.map(({ Pattern: url, HttpMethods }) => ({
            displayValue: `${HttpMethods?.[0]} ${url}`,
            urlPart: `/${url}`,
            httpMethod: HttpMethods?.[0].toLowerCase() as HttpMethod,
          }))}
        />
      ))}
    </div>
  );
};
