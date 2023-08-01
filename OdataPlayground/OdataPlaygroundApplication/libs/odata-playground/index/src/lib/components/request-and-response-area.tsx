import React from 'react';
import { Textarea } from '@odata-playground/odata/common';
import { useWatch } from 'react-hook-form';
import { HttpMethod } from '@odata-playground/common';
import { IndexRequestAndReponseFormData } from '@odata-playground/odata/index';
import { DataTestids } from '@odata-playground/odata-e2e/data-testids';

export const RequestAndResponseArea: React.FC = () => {
  const httpMethod = useWatch({ name: 'httpMethod' }) as HttpMethod;

  return (
    <div className="flex gap-x-4">
      <Textarea
        id="request-area"
        dataTestId={DataTestids.Index.REQUEST_AREA}
        disabled={httpMethod === HttpMethod.GET}
        rows={10}
        className="flex-1"
        name={IndexRequestAndReponseFormData.REQUEST_AREA}
      />

      <Textarea
        id="response-area"
        dataTestId={DataTestids.Index.RESPONSE_AREA}
        readOnly
        rows={10}
        className="flex-1"
        name={IndexRequestAndReponseFormData.RESPONSE_AREA}
      />
    </div>
  );
};
