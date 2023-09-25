import { OdataEndpointSection } from './odata-endpoint-section';
import { HttpMethod } from '@odata-playground/common/enums';
import React from 'react';
import { DataTestids } from '@odata-playground/odata-e2e/data-testids';
import {
  mapOdataDebugSchemeToOdataDebugGroups,
  useOdataScheme,
} from '@odata-playground/odata';

export const OdataEndpointSections = () => {
  const { data } = useOdataScheme();
  return (
    <div className="flex items-start align-baseline gap-4 flex-wrap">
      {mapOdataDebugSchemeToOdataDebugGroups(data)?.map(({ name, values }) => (
        <OdataEndpointSection
          id={'odata-endpoint-section'}
          dataTestId={DataTestids.Index.ODATA_ENDPOINT_SECTION}
          key={name}
          title={name}
          subPaths={values?.map(({ Pattern: url, HttpMethods }) => ({
            displayValue: `${HttpMethods?.[0]} ${url}`,
            urlPart: `/${url}`,
            httpMethod: HttpMethods?.[0].toLowerCase() as HttpMethod,
            name: `odata-endpoint-section-path-${HttpMethods?.[0].toLowerCase()}-${url}`,
            id: `odata-endpoint-section-path-${HttpMethods?.[0].toLowerCase()}-${url}`,
            dataTestId: DataTestids.Index.ODATA_ENDPOINT_SECTION_URL(
              url,
              HttpMethods?.[0].toLowerCase()
            ),
          }))}
        />
      ))}
    </div>
  );
};
