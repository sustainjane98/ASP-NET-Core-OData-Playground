import React from 'react';
import { Textarea } from '@odata-playground/odata/common';
import { useWatch } from 'react-hook-form';
import { HttpMethod } from '@odata-playground/common';
import { IndexRequestAndReponseFormData } from '@odata-playground/odata/index';

export const RequestAndResponseArea: React.FC = () => {
  const httpMethod = useWatch({ name: 'httpMethod' }) as HttpMethod;

  return (
    <div className="flex gap-x-4">
      <Textarea
        disabled={httpMethod === HttpMethod.GET}
        rows={10}
        className="flex-1"
        id={'request-area'}
        name={IndexRequestAndReponseFormData.REQUEST_AREA}
      />

      <Textarea
        readOnly
        rows={10}
        className="flex-1"
        id={'response-area'}
        name={IndexRequestAndReponseFormData.RESPONSE_AREA}
      />
    </div>
  );
};
