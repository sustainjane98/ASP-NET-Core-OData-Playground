import { TextfieldFilters } from '@odata-playground/common';
import { filterVariantsSelector } from '../helpers/filter-variants-selector.helper';

export const FilterVariantBasic: Record<string, string> = {
  FILTER: 'filter',
  SELECT: 'select',
  STOP: 'stop',
  SKIP: 'skip',
  EXPAND: 'expand',
  SEARCH: 'search',
  ORDER_BY: 'orderby',
};

export const FilterVariants = (() => {
  const keys = Object.keys(FilterVariantBasic);
  const FilterVariantInst: TextfieldFilters = [];

  for (const key of keys) {
    FilterVariantInst.push({
      selector: filterVariantsSelector(FilterVariantBasic[key]),
      key: `${FilterVariantBasic[key]}=`,
      value: key.toLowerCase(),
    });
  }

  return FilterVariantInst;
})();
