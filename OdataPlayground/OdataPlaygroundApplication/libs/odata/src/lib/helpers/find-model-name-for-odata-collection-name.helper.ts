import {
  EntitySet,
  OdataMetadataScheme,
} from '../types/odata-metadata-scheme.type';
import { findPropertyInScheme } from './find-property-in-scheme.helper';
import { addObjectOrArrayToArray } from './add-object-or-array-to-array.helper';

export const findModelnameForOdataCollectionname = (
  modelName: string,
  scheme: OdataMetadataScheme
): string | undefined => {
  const entitySets = findPropertyInScheme<EntitySet>('EntitySet', scheme);
  const singletons = findPropertyInScheme<EntitySet>('Singleton', scheme);

  let results: EntitySet[] = [];
  results = addObjectOrArrayToArray(results, entitySets);
  results = addObjectOrArrayToArray(results, singletons);

  const result = results.find(({ '@Name': name }) => {
    return name === modelName;
  });

  return (
    result?.['@Type'].match(/\w+$/)?.[0] ??
    result?.['@EntityType'].match(/\w+$/)?.[0]
  );
};
