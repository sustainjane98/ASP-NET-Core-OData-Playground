import React from 'react';
import { Textarea } from '@odata-playground/common';
import { useWatch } from 'react-hook-form';
import { HttpMethod } from '@odata-playground/common';

export const RequestAndResponseArea: React.FC = () => {
  const httpMethod = useWatch({ name: 'httpMethod' }) as HttpMethod;

  return (
    <div className="flex gap-x-4">
      <Textarea
        disabled={httpMethod === HttpMethod.GET}
        rows={10}
        className="flex-1"
        id={'request-area'}
        name={'requestArea'}
      />

      <Textarea
        readOnly
        rows={10}
        className="flex-1"
        id={'response-area'}
        name={'responseArea'}
      />
    </div>
  );
};
