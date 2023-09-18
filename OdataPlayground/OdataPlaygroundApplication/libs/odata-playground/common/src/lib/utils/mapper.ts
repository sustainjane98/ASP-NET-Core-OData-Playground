import { OdataDebugScheme } from '../types/odata-debug-scheme';
import { OdataDebugGroups } from '../types/odata-debug-groups';
import { OdataDebugGroup } from '../models/odata-debug-group.model';
import {
  TextfieldFilter,
  TextfieldFilters,
} from '../types/textfield-filter.type';
import { HttpMethod } from '@odata-playground/common/enums';
import {
  ComplexType,
  EntityContainer,
  EntityType,
  OdataMetadataScheme,
  Property,
  PropertyResolved,
} from '../types/odata-metadata-scheme.type';
import { findEntityTypeInCollection } from './helper';

const odataSelector = /https*:\/\/[A-Za-z]*:*\d{1,4}\/$/;

export const mapOdataDebugSchemeToOdataDebugGroups = (
  scheme?: OdataDebugScheme | null
): OdataDebugGroups => {
  let groups: Record<string, OdataDebugGroup> = {};

  if (!scheme) return [];

  for (const entry of scheme) {
    const dn = entry.DisplayName.match(/\w+\.\w+/gm)?.[1] ?? '';
    const dnTitle =
      entry.DisplayName.match(/\w+Controller/gm)?.[0]?.replace(
        'Controller',
        ''
      ) ?? '';

    if (groups[dnTitle])
      groups[dnTitle].values.push({ ...entry, DisplayName: dn });
    else
      groups = Object.assign(groups, {
        [dnTitle]: {
          name: dnTitle,
          values: [{ ...entry, DisplayName: dn }],
        },
      });
  }

  return Object.values(groups) as OdataDebugGroups;
};

export const mapOdataDebugSchemeToTextfieldFilter = (
  ds?: OdataDebugScheme | null
): TextfieldFilters => {
  return (
    ds?.map((value) => {
      const v = value.DisplayName.match(/\w+\.\w+/gm)?.[1];

      return {
        selector: odataSelector,
        key: value.Pattern,
        value: v,
        httpMethod: value.HttpMethods?.[0] as HttpMethod,
      } as TextfieldFilter;
    }) ?? []
  );
};

export const mapEntityTypeToJsonExample = (
  properties: Property | PropertyResolved | (Property | PropertyResolved)[]
) => {
  let exampleJson = {};

  if (Array.isArray(properties))
    for (const prop of properties) {
      exampleJson = {
        ...exampleJson,
        ...mapSingleEntityTypeToJSON(prop),
      };
    }
  else exampleJson = mapSingleEntityTypeToJSON(properties);

  return exampleJson;
};

const mapSingleEntityTypeToJSON = (prop: Property | PropertyResolved) => {
  let exampleJson = {};
  const type = prop['@Type']?.replace('Edm.', '').toLowerCase();

  if (!isExampleValue(type)) {
    const entityValue = mapEntityTypeToJsonExample(
      (prop as PropertyResolved).Property
    );

    if (checkIsCollection(type)) {
      exampleJson = Object.assign(exampleJson, {
        [prop['@Name']]: [entityValue],
      });
    } else {
      exampleJson = Object.assign(exampleJson, {
        [prop['@Name']]: entityValue,
      });
    }
  } else {
    exampleJson = Object.assign(exampleJson, {
      [prop['@Name']]: mapTypeToExampleValue(type),
    });
  }

  return exampleJson;
};

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

export const exampleValues: Record<string, number | boolean | string> = {
  string: '',
  int32: 100,
  int64: 100,
  int: 100,
  decimal: 20,
  boolean: false,
};

export const exampleKeys = Object.keys(exampleValues);

export const isExampleValue = (type: string) => exampleKeys.includes(type);

export const checkIsCollection = (type: string) =>
  type.startsWith('collection(');

export const mapTypeToExampleValue = (type: string) => exampleValues[type];

export const mapEntitySubtypes = (
  et: EntityType,
  collection: (ComplexType | EntityType | EntityContainer)[]
) => {
  const properties = et.Property;

  if (Array.isArray(properties)) {
    for (const prop of properties) {
      mapSingleSubtype(prop, collection);
    }
  } else {
    mapSingleSubtype(properties, collection);
  }
};

const mapSingleSubtype = (
  prop: Property,
  collection: (ComplexType | EntityType | EntityContainer)[]
) => {
  const type = prop['@Type'].match(/\w+\)?$/)?.[0]?.replace(')', '') ?? '';

  if (!isExampleValue(type?.toLowerCase() ?? '')) {
    const subEntityType = findEntityTypeInCollection(collection, type);
    if (subEntityType)
      (prop as PropertyResolved).Property = subEntityType.Property;
  }
};
