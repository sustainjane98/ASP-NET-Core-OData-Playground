import {
  TextfieldFilter,
  TextfieldFilters,
} from '../types/textfield-filter.type';
import { HttpMethod } from '@odata-playground/common/enums';
import { OdataDebugScheme } from '@odata-playground/odata';

const odataSelector = /https*:\/\/[A-Za-z]*:*\d{1,4}\/$/;

export const mapOdataDebugSchemeToTextFieldFilter = (
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
