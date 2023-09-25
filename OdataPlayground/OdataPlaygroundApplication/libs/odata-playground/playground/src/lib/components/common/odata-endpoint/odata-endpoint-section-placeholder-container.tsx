import React from 'react';
import { OdataEndpointSectionPlaceholder } from './odata-endpoint-section-placeholder';

export const OdataEndpointSectionPlaceholderContainer: React.FC = () => {
  return (
    <div className="flex gap-2 flex-wrap">
      <OdataEndpointSectionPlaceholder numberOfPills={5} key="placeholder-1" />
      <OdataEndpointSectionPlaceholder numberOfPills={7} key="placeholder-2" />
      <OdataEndpointSectionPlaceholder numberOfPills={3} key="placeholder-3" />
      <OdataEndpointSectionPlaceholder numberOfPills={5} key="placeholder-4" />
      <OdataEndpointSectionPlaceholder numberOfPills={7} key="placeholder-5" />
      <OdataEndpointSectionPlaceholder numberOfPills={4} key="placeholder-6" />
    </div>
  );
};
