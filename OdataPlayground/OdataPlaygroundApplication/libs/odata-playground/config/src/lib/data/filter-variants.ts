import { TextfieldFilters } from '@odata-playground/odata/common';

const FilterVariantBasic: Record<string, string> = {
  FILTER: 'filter',
  SELECT: 'select',
  STOP: 'stop',
  SKIP: 'skip',
  EXPAND: 'expand',
  SEARCH: 'search',
  ORDER_BY: 'orderby',
};

const selector = /\?$/;

export const FilterVariants = (() => {
  const keys = Object.keys(FilterVariantBasic);
  const FilterVariantInst: TextfieldFilters = [];

  for (const key of keys) {
    FilterVariantInst.push({
      selector,
      key: `${FilterVariantBasic[key]}=`,
      value: key.toLowerCase(),
    });
  }

  return FilterVariantInst;
})();