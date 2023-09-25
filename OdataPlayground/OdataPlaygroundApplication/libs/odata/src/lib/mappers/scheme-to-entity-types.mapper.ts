import {
  EntityContainer,
  EntityType,
  OdataMetadataScheme,
} from '../types/odata-metadata-scheme.type';
import { ComplexType } from '../types/odata-complex-type.type';

export const mapSchemeToEntityTypes = (
  scheme: OdataMetadataScheme
): (ComplexType | EntityType | EntityContainer)[] => {
  return Object.values(
    Object.values(scheme['edmx:Edmx']['edmx:DataServices'].Schema).flat()
  )
    .flatMap((e) => Object.values(e))
    .flat()
    .filter((e) => typeof e !== 'string' && typeof e !== 'undefined') as never;
};
