import React from 'react';
import { Textarea } from '@odata-playground/odata/common';
import { useWatch } from 'react-hook-form';
import { HttpMethod } from '@odata-playground/common/enums';
import { IndexRequestAndReponseFormData } from '../../enums/index-request-and-reponse-form-data.enum';
import { DataTestids } from '@odata-playground/odata-e2e/data-testids';
import { OpenEntityEditDialogButton } from '../react-form/open-entity-edit-dialog-button';

export const RequestAndResponseArea: React.FC = () => {
  const httpMethod = useWatch({ name: 'httpMethod' }) as HttpMethod;

  return (
    <div className="flex gap-x-4">
      <div className="relative w-full flex-1">
        <Textarea
          id="request-area"
          dataTestId={DataTestids.Index.REQUEST_AREA}
          disabled={httpMethod === HttpMethod.GET}
          rows={10}
          className="w-full"
          name={IndexRequestAndReponseFormData.REQUEST_AREA}
        />
        <OpenEntityEditDialogButton />
      </div>

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
