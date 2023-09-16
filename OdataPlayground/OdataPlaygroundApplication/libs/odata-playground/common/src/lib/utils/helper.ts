import {
  EntitySet,
  EntityType,
  OdataMetadataScheme,
} from '../types/odata-metadata-scheme.type';
import { isMetadataScheme } from '../types/odata-metadata-scheme.typeguard';

export const findEntityTypeInCollection = (
  collection: EntityType[] | EntityType,
  name: string
) => {
  if (isMetadataScheme(collection)) {
    if (collection['@Name'] === name) {
      return collection;
    }
  }
  return (collection as EntityType[]).find((e) => e['@Name'] === name);
};

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

export const addObjectOrArrayToArray = <T>(array: T[], value: T | T[]): T[] => {
  if (Array.isArray(value)) {
    array = array.concat(value);
  } else {
    array.push(value);
  }

  return array;
};

const findPropertyInScheme = <T>(
  property: string,
  scheme: OdataMetadataScheme
): T | T[] => {
  return scheme['edmx:Edmx']['edmx:DataServices'].Schema.filter(
    ({ EntityContainer }) =>
      (EntityContainer as unknown as Record<string, T | T[]>)?.[property] !==
      undefined
  ).flatMap(
    ({ EntityContainer }) =>
      (EntityContainer as unknown as Record<string, T | T[]>)?.[property]
  );
};
