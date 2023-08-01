import { TextfieldFilters } from '@odata-playground/odata/common';

export const FilterQueryOperatorsBasic: Record<string, string> = {
  EQUALS: "Name eq 'Customer 2'",
  NOT_EQUALS: "Name ne 'Customer 2'",
  LESS_THAN: 'Age lt 2',
  GREATER_THAN: 'Age gt 2',
  GREATER_THAN_EQUALS: 'Age ge 2',
  ENDS_WITH: "endswith(VAT_Bus_Posting_Group,'RT')",
  STARTS_WITH: "startswith(Name, 'S')",
  SUBSTRING_OF: 'substringof(Name, ‘urn’)',
  INDEX_OF: 'indexof(Location_Code, ‘BLUE’) eq 0',
  REPLACE: "replace(City, 'Miami', 'Tampa') eq 'CODERED'",
  SUBSTRING: "substring(Location_Code, 5) eq 'RED'",
  TO_LOWER: "tolower(Location_Code) eq 'code red'",
  TO_UPPER: "toupper(FText) eq '2ND ROW'",
  TRIM: "trim(FCode) eq 'CODE RED'",
  CONCAT: "concat(concat(FText, ', '), FCode) eq '2nd row, CODE RED'",
  ROUND: 'round(FDecimal) eq 1',
  FLOOR: 'floor(FDecimal) eq 0',
  CEILING: 'ceiling(FDecimal) eq 1',
};

const selector = /\?filter=$/;

export const FilterQueryOperators = (() => {
  const keys = Object.keys(FilterQueryOperatorsBasic);
  const FilterVariantInst: TextfieldFilters = [];

  for (const key of keys) {
    FilterVariantInst.push({
      selector,
      key: `${FilterQueryOperatorsBasic[key]}`,
      value: key.toLowerCase(),
    });
  }

  return FilterVariantInst;
})();
