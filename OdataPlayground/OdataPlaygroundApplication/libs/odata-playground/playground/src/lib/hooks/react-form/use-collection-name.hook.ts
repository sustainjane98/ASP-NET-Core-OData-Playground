import { Control, useWatch } from 'react-hook-form';
import { OdataRequestForm } from '../../types/odata-request-form.type';

export const useCollectionName = (control?: Control<OdataRequestForm, any>) => {
  const url = useWatch({ control, name: 'url' }) as string;

  return url.split('/')?.[3]?.replace(/\?.*$/, '');
};
