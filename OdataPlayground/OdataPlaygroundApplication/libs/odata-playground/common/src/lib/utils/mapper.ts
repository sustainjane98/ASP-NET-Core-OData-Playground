import { OdataDebugScheme } from '../types/odata-debug-scheme';
import { OdataDebugGroups } from '../types/odata-debug-groups';
import { OdataDebugGroup } from '../models/odata-debug-group.model';
import {
  TextfieldFilter,
  TextfieldFilters,
} from '../types/textfield-filter.type';
import { HttpMethod } from '@odata-playground/common';
import {
  EntityType,
  OdataMetadataScheme,
} from '../types/odata-metadata-scheme.type';

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

export const mapEntityTypeToJsonExample = (et: EntityType) => {
  let exampleJson = {};
  const properties = et.Property;

  for (const prop of properties) {
    const type = prop['@Type']?.replace('Edm.', '').toLowerCase();

    exampleJson = Object.assign(exampleJson, {
      [prop['@Name']]: mapTypeToExampleValue(type),
    });
  }

  return exampleJson;
};

export const mapSchemeToEntityTypes = (
  scheme: OdataMetadataScheme
): EntityType[] | undefined => {
  return scheme['edmx:Edmx']['edmx:DataServices'].Schema.find(
    ({ '@Namespace': ns }) => ns.includes('Models')
  )?.EntityType;
};

export const mapTypeToExampleValue = (type: string) =>
  ({
    string: '',
    int32: 0,
    int64: 0,
    int: 0,
  }[type]);
