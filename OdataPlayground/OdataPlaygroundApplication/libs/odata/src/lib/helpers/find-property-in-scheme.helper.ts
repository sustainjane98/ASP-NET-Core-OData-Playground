import { OdataMetadataScheme } from '../types/odata-metadata-scheme.type';

export const findPropertyInScheme = <T>(
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
