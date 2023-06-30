const FilterVariantBasic: Record<string, string> = {
  FILTER: "filter",
  SELECT: "select",
  STOP: "stop",
  SKIP: "skip",
  COUNT: "count",
  EXPAND: "expand",
  SEARCH: "search",
  ORDER_BY: "orderby",
};

const selector = /\?$/;

export const FilterVariants = (() => {
  const keys = Object.keys(FilterVariantBasic);
  let FilterVariantInst: {
    selector: RegExp;
    key: string;
    value?: string;
  }[] = [];

  for (const key of keys) {
    FilterVariantInst.push({ selector, key: `${FilterVariantBasic[key]}=` });
  }

  return FilterVariantInst;
})();
