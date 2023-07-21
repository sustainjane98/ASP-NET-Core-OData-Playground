import React from 'react';
import { OdataPlayground } from '@odata-playground/odata/index';
import { usePreventClosingBrowserWindow } from '@odata-playground/common';
import { BorderArea } from '@odata-playground/common';
import {
  FilterVariants,
  FilterQueryOperators,
} from '@odata-playground/odata/config';

const IndexPage: React.FC = () => {
  usePreventClosingBrowserWindow();

  return (
    <main className="flex-1 flex p-6 gap-x-4">
      <BorderArea>
        <OdataPlayground
          textfieldAutocomplete={[...FilterVariants, ...FilterQueryOperators]}
        />
      </BorderArea>
    </main>
  );
};

export default IndexPage;
