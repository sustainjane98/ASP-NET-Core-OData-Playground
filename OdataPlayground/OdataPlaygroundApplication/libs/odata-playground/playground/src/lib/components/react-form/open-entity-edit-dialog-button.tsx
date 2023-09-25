import React, { useState } from 'react';
import { Button } from '@odata-playground/common';
import { DataTestids } from '@odata-playground/odata-e2e/data-testids';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { EditEntityDialog } from '../common/edit-entity-dialog';
import { useFormContext, useWatch } from 'react-hook-form';
import { IndexRequestAndReponseFormData } from '../../enums/index-request-and-reponse-form-data.enum';

export const OpenEntityEditDialogButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  const { control } = useFormContext();

  const requestArea = useWatch({
    control,
    name: IndexRequestAndReponseFormData.REQUEST_AREA,
  }) as string;

  if (requestArea)
    return (
      <>
        <Button
          className="absolute bottom-2 right-2"
          id={'open-entity-edit-dialog-button'}
          dataTestId={DataTestids.Index.OPEN_ENTITY_EDIT_BUTTON}
          onClick={() => setOpen((prev) => !prev)}
        >
          <PencilSquareIcon width={20} />
        </Button>
        {open && <EditEntityDialog onClose={() => setOpen(false)} />}
      </>
    );
  return null;
};
