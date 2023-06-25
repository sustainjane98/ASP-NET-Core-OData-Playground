import React from "react";
import { OdataEndpointSectionPlaceholder } from "./odata-endpoint-section-placeholder";

export const OdataEndpointSectionPlaceholderContainer: React.FC = () => {
  return (
    <div className="flex gap-2 flex-wrap">
      <OdataEndpointSectionPlaceholder />
      <OdataEndpointSectionPlaceholder />
      <OdataEndpointSectionPlaceholder />
      <OdataEndpointSectionPlaceholder />
      <OdataEndpointSectionPlaceholder />
      <OdataEndpointSectionPlaceholder />
    </div>
  );
};
