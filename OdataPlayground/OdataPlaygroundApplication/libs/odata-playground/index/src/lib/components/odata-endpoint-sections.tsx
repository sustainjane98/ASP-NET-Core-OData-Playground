import { OdataEndpointSection } from './odata-endpoint-section';
import { HttpMethod } from '@odata-playground/common';
import React from 'react';
import { useOdataScheme } from '@odata-playground/odata/common';
import { mapOdataDebugSchemeToOdataDebugGroups } from '@odata-playground/odata/common';

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
